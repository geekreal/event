import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { alpha, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Fade, FormControlLabel, FormGroup, Grid, Icon, InputAdornment, Paper, Skeleton, Slide, TextField } from '@mui/material';
import {styled} from '@mui/material/styles';
import { Link } from 'react-router-dom';
import animWomen from '../../../assets/client/images/animWomenf.gif';
import bgAnim from '../../../assets/client/images/bgAnim.gif';
import { InputUnstyled } from '@mui/base';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MoreVert, Share , Favorite, ExpandMore, LocationCity, PlaceSharp, AirplaneTicket, GpsFixed, Read, ReadMoreMore, ReadMoreReadMore, ReadMore, BookOnline, MonetizationOn, Padding, Mic, PlaceOutlined, GolfCourse, FmdGood, FmdGoodOutlined, FreeBreakfast, MicExternalOn, Grade, LocalDining } from '@mui/icons-material';
import moment from 'moment';
import 'moment/locale/fr';
import useStyle from './ClientStyle';
import BodyStyle from './BodyStyle';
import rond from '../../../assets/client/images/rond.png';
import citron from '../../../assets/client/images/citron.jpg';
import affiche from '../../../assets/client/images/affiche.jpg';
import calendar from '../../../assets/client/images/calendar.jpg';
import ticket from '../../../assets/client/images/ticket.png';
import geo1 from '../../../assets/client/images/geo.jpg';
import geo from '../../../assets/client/images/geo.png';
import contact from '../../../assets/client/images/contact.png';
import { Check } from '@mui/icons-material';
import EventSkelton from './EventSkelton';
import MapModal from '../../modal/MapModal';

import {
    AccountCircle,
    Cake,
    Celebration,
    Delete,
    EmojiEvents,
    Event,
    Map,
    Person,
    Person2Sharp,
    PersonSharp,
    Place,
    PowerSettingsNewRounded, Search, SearchOff, StopCircle, TvOff
  } from '@mui/icons-material';
  import CustomHomeInput from './CustomHomeInput';
import { theme } from '../../admin/theme';
import { PositionOptions } from 'mapbox-gl';
import { orange, red } from '@mui/material/colors';
import { fontSize } from '@mui/system';
import { useEffect } from 'react';
import { Fragment } from 'react';
import MapDrawer from '../../modal/MapDrawer';
import SwipeableEdgeDrawer from '../../modal/SwipeableEdgeDrawer';
import swal from 'sweetalert';
import { useRef } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ExpandMoreFunc = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const Start = () => {
    const classes = useStyle();
    const classesBody = BodyStyle();
    const containerRef = useRef(null);

    const date = moment().locale('fr').format('dddd');

    const [show, setShow] = useState(true);
    const showSearch = () =>{
      setShow(prev => !prev) 
    }

    const [expanded, setExpanded] = useState(false);
    const [loadSkeleton, setLoadSkeleton] = useState(true);

    const [userLocation, setUserLocation] = useState({
      userLat:"",
      userLng: "",
    });

    const [openMapModal, setOpenMapModal] = useState(false);

    // ouverture et fermeture du map
    const openMapFunction = ()=>{
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(
                function(position) {
                    setUserLocation({...userLocation, userLat:position.coords.latitude , userLng:position.coords.longitude})
                    setOpenMapModal(true);
                  },
                  function(error) {
                    // swal("Alerte", error.message, "info");
                    swal("Alerte", "Désolé, Assurez vous que vous êtes connecté à internet. Merci", "info");
                  }
              );
              
            } else if (result.state === "prompt") {

              navigator.geolocation.getCurrentPosition(
                function(position) {
                    setUserLocation({...userLocation, userLat:position.coords.latitude , userLng:position.coords.longitude})
                    setOpenMapModal(true);
                  },
                  function(error) {
                    swal("Alerte", error, "info");
                  }
              );

            } else if (result.state === "denied") {
              swal("Alerte", result.state, "info");
              //If denied then you have to show instructions to enable location
              // swal("Autorisation à votre position", "S'il vous plait, activer la localisation pour continuer", "info");
              navigator.geolocation.getCurrentPosition(
                function(position) {
                  // swal("Alerte", position, "info");
                    setUserLocation({...userLocation, userLat:position.coords.latitude , userLng:position.coords.longitude})
                    // setOpenMapModal(true);
                  },
                  function(error) {
                    swal("Alerte", error, "info");
                  }
              );
              setOpenMapModal(false);
            }
            result.onchange = function () {
              swal(result.state)
              console.log(result.state);
            };
          });
      } else {
        swal("Autorisation à votre position", "S'il vous plait, activer la localisation pour continuer", "info");
        // setOpenMapModal(false);
      }
    }
  
    const closeMap = ()=>{
      setOpenMapModal(false)
    }

    // chargement du skelelton
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoadSkeleton(false)
      }, 1500);
  
      return () => {
        clearTimeout(timer)
      };

    },[]);

    const handleExpandClick = (i) => {
      setExpanded(expanded === i ? -1 : i);
    };

  return (
    <>
    {/* {show && */}
    <Slide in={true} direction='up' mountOnEnter unmountOnExit duration={30000} appear={false}> 
      <div>
      {/* <div  className={classes.headerTitle}>
        Vous êtes de plus en plus proche du monde.
        <Grid container className={classesBody.topGridSlide}>
          <Grid item >
              <Box sx={{ boxShadow: 4 }} className={classesBody.carrousel}>
                  <div className={classesBody.slideText}>
                      <img className={classesBody.slideImg} src={geo1}/>
                  </div>
                  <div className={classesBody.slideTitle}>
                      Choisissez un évènement
                      <Typography className={classesBody.slideDesc}>
                      Des grand évènements jusqu'au petit, vous êtes au courant
                  </Typography>
                  </div>
              </Box>
          </Grid>

          <Grid item >
              <Box sx={{ boxShadow: 4 }} className={classesBody.carrousel}>
                  <div className={classesBody.slideText}>
                      <img className={classesBody.slideImg} src={ticket}/>
                  </div>
                  <div className={classesBody.slideTitle}>
                      Reservez votre place
                      <Typography className={classesBody.slideDesc}>
                      Les tickets au meilleurs prix c'est ici, ne perdez pas de temps pour les déplacements
                  </Typography>
                  </div>
              </Box>
          </Grid>

          <Grid item>
              <Box sx={{ boxShadow: 4 }} className={classesBody.carrousel}>
                  <div className={classesBody.slideText}>
                      <img className={classesBody.slideImg} src={geo}/>
                  </div>
                  <div className={classesBody.slideTitle}>
                      Suivez litinereraire
                      <Typography className={classesBody.slideDesc}>
                          Choisissez un évènement, proche ou non, suivez l'itinéraire en seul click, simple et éfficace
                      </Typography>
                  </div>
              </Box>
          </Grid>
        </Grid>
      </div> */}

          <div className={classes.headerBack}>
            {/* recherche */}
          {show && 
          <Slide in={true} direction='left' mountOnEnter unmountOnExit duration={10000}>
            <div>
              <div className={classes.action}>
              <Box elevation={6} className={classes.paperAction} sx={{boxShadow: 0}}>
                <Grid container spacing={2} className={classes.paperGrid} direction='column'>
                  <Grid item xs={12}  className={classes.actionTitleGrid}>
                    {/* <Typography component='div' className={classes.actionTitle} variant='actionTitle'>
                      Le monde, plus proche de vous.
                    </Typography> */}
                    <Typography sx={{fontSize: 20, color: 'white'}}>
                      C'est {date}, Que désirez-vous?
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.actionSearch}>               
                      <CustomHomeInput/>
                  </Grid>
                  <Grid item  >
                  <Container className={classes.actionBtnDiv}>

                    {/* <Button  variant='contained' component='div' className={classes.actionBtn} sx={{
                      marginLeft: 2,
                      marginBottom: 2,
                    }}> */}
                    <Grid item className={classes.actionTitleGrid} sx={{display: 'block'}} direction='row'>
                     <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1),  background:"#fcaf3c"}} onClick={showSearch} className={classes.actionBtn}>
                      <Person2Sharp sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}} />
                      <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                        Mes stars
                      </Typography>
                    </Button> 
                    <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1), background:"#fcaf3c"}} onClick={showSearch} className={classes.actionBtn}>
                      <Celebration sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}} />
                      <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                        Univers des évènements
                      </Typography>
                    </Button> 
                    <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1), background:"#fcaf3c"}} onClick={showSearch} className={classes.actionBtn}>
                    <Place sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}}/>
                    <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                        Evènements chez moi
                      </Typography>
                    </Button> 
                  </Grid>
                    </Container>
                  </Grid>
                
                </Grid>
              </Box>
          </div>
            </div>
          </Slide>}

            {/* Les evènements */}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} className={classes.eventContainer}>
              <Grid item xs={2} sm={2} md={3} sx={{background: '#fcaf3c', marginTop: 4}}>
                <div className={classes.filterAction}>
                  <Box elevation={6} className={classes.filterPaper}>
                    <Grid container className={classesBody.gridSlide} direction='column'>
                        <Grid item >
                        <div style={{
                          fontSize: 15,
                          fontWeight: 800,
                        }}>Les options de filtres</div>
                          <FormGroup className={classes.filterFormGroup}>
                            {loadSkeleton ? (<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}}/>
                            ):(
                              <FormControlLabel control={<Checkbox /> } label={
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  flexWrap: 'wrap',
                                  fontSize: 15,
                              }}>
                                <PlaceSharp variant='large' sx={{ fontSize: 28 }}/>
                                <span>Près de moi</span>
                              </div> 
                              } />
                            )}

                          {loadSkeleton ? 
                            (<Fragment>
                                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                            </Fragment>
                            ):(
                            <FormControlLabel control={<Checkbox />} label={
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 15,
                            }}>
                              <FreeBreakfast variant='large' sx={{ fontSize: 28 }}/>
                              <span>Participation gratuite</span>
                            </div> 
                            } />)}

                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <FormControlLabel control={<Checkbox />} label={
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 15,
                            }}>
                              <EmojiEvents variant='large' sx={{ fontSize: 28 }}/>
                              <span>Conférences</span>
                            </div> 
                            } />)}

                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                            <FormControlLabel control={<Checkbox />} label={
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 15,
                            }}>
                              <Cake variant='large' sx={{ fontSize: 28 }}/>
                              <span>Anniversaire</span>
                            </div> 
                            } />)}
                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <FormControlLabel control={<Checkbox />} label={
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 15,
                            }}>
                              <MicExternalOn variant='large' sx={{ fontSize: 28 }}/>
                              <span>Concerts</span>
                            </div> 
                            } />)}
                            {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                            <FormControlLabel control={<Checkbox />} label={
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 15,
                            }}>
                              <Grade variant='large' sx={{ fontSize: 28 }}/>
                              <span>Formation</span>
                            </div> 
                            } />)}
                          </FormGroup>
                          </Grid>
                    </Grid>
                  </Box>
                </div>
              </Grid>
              {/* {show &&
                <Slide in={true} direction='down' mountOnEnter unmountOnExit> */}
              <Grid item xs={9}>
                <div style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: 'white'
                  }}>Listing des évènements</div>
                  <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={4} sx={{padding: 1}}   key={1}>
                      <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
                          <CardHeader
                            avatar={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <Avatar sx={{ bgcolor: '#014255', color: 'white',  }} aria-label="recipe">R</Avatar>)}
                            action={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                              <Link to='/event/1/ticket/'>
                                <IconButton aria-label="settings" sx={{color: 'white', }}>
                                  <MonetizationOn />
                                </IconButton>
                              </Link>)}
                            sx={{color: 'white' }}
                            title={loadSkeleton ?(<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <div className={classes.eventTitle}>Titre de l'évènement</div>)}

                            subheader={loadSkeleton ?(<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(<div className={classes.eventSubTitle}>Date de publication</div>)}
                          />
                          {loadSkeleton ?(<Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                          <CardMedia component="img" height="150" image={affiche} alt="Paella dish"/>)}

                        <CardContent >
                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <Typography variant="body2" sx={{color: 'white', fontSize: 14}}>
                          Petite description de l'évènement
                          This impressive paella is a perfect party dish and a fun meal to cook
                          together with your guests. Add 1 cup of frozen peas along with the mussels,
                          if you like.
                        </Typography>) }
                        </CardContent>

                        <CardActions disableSpacing>
                        {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton onClick={openMapFunction} aria-label="Lieu" sx={{color: 'white',display: 'flex',alignItems: 'center',flexWrap: 'wrap',fontSize: 10, }} >
                            <PlaceSharp />
                            <span>Lieu</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="add to favorites" sx={{color: 'white',display: 'flex',alignItems: 'center', flexWrap: 'wrap',fontSize: 10, }} >
                              <GpsFixed />
                              <span>Itineraire</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="share" sx={{color: '#043f3a',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 10, }} >
                              <Share variant='large' sx={{ fontSize: 20 }}/>
                              <span>Partager</span>
                          </IconButton>)}

                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <ExpandMoreFunc
                            expand={expanded === 1}
                            onClick={ () => handleExpandClick(1)}
                            aria-expanded={expanded === 1}
                            aria-label="Details"
                          >
                            <ReadMore sx={{color:'white'}}/>
                          </ExpandMoreFunc>)}
                        </CardActions>
                        {/* Lire plus */}
                        <Collapse in={expanded === 1} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                              aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                              large plate and set aside, leaving chicken and chorizo in the pan. Add
                              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                              stirring often until thickened and fragrant, about 10 minutes. Add
                              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                              Add rice and stir very gently to distribute. Top with artichokes and
                              peppers, and cook without stirring, until most of the liquid is absorbed,
                              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                              mussels, tucking them down into the rice, and cook again without
                              stirring, until mussels have opened and rice is just tender, 5 to 7
                              minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                              Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                          </CardContent>
                        </Collapse>

                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} sx={{padding: 1}}   key={1}>
                      <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
                          <CardHeader
                            avatar={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <Avatar sx={{ bgcolor: '#014255', color: 'white',  }} aria-label="recipe">R</Avatar>)}
                            action={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                              <IconButton aria-label="settings" sx={{color: 'white', }}>
                                <MonetizationOn />
                                
                              </IconButton>)}
                            sx={{color: 'white' }}
                            title={loadSkeleton ?(<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <div className={classes.eventTitle}>Titre de l'évènement</div>)}

                            subheader={loadSkeleton ?(<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(<div className={classes.eventSubTitle}>Date de publication</div>)}
                          />
                          {loadSkeleton ?(<Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                          <CardMedia component="img" height="150" image={affiche} alt="Paella dish"/>)}

                        <CardContent >
                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <Typography variant="body2" sx={{color: 'white', fontSize: 14}}>
                          Petite description de l'évènement
                          This impressive paella is a perfect party dish and a fun meal to cook
                          together with your guests. Add 1 cup of frozen peas along with the mussels,
                          if you like.
                        </Typography>) }
                        </CardContent>

                        <CardActions disableSpacing>
                        {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton onClick={openMapFunction} aria-label="Lieu" sx={{color: 'white',display: 'flex',alignItems: 'center',flexWrap: 'wrap',fontSize: 10, }} >
                            <PlaceSharp />
                            <span>Lieu</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="add to favorites" sx={{color: 'white',display: 'flex',alignItems: 'center', flexWrap: 'wrap',fontSize: 10, }} >
                              <GpsFixed />
                              <span>Itineraire</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="share" sx={{color: '#043f3a',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 10, }} >
                              <Share variant='large' sx={{ fontSize: 20 }}/>
                              <span>Partager</span>
                          </IconButton>)}

                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <ExpandMoreFunc
                            expand={expanded === 1}
                            onClick={ () => handleExpandClick(1)}
                            aria-expanded={expanded === 1}
                            aria-label="Details"
                          >
                            <ReadMore sx={{color:'white'}}/>
                          </ExpandMoreFunc>)}
                        </CardActions>
                        {/* Lire plus */}
                        <Collapse in={expanded === 1} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                              aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                              large plate and set aside, leaving chicken and chorizo in the pan. Add
                              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                              stirring often until thickened and fragrant, about 10 minutes. Add
                              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                              Add rice and stir very gently to distribute. Top with artichokes and
                              peppers, and cook without stirring, until most of the liquid is absorbed,
                              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                              mussels, tucking them down into the rice, and cook again without
                              stirring, until mussels have opened and rice is just tender, 5 to 7
                              minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                              Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                          </CardContent>
                        </Collapse>

                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} sx={{padding: 1}}   key={1}>
                      <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
                          <CardHeader
                            avatar={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <Avatar sx={{ bgcolor: '#014255', color: 'white',  }} aria-label="recipe">R</Avatar>)}
                            action={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                              <Link to='/event/1/ticket/'>
                                <IconButton aria-label="settings" sx={{color: 'white', }}>
                                  <MonetizationOn />
                                </IconButton>
                              </Link>)}
                            sx={{color: 'white' }}
                            title={loadSkeleton ?(<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <div className={classes.eventTitle}>Titre de l'évènement</div>)}

                            subheader={loadSkeleton ?(<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(<div className={classes.eventSubTitle}>Date de publication</div>)}
                          />
                          {loadSkeleton ?(<Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                          <CardMedia component="img" height="150" image={affiche} alt="Paella dish"/>)}

                        <CardContent >
                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <Typography variant="body2" sx={{color: 'white', fontSize: 14}}>
                          Petite description de l'évènement
                          This impressive paella is a perfect party dish and a fun meal to cook
                          together with your guests. Add 1 cup of frozen peas along with the mussels,
                          if you like.
                        </Typography>) }
                        </CardContent>

                        <CardActions disableSpacing>
                        {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton onClick={openMapFunction} aria-label="Lieu" sx={{color: 'white',display: 'flex',alignItems: 'center',flexWrap: 'wrap',fontSize: 10, }} >
                            <PlaceSharp />
                            <span>Lieu</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="add to favorites" sx={{color: 'white',display: 'flex',alignItems: 'center', flexWrap: 'wrap',fontSize: 10, }} >
                              <GpsFixed />
                              <span>Itineraire</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="share" sx={{color: '#043f3a',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 10, }} >
                              <Share variant='large' sx={{ fontSize: 20 }}/>
                              <span>Partager</span>
                          </IconButton>)}

                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <ExpandMoreFunc
                            expand={expanded === 1}
                            onClick={ () => handleExpandClick(1)}
                            aria-expanded={expanded === 1}
                            aria-label="Details"
                          >
                            <ReadMore sx={{color:'white'}}/>
                          </ExpandMoreFunc>)}
                        </CardActions>
                        {/* Lire plus */}
                        <Collapse in={expanded === 1} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                              aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                              large plate and set aside, leaving chicken and chorizo in the pan. Add
                              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                              stirring often until thickened and fragrant, about 10 minutes. Add
                              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                              Add rice and stir very gently to distribute. Top with artichokes and
                              peppers, and cook without stirring, until most of the liquid is absorbed,
                              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                              mussels, tucking them down into the rice, and cook again without
                              stirring, until mussels have opened and rice is just tender, 5 to 7
                              minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                              Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                          </CardContent>
                        </Collapse>

                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} sx={{padding: 1}}   key={1}>
                      <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
                          <CardHeader
                            avatar={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <Avatar sx={{ bgcolor: '#014255', color: 'white',  }} aria-label="recipe">R</Avatar>)}
                            action={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                              <Link to='/event/1/ticket/'>
                                <IconButton aria-label="settings" sx={{color: 'white', }}>
                                  <MonetizationOn />
                                </IconButton>
                              </Link>)}
                            sx={{color: 'white' }}
                            title={loadSkeleton ?(<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <div className={classes.eventTitle}>Titre de l'évènement</div>)}

                            subheader={loadSkeleton ?(<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(<div className={classes.eventSubTitle}>Date de publication</div>)}
                          />
                          {loadSkeleton ?(<Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                          <CardMedia component="img" height="150" image={affiche} alt="Paella dish"/>)}

                        <CardContent >
                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <Typography variant="body2" sx={{color: 'white', fontSize: 14}}>
                          Petite description de l'évènement
                          This impressive paella is a perfect party dish and a fun meal to cook
                          together with your guests. Add 1 cup of frozen peas along with the mussels,
                          if you like.
                        </Typography>) }
                        </CardContent>

                        <CardActions disableSpacing>
                        {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton onClick={openMapFunction} aria-label="Lieu" sx={{color: 'white',display: 'flex',alignItems: 'center',flexWrap: 'wrap',fontSize: 10, }} >
                            <PlaceSharp />
                            <span>Lieu</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="add to favorites" sx={{color: 'white',display: 'flex',alignItems: 'center', flexWrap: 'wrap',fontSize: 10, }} >
                              <GpsFixed />
                              <span>Itineraire</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="share" sx={{color: '#043f3a',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 10, }} >
                              <Share variant='large' sx={{ fontSize: 20 }}/>
                              <span>Partager</span>
                          </IconButton>)}

                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <ExpandMoreFunc
                            expand={expanded === 1}
                            onClick={ () => handleExpandClick(1)}
                            aria-expanded={expanded === 1}
                            aria-label="Details"
                          >
                            <ReadMore sx={{color:'white'}}/>
                          </ExpandMoreFunc>)}
                        </CardActions>
                        {/* Lire plus */}
                        <Collapse in={expanded === 1} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                              aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                              large plate and set aside, leaving chicken and chorizo in the pan. Add
                              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                              stirring often until thickened and fragrant, about 10 minutes. Add
                              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                              Add rice and stir very gently to distribute. Top with artichokes and
                              peppers, and cook without stirring, until most of the liquid is absorbed,
                              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                              mussels, tucking them down into the rice, and cook again without
                              stirring, until mussels have opened and rice is just tender, 5 to 7
                              minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                              Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                          </CardContent>
                        </Collapse>

                      </Card>
                    </Grid>
                    <Grid item xs={6} sm={4} md={4} sx={{padding: 1}}   key={1}>
                      <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
                          <CardHeader
                            avatar={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <Avatar sx={{ bgcolor: '#014255', color: 'white',  }} aria-label="recipe">R</Avatar>)}
                            action={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                              <Link to='/event/1/ticket/'>
                                <IconButton aria-label="settings" sx={{color: 'white', }}>
                                  <MonetizationOn />
                                </IconButton>
                              </Link>)}
                            sx={{color: 'white' }}
                            title={loadSkeleton ?(<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                            <div className={classes.eventTitle}>Titre de l'évènement</div>)}

                            subheader={loadSkeleton ?(<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(<div className={classes.eventSubTitle}>Date de publication</div>)}
                          />
                          {loadSkeleton ?(<Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />
                            ):(
                          <CardMedia component="img" height="150" image={affiche} alt="Paella dish"/>)}

                        <CardContent >
                          {loadSkeleton ? 
                          (<Fragment>
                              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                              <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <Typography variant="body2" sx={{color: 'white', fontSize: 14}}>
                          Petite description de l'évènement
                          This impressive paella is a perfect party dish and a fun meal to cook
                          together with your guests. Add 1 cup of frozen peas along with the mussels,
                          if you like.
                        </Typography>) }
                        </CardContent>

                        <CardActions disableSpacing>
                        {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton onClick={openMapFunction} aria-label="Lieu" sx={{color: 'white',display: 'flex',alignItems: 'center',flexWrap: 'wrap',fontSize: 10, }} >
                            <PlaceSharp />
                            <span>Lieu</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="add to favorites" sx={{color: 'white',display: 'flex',alignItems: 'center', flexWrap: 'wrap',fontSize: 10, }} >
                              <GpsFixed />
                              <span>Itineraire</span>
                          </IconButton>)}
                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <IconButton aria-label="share" sx={{color: '#043f3a',
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                fontSize: 10, }} >
                              <Share variant='large' sx={{ fontSize: 20 }}/>
                              <span>Partager</span>
                          </IconButton>)}

                          {loadSkeleton ? 
                          (<Fragment> 
                              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                          </Fragment>
                          ):(
                          <ExpandMoreFunc
                            expand={expanded === 1}
                            onClick={ () => handleExpandClick(1)}
                            aria-expanded={expanded === 1}
                            aria-label="Details"
                          >
                            <ReadMore sx={{color:'white'}}/>
                          </ExpandMoreFunc>)}
                        </CardActions>
                        {/* Lire plus */}
                        <Collapse in={expanded === 1} timeout="auto" unmountOnExit>
                          <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                              aside for 10 minutes.
                            </Typography>
                            <Typography paragraph>
                              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                              large plate and set aside, leaving chicken and chorizo in the pan. Add
                              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                              stirring often until thickened and fragrant, about 10 minutes. Add
                              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                              Add rice and stir very gently to distribute. Top with artichokes and
                              peppers, and cook without stirring, until most of the liquid is absorbed,
                              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                              mussels, tucking them down into the rice, and cook again without
                              stirring, until mussels have opened and rice is just tender, 5 to 7
                              minutes more. (Discard any mussels that don&apos;t open.)
                            </Typography>
                            <Typography>
                              Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                          </CardContent>
                        </Collapse>

                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              {/* </Slide> */}
            </Grid>
          </div>
      </div>
    </Slide>
    {/* <MapDrawer/> */}
    {openMapModal ? 
    (<SwipeableEdgeDrawer 
        longitude="1.230922" latitude="6.132853"
        ville ='Kpalimé' 
        userLongitude={userLocation.userLng}
        userLatitude={userLocation.userLat}
        open={openMapModal} close={()=> setOpenMapModal(false)}/>
    ):(<Skeleton/>) }
    {/* <MapModal show={openMapModal} close={()=> setOpenMapModal(false)}/>  */}
    </>
  )
}

export default Start