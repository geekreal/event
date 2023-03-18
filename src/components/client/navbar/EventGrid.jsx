import React from 'react'
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
import { Fragment } from 'react';
import { useEffect } from 'react';
import affiche from '../../../assets/client/images/affiche.jpg';
import { useState } from 'react';

const EventGrid = () => {
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const classes  = BodyStyle();

  useEffect(() => {
    const timer = setTimeout(() => {
        setLoadSkeleton(false)
      }, 10000);

      return () => {
        clearTimeout(timer)
      };
  },[]);

  return (
    <div>                    
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} className={classes.eventContainer}>          
      <Grid item xs={3} sm={4} md={4} sx={{padding: 1}}   key={1}>
        <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
            <CardHeader
              avatar={<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />}
              action={<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />}
              sx={{color: 'white' }}
              title={<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />}
              subheader={<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}}/>}>
            </CardHeader>
            <Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />

          <CardContent >
            <Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
            </Fragment>
          </CardContent>

          <CardActions disableSpacing>
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
          </CardActions>
        </Card>
      </Grid>
      
      <Grid item xs={3} sm={4} md={4} sx={{padding: 1}}   key={1}>
        <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
            <CardHeader
              avatar={<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />}
              action={<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />}
              sx={{color: 'white' }}
              title={<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />}
              subheader={<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}}/>}>
            </CardHeader>
              <Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />

          <CardContent >
            <Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
            </Fragment>
          </CardContent>

          <CardActions disableSpacing>
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
          </CardActions>

        </Card>
      </Grid>
      <Grid item xs={3} sm={4} md={4} sx={{padding: 1}}   key={1}>
        <Card sx={{ maxWidth: 400, background: alpha("#ffff" , 0.1), color: 'white', borderRadius: 5 }} className={classes.eventSingle}>
            <CardHeader
              avatar={<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />}
              action={<Skeleton animation="wave" width={40} height={40}  variant='circular' sx={{background: alpha("#ffff" , 0.1)}} />}
              sx={{color: 'white' }}
              title={<Skeleton animation="wave"  height={30} width="80%" variant='text' sx={{background: alpha("#ffff" , 0.1)}} />}
              subheader={<Skeleton animation="wave"  height={10} width="60%" variant='text' sx={{background: alpha("#ffff" , 0.1)}}/>}>
            </CardHeader>
              <Skeleton animation="wave"  height={194} width='auto' variant='rectangular' sx={{background: alpha("#ffff" , 0.1)}} />

          <CardContent >
            <Fragment>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/>
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                <Skeleton animation="wave" height={10} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/> 
            </Fragment>
          </CardContent>

          <CardActions disableSpacing>
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
              <Skeleton animation="wave" variant='circular' height={30} width={30} sx={{background: alpha("#ffff" , 0.1)}}/> 
          </CardActions>

        </Card>
      </Grid> 
     </Grid>
     </div>
  )
}

export default EventGrid