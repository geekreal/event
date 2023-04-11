import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { alpha, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Fade, FormControlLabel, FormGroup, Grid, Icon, 
  InputAdornment, Paper, Skeleton, Slide, TextField } from '@mui/material';
import {styled} from '@mui/material/styles';
import { Link } from 'react-router-dom';
import animWomen from '../../../assets/client/images/animWomenf.gif';
import bgAnim from '../../../assets/client/images/bgAnim.gif';
import { InputUnstyled } from '@mui/base';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MoreVert, Share , Favorite, ExpandMore, LocationCity, PlaceSharp, AirplaneTicket, GpsFixed, Read, ReadMoreMore, ReadMoreReadMore, ReadMore, BookOnline, MonetizationOn, Padding, Mic, PlaceOutlined, GolfCourse, FmdGood, FmdGoodOutlined, FreeBreakfast, MicExternalOn, Grade, LocalDining, MapOutlined, SearchSharp } from '@mui/icons-material';
import moment from 'moment';
import 'moment/locale/fr';
import useStyle from './ClientStyle';
import BodyStyle from './BodyStyle';
import rond from '../../../assets/client/images/rond.png';
import citron from '../../../assets/client/images/citron.jpg';
import affiche from '../../../assets/client/images/affiche.jpg';
import calendar from '../../../assets/client/images/calendar.jpg';
import ticket from '../../../assets/client/images/ticket.png';
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
import axios from 'axios';
import DistanceCalc from '../Functions/DistanceCalc';
import GeocodingService  from '@mapbox/mapbox-sdk/services/geocoding';
import EventGrid from './EventGrid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CssTextField = styled(TextField)({
  '#custom-css-outlined-input': {
      border: '1px solid #a1a9c3',
      appearance: 'none',
      backgroundColor: '#f1f2f6',
      boxShadow: 'none',
      caretColor: '#a1a9c3',
      color: '#132968',
      transition:' border .15s',
      borderRadius: 8,
      
    },
    
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
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;
    
    const [checked, setChecked] = useState({
      hbd: false,
      concert: false,
      conference: false,
      formation: false,
      city: false,
      free: false,
      today: false
    });

    const date = moment().locale('fr').format('dddd');

    const [show, setShow] = useState(true);
    const showSearch = () =>{
      setShow(prev => !prev) 
    }

    const [expanded, setExpanded] = useState(false);
    const [loadSkeleton, setLoadSkeleton] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [region, setRegion] = useState('');
    const [searchInput, setSearchInput] = useState({
      search : '',
      checkBox: ''
    });

    const [userLocation, setUserLocation] = useState({
      userLat:"",
      userLng: "",
      eventLat: '',
      eventLong:'',
      eventAddress:'',
    });

    const apiKey = 'pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA';
    const [openMapModal, setOpenMapModal] = useState(false);
    const mapboxClient = new GeocodingService({ accessToken: apiKey });
    const [searchList, setSearchList] = useState([]);
    const [filterCheckbox, setFilterCheckbox] = useState({
      type: '',
      city: '',
      free: '',
      today: '',
    }); 


    // ouverture et fermeture du map
    const openMapFunction = (latitude, longitude, eventAddress)=>{

      console.log("lat", latitude, 'longi :', longitude);
      if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(
                function(position) {
                    setUserLocation({...userLocation, 
                      userLat:position.coords.latitude , 
                      userLng:position.coords.longitude,
                      eventLat: latitude,
                      eventLong: longitude,
                      eventAddress: eventAddress
                    })
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

    const StartFollow = (e) => {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // swal("Alerte", position, "info");
            setUserLocation({...userLocation, userLat:position.coords.latitude , userLng:position.coords.longitude})
            mapboxClient.reverseGeocode({
              query: [position.coords.longitude, position.coords.latitude],
              // types: ['place'],
              // countries: ['us'], // Limit the results to the United States
              limit: 1, // Limit the number of results to 1
          })
          .send()
          .then(response => {
              const city = response.body;
              // const city = response.body.features[0].text;
              // console.log("city", city); // User's city
              setRegion(response.body.features[0].text);
              console.log("city", region)
          });
            // setOpenMapModal(true);
          },
          function(error) {
            console.log("Alerte", error, "info");
          }
      );
    }

    const SearchChange= (e)=>{
      const query = e.target.value;
        setSearchInput({...searchInput, search: query})
        const data = {
          eventName: query,
        }
        // setSearchQuery(query);
      
        const searchList = eventList.filter((item) => {
          return item.nom.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
      
        setSearchList(searchList);
    }

    const filterByTypeCity = (e) => {
      setFilterCheckbox({...filterCheckbox, type:e.target.value})
      setChecked(e.target.checked);
      const query = e.target.value
      if (e.target.checked) {
        const searchList = eventList.filter((item) => {
          return item.type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setSearchList(searchList);
      }else{
        setSearchList(eventList);
      }
    
    }

    const filterAnnivCheck = (e) => {
      setFilterCheckbox({...filterCheckbox, type:e.target.value})
      setChecked({...checked, hbd: e.target.checked});
      const query = e.target.value
      
      if (!checked.hbd) {
        const searchList = eventList.filter((item) => {
          return item.type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setSearchList(searchList);
      }else{
        setSearchList(eventList);
      }
    
    }

    const filterConfCheck = (e) => {
      setFilterCheckbox({...filterCheckbox, type:e.target.value})
      setChecked({...checked, conference: e.target.checked});
      const query = e.target.value
      if (!checked.conference) {
        const searchList = eventList.filter((item) => {
          return item.type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setSearchList(searchList);
      }else{
        setSearchList(eventList);
      }
    
    }

    const filterConcertCheck = (e) => {
      setFilterCheckbox({...filterCheckbox, type:e.target.value})
      setChecked({...checked, concert: e.target.checked});
      const query = e.target.value
      if (!checked.concert) {
        const searchList = eventList.filter((item) => {
          return item.type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setSearchList(searchList);
      }else{
        setSearchList(eventList);
      }
    
    }

    const filterFormationCheck = (e) => {
      setFilterCheckbox({...filterCheckbox, type:e.target.value})
      setChecked({...checked, formation: e.target.checked});
      const query = e.target.value
      if (!checked.formation) {
        const searchList = eventList.filter((item) => {
          return item.type.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setSearchList(searchList);
      }else{
        setSearchList(eventList);
      }
    
    }

    // chargement du skelelton
    useEffect(() => {

      setLoadSkeleton(true)
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
      axios.get('api/user/events/list').then(res=> {
        console.log(res.data.events);
          if (res.status === 200) {
              setEventList(res.data.events);
              setSearchList(res.data.events);
              setLoadSkeleton(false);
          }
          console.log("status ", res.status, eventList);
          // setLoading(false);
      });

      // const timer = setTimeout(() => {
      //   setLoadSkeleton(false)
      // }, 10000);
  
      // return () => {
      //   clearTimeout(timer)
      // };

    },[]);

    const handleExpandClick = (i) => {
      setExpanded(expanded === i ? -1 : i);
    };

  return (
    <>
    {/* {show && */}
    <Slide in={true} direction='up' mountOnEnter unmountOnExit duration={30000} appear={false}> 
      <div>
      {/* 
      <div  className={classes.headerTitle}>
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
                      {/* <CustomHomeInput val={searchInput.search}/> */}
                      {/* <CssTextField label="Recherche" onChange={SearchChange}
                      value={searchInput.search} 
                      id="custom-css-outlined-input"
                      InputProps={{
                        startAdornment: <InputAdornment position="end"><SearchSharp/></InputAdornment>,
                        // inputMode: 'numeric', pattern: '[0-9]*'
                      }} /> */}
                      <TextField variant='outlined' size='large' color='primary'
                      sx={{borderRadius: '1px solid white'}}
                      fullWidth value={searchInput.search}
                      InputProps={{
                        startAdornment: <InputAdornment position="end"><SearchSharp/></InputAdornment>,
                        // inputMode: 'numeric', pattern: '[0-9]*'
                      }}
                      onChange={SearchChange}/>
                  </Grid>
                  <Grid item>
                  <Grid container className={classes.actionBtnDiv}>

                    {/* <Button  variant='contained' component='div' className={classes.actionBtn} sx={{
                      marginLeft: 2,
                      marginBottom: 2,
                    }}> */}
                    <Grid item className={classes.actionTitleGrid} sx={{display: 'block'}} direction='row'>
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
                    </Grid>
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
                          <FormControlLabel control={
                            <Checkbox
                              value='Conférence' 
                              checked={checked.conference}
                              onChange={filterConfCheck}/>} label={
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
                            <FormControlLabel control={<Checkbox 
                              value='Anniversaire' 
                              checked={checked.hbd}
                              onChange={filterAnnivCheck}/>} label={
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
                          <FormControlLabel control={<Checkbox 
                            value='Concerts' 
                            checked={checked.concert}
                            onChange={filterConcertCheck}/>} label={
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
                            <FormControlLabel control={<Checkbox 
                              value='Formation' 
                              checked={checked.formation}
                              onChange={filterFormationCheck}/>} label={
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
                  {loadSkeleton ? (<EventGrid/>
                  ): (
                      <Fragment>
                           {searchList.map((item) =>
                            <Grid item xs={6} sm={4} md={4} sx={{padding: 1}}   key={item.id}>
                              <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
                                  <CardHeader
                                    avatar={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                                    ):(
                                    <Avatar sx={{ bgcolor: '#fcaf3c', color: 'white',  }} aria-label="recipe">O</Avatar>)}
                                    action={loadSkeleton ? (<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />
                                    ):(
                                      <Link to={`/event/${item.id}/ticket/`}>
                                        <IconButton aria-label="settings" sx={{color: 'white', }}>
                                          <MonetizationOn />
                                        </IconButton>
                                      </Link>)}
                                    sx={{color: 'white' }}
                                    title={loadSkeleton ?(<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                                    ):(
                                    <div className={classes.eventTitle}>{item.nom}</div>)}

                                    subheader={loadSkeleton ?(<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />
                                    ):(<div className={classes.eventSubTitle} style={{display: 'flex', alignItems: 'center',color: 'white', alignContent:'center'}}>
                                    <DistanceCalc  latitude1={userLocation.userLat} longitude1={userLocation.userLng} 
                                    latitude2={item.latitude}  longitude2={item.longitude}/> 
                                    <p style={{marginLeft: 2}}>{item.type}</p>
                                    
                                    </div>)}
                                  />
                                  {loadSkeleton ?(<Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />
                                    ):(
                                  <CardMedia component="img" height="250" image={`${BASE_URL}${item.photo_cover}`} alt="Paella dish"/>)}

                                <CardContent >
                                  {loadSkeleton ? 
                                  (<Fragment>
                                      <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                                      <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                                      <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                                      <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                                  </Fragment>
                                  ):(<Fragment>
                                      <Typography variant="subtitle1" sx={{color: 'white', fontSize: 14}}>
                                          {item.date}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'white', fontSize: 14}}>
                                          {item.description}
                                        </Typography>
                                      </Fragment>) }
                                </CardContent>

                                <CardActions disableSpacing>
                                {loadSkeleton ? 
                                  (<Fragment> 
                                      <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                                  </Fragment>
                                  ):(
                                  <IconButton aria-label="Lieu" sx={{color: '#fcaf3c',display: 'flex',alignItems: 'center',flexWrap: 'wrap',fontSize: 10, }} >
                                    <PlaceSharp />
                                    <span>{item.lieu}</span>
                                  </IconButton>)}
                                  {loadSkeleton ? 
                                  (<Fragment> 
                                      <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                                  </Fragment>
                                  ):(
                                  <IconButton onClick={() => openMapFunction(item.latitude, item.longitude, item.ville+", "+item.lieu+", "+item.pays)} aria-label="add to favorites" 
                                  sx={{color: '#fcaf3c',display: 'flex',alignItems: 'center', flexWrap: 'wrap',fontSize: 10, }} >
                                      <GpsFixed />
                                      <span>Itineraire</span>
                                  </IconButton>)}
                                  {loadSkeleton ? 
                                  (<Fragment> 
                                      <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
                                  </Fragment>
                                  ):(
                                  <IconButton aria-label="share" sx={{color:'#fcaf3c',
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
                                    expand={expanded === item.id}
                                    onClick={ () => handleExpandClick(item.id)}
                                    aria-expanded={expanded === item.id}
                                    aria-label="Details"
                                  >
                                    <ReadMore sx={{color:'white'}}/>
                                  </ExpandMoreFunc>)}
                                </CardActions>
                                {/* Lire plus */}
                                <Collapse in={expanded === item.id} timeout="auto" unmountOnExit>
                                  <CardContent>
                                    <Typography paragraph>
                                      Organisateur {item.client_id} <br />
                                    </Typography>
                                    <Typography paragraph>
                                      Heure :{item.heure} <br />
                                      Place limité :{item.nb_personne} <br />
                                      pays :{item.pays} <br />
                                      Ville :{item.ville} <br />
                                      Contact :{item.contact} <br />
                                    </Typography>
                                    <Typography paragraph>
                                    Exigence :{item.exigence} <br />
                                    </Typography>
                                    <Typography>
                                      <Link to={`/event/${item.id}/ticket/`}>
                                        <Button variant='contained' size='large' color='primary'>
                                          Reservation
                                        </Button>
                                      </Link>
                                    </Typography>
                                  </CardContent>
                                </Collapse>
                              </Card>
                            </Grid>
                            )}
                      </Fragment>
                  ) }
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
        // longitude="1.230922" latitude="6.132853"
        longitude={userLocation.eventLong} latitude={userLocation.eventLat}
        ville ={userLocation.eventAddress}
        userLongitude={userLocation.userLng}
        userLatitude={userLocation.userLat}
        open={openMapModal} 
        close={()=> setOpenMapModal(false)}/>
    ):(<Skeleton/>) }
    {/* <MapModal show={openMapModal} close={()=> setOpenMapModal(false)}/>  */}
    </>
  )
}

export default Start