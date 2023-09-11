import React from 'react'
import ClientStyle from '../navbar/ClientStyle'
import { Avatar, Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { ShapeLine } from '@mui/icons-material';
import Shape1 from '../../../assets/client/images/Shape1.png';
import fevrier from '../../../assets/client/images/2fevrier.png';
import togocom from '../../../assets/client/images/togocom.png';
import moovafrica from '../../../assets/client/images/moovafrica.png';
import ioka from '../../../assets/client/images/ioka.png';
import sarakawa from '../../../assets/client/images/sarakawa.png';
import Carousel from 'react-material-ui-carousel';

const PartnersLists = () => {
    const classes = ClientStyle();

  return (
    <div>
        <Box sx={{display: 'flex' , justifyContent: 'center'}}>
            <div style={{textAlign: 'center'}}>
            <Typography className={classes.partnersTitle} variant='inherit'>
                Nos partenaires
            </Typography>
            <Typography className={classes.partnersDesc} variant='inherit'>
                    Ces grandes institution nous font confiance
            </Typography>
            </div>
        </Box>
        <Paper className={classes.PartnersBox} sx={{}}>
            <Carousel autoPlay={true} animation='fade' indicators={false}>
              <Grid container direction= 'row' spacing={10} sx={{
                justifyContent: 'center',
                marginTop: -5,
              }}>
                <Grid item  key={0} className={classes.partnersGrid}>
                    <img src={fevrier} className={classes.PartnersLogo} />
                </Grid>
                <Grid item  key={1} className={classes.partnersGrid}>
                    <img  src={sarakawa} className={classes.PartnersLogo}/>
                </Grid>
                <Grid item  key={2} className={classes.partnersGrid}>
                    <img src={togocom} className={classes.PartnersLogo}/>
                </Grid>
                <Grid item  key={3} className={classes.partnersGrid}>
                    <img src={moovafrica} className={classes.PartnersLogo}/>
                </Grid>
                <Grid item  key={4} className={classes.partnersGrid}>
                    <img src={ioka} className={classes.PartnersLogo}/>
                </Grid>
              </Grid>
            </Carousel>
        </Paper>
    </div>
  )
}

export default PartnersLists