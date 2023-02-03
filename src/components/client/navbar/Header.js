import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Fade, Grid, Icon, InputAdornment, Paper, Slide, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import animWomen from '../../../assets/client/images/animWomenf.gif';
import bgAnim from '../../../assets/client/images/bgAnim.gif';
import { InputUnstyled } from '@mui/base';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/fr';
import useStyle from './ClientStyle';
import rond from '../../../assets/client/images/rond.png';

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

const Header = () => {
    const classes = useStyle();

    const date = moment().locale('fr').format('dddd');

    const [show, setShow] = useState(true);
    const showSearch = () =>{
      setShow(prev => !prev) 
    }
  


  return (
    <div className={classes.headerBack}>
        {/* Bckground */}
          <Container className={classes.headerSection}>
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item sx={{textAlign: 'center'}}>
                <div  className={classes.headerTitle}>
                  Vous êtes de plus en plus proche du monde.
                </div>
                {/* <Typography variant='p' component='div' className={classes.headerDesc}>
                  Participez à des évènements, des conférences, nouez de nouveaux liens, rejouissez-vous et aprenez!
                  avec nous le monde est plus proche de vous !
                </Typography>
                <Button variant='contained' size='large' component='div' onClick={showSearch} className={classes.headerBtn}>
                  <Typography variant='btnText' component='div' className={classes.headerBtnText}>
                     Quoi de neuf aujourd'hui ?
                  </Typography>
                </Button>  */}
              </Grid>
              {/* <Grid item xs={6}>
                <Fade in={true} timeout={100000}>
                  <div>
                    <Container>
                      <img className={classes.rond} src={rond} alt="Animation" />
                    </Container>
                  </div>
                </Fade>
              </Grid> */}
            </Grid >
          </Container>

          {/* recherche */}
        {show && 
        <Slide in={true} direction='up' mountOnEnter unmountOnExit>
          <div>
            <Container className={classes.action}>
            <Box elevation={6} className={classes.paperAction}>
              <Grid container spacing={2} className={classes.paperGrid}>
                <Grid item xs={12} direction='column' className={classes.actionTitleGrid}>
                  {/* <Typography component='div' className={classes.actionTitle} variant='actionTitle'>
                    Le monde, plus proche de vous.
                  </Typography> */}
                  <Typography sx={{fontSize: 20, color: 'white'}}>
                    C'est {date}, Que désirez-vous?
                  </Typography>
                </Grid>
                <Grid item className={classes.actionTitleGrid} sx={{display: 'block'}} direction='row'>
                  <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1),}} onClick={showSearch} className={classes.actionBtn}>
                    <Person2Sharp sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}} />
                    <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                      Mes stars en prestation
                    </Typography>
                  </Button> 
                  <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1),}} onClick={showSearch} className={classes.actionBtn}>
                    <Celebration sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}} />
                    <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                      Univers des évènements
                    </Typography>
                  </Button> 
                  {/* <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1),}} onClick={showSearch} className={classes.actionBtn}>
                  <Event sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}} />
                  <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                      Evènements gratuits
                    </Typography>
                  </Button>  */}
                  <Button variant='contained' size='large' component='div' sx={{margin: (1,0,1,1),}} onClick={showSearch} className={classes.actionBtn}>
                  <Place sx={{ fontSize: 30 , marginRight :  theme.spacing(2)}} />
                  <Typography variant='btnText' component='div' className={classes.headerBtnText} sx={{lineHeight: 1}}>
                      Evènements chez moi
                    </Typography>
                  </Button> 
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
                  <IconButton aria-label="delete" className={classes.actionBtnIcone} sx={{
                    color: 'primary.main3',
                    margin: (1,0,1,1),
                    }} >
                    <EmojiEvents variant='large' sx={{ fontSize: 40 }} />
                  </IconButton>

                  <IconButton aria-label="delete" className={classes.actionBtnIcone} sx={{
                    color: 'primary.main3',
                    margin: (1,0,1,1),
                    }} >
                    <Cake variant='large' sx={{ fontSize: 40 }} />
                  </IconButton>

                  <IconButton aria-label="delete" className={classes.actionBtnIcone} sx={{
                    color: 'primary.main3',
                    margin: (1,0,1,1),
                    }} >
                    <Celebration variant='large' sx={{ fontSize: 40 }} />
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.actionBtnIcone} sx={{
                    color: 'primary.main3',
                    margin: (1,0,1,1),
                    }} >
                    <Event variant='large' sx={{ fontSize: 40 }} />
                  </IconButton>
                  </Container>
                </Grid>
              
              </Grid>
            </Box>
            </Container>
          </div>
        </Slide>}
    </div>
  )
}

export default Header