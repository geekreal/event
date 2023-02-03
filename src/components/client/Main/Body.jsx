import { Box, Button, Fade, Grid, Grow, Slide, TextField, Typography } from '@mui/material';
import React from 'react'
import BodyStyle from './BodyStyle';
import makeStyles from '@mui/material';
import calendar from '../../../assets/client/images/calendar.jpg';
import ticket from '../../../assets/client/images/ticket.png';
import geo1 from '../../../assets/client/images/geo.jpg';
import geo from '../../../assets/client/images/geo.png';
import contact from '../../../assets/client/images/contact.png';
import { Container } from '@mui/system';
import { Check } from '@mui/icons-material';


const Body = () => {
    const classes = BodyStyle();
  return (
    <div className={classes.body}>
        <Grid container className={classes.gridSlide}>
        <Grid item >
            <Box sx={{ boxShadow: 4 }} className={classes.carrousel}>
                <div className={classes.slideText}>
                    <img className={classes.slideImg} src={geo1}/>
                </div>
                <div className={classes.slideTitle}>
                    Choisissez un évènement
                    <Typography className={classes.slideDesc}>
                    Des grand évènements jusqu'au petit, vous êtes au courant
                </Typography>
                </div>
            </Box>
        </Grid>

        <Grid item >
            <Box sx={{ boxShadow: 4 }} className={classes.carrousel}>
                <div className={classes.slideText}>
                    <img className={classes.slideImg} src={ticket}/>
                </div>
                <div className={classes.slideTitle}>
                    Reservez votre place
                    <Typography className={classes.slideDesc}>
                    Les tickets au meilleurs prix c'est ici, ne perdez pas de temps pour les déplacements
                </Typography>
                </div>
            </Box>
        </Grid>

        <Grid item>
            <Box sx={{ boxShadow: 4 }} className={classes.carrousel}>
                <div className={classes.slideText}>
                    <img className={classes.slideImg} src={geo}/>
                </div>
                <div className={classes.slideTitle}>
                    Suivez litinereraire
                    <Typography className={classes.slideDesc}>
                        Choisissez un évènement, proche ou non, suivez l'itinéraire en seul click, simple et éfficace
                    </Typography>
                </div>
            </Box>
        </Grid>
      </Grid>

        {/* demander une publicité */}
      <Grid container direction='row' className={classes.getTouchGrid}>
        <Grid item className={classes.touchImgGrid} component='div'>
            <img src={contact} className={classes.touchImg}/>
        </Grid>
        <Grid item className={classes.touchText} >
            <div className={classes.touchTitle}>
                Soumettez-nous votre évènements
            </div>
            <div className={classes.touchActionTitle}>
                Soumettez-nous votre évènements
            </div>
        </Grid> 
      </Grid>

        <Slide in={true} direction='up' mountOnEnter unmountOnExit>
            <div>
                <Grid direction='column' sx={{minWidth: 450}} className={classes.letterGrid}>
                    <Box sx={{ boxShadow: 4 }} className={classes.letterBox}>
                    {/* <Grow style={{ transformOrigin: '0 0 0' }}/> */}
                    <Grid item xs={12}>
                        <div className={classes.letterText}>
                            <div className={classes.letterTitle}>
                                Voulez vous recevoir des offres exclusive?
                            </div>
                            <Typography className={classes.letterDesc}>
                                Soumettez nous votre mail, pour recevoir des offres exclusives
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item className={classes.letterForm}>
                        <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}} minWidth
                        name='mail' label='Votre adresse mail' variant='outlined'/>
                        <Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' size='large'>
                            <Check/> Souscrire
                        </Button>
                    </Grid>
                    </Box>
                </Grid>
            </div>
        </Slide>
    </div>
  )
}

export default Body