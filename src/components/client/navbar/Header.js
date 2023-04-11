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
import geo1 from '../../../assets/client/images/geo1.png';
import geo from '../../../assets/client/images/geo.png';
import events from '../../../assets/client/images/events.png';
import contact from '../../../assets/client/images/contact.png';
import { Check } from '@mui/icons-material';
import EventSkelton from './EventSkelton';
import {motion} from 'framer-motion';
import Carousel from 'react-material-ui-carousel';

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
import Start from './Start';
import { useRef } from 'react';
import ReactLoading from 'react-loading';

const data = [
  {
    src: events,
    // title: "Choisissez un évènement",
    // description: "Des grands évènements jusqu'aux petits, vous êtes au courant. Sur IVINX aucun évènement ne passe inaperçu",
  },
  {
    src: geo,
    // title: 'Reservez votre place',
    // description: "Les tickets au meilleurs prix c'est ici, ne perdez pas de temps pour les déplacements, tout ce fait sur IVINX",
  },
  {
    src: geo1,
    // title: "Suivez l'itineraire",
    // description: "Choisissez un évènement, proche ou non, suivez l'itinéraire en seul click, simple et éfficace",
  },
];


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

const Header = () => {
    const classes = useStyle();
    const classesBody = BodyStyle();
    const containerRef = useRef(null);

    const date = moment().locale('fr').format('dddd');

    const [show, setShow] = useState(true);
    const showSearch = () =>{
      setShow(prev => !prev) 
    }

  return (
    <>
    {/* {show && */}
    <Slide in={true} appear={false} direction='up' mountOnEnter unmountOnExit duration={30000}> 
      <div className={classes.imageHeader}>
        <Grid container columns={{ xs: 2, sm: 12, md: 12 }} className={classes.gridBack}>
          <Grid item xs={6} className={classes.mainTitle}>
            <div  className={classes.headerTitle} > 
              IVENOS, Le monde est plus prêt de vous
              <Typography sx={{color: "WHITE" , lineHeight: 1, marginTop: 2,}}>
                Nous sommes convaincus que participer aux évènements permet d'agrandir vos relations.
              </Typography>
              <div>
              <Link to='/event/start' className={classes.navText}>
                <Button component={motion.button} whileHover={{scale: 1.2, transition: { duration: 1 },}} sx={{background: "#ED9A15"}}
                  whileTap={{ scale: 0.9 }} variant='contained' title='Entrer' size='large' className={classes.startButton}>
                  <div className={classes.startButtonText}>
                    Explorer
                  </div>
                </Button>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.carouselCard}>
            <Grid container className={classesBody.topGridSlide}
              direction='column'
              sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                overflow: 'auto',
                scrollSnapType: 'x mandatory',
                '& > *': {
                  scrollSnapAlign: 'center',
                },
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
            <Carousel autoPlay={true} animation='fade' indicators={false}>
            {data.map((items) => (
              <Grid item key={items.src}>
                <Box sx={{ boxShadow: 4 }} className={classesBody.carrousel} >
                    <div className={classesBody.slideImg} style={{textAlign: 'center', alignContent: 'center',
                    alignItems: 'center',}}>
                        <img className={classesBody.slideImg} src={items.src}/>
                    </div>
                  </Box>
              </Grid>
            ))}

            </Carousel>

              {/* <Grid item >
                  <Box sx={{ boxShadow: 4 }} className={classesBody.carrousel}>
                      <div className={classesBody.slideImg}>
                          <img className={classesBody.slideImg} src={ticket}/>
                      </div>
                      <div className={classesBody.slideText}>
                        <div className={classesBody.slideTitle}>
                          Reservez votre place
                        </div>
                        <div className={classesBody.slideDesc}>
                        Les tickets au meilleurs prix c'est ici, ne perdez pas de temps pour les déplacements, tout ce fait sur IVINX
                      </div>
                      </div>
                  </Box>
              </Grid> */}

              {/* <Grid item>
                  <Box sx={{ boxShadow: 4 }} className={classesBody.carrousel}>
                      <div className={classesBody.slideImg}>
                          <img className={classesBody.slideImg} src={geo}/>
                      </div>
                      <div className={classesBody.slideText}>
                      <div className={classesBody.slideTitle}>
                          Suivez litinereraire
                      </div>
                          <div className={classesBody.slideDesc}>
                              Choisissez un évènement, proche ou non, suivez l'itinéraire en seul click, simple et éfficace
                          </div>
                      </div>
                  </Box>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Slide>
    </>
  )
}

export default Header