import { FacebookOutlined, Instagram, Twitter, WhatsApp } from '@mui/icons-material';
import { Container, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import UseStyle from './FooterStyle'

const Footer = () => {
  const classes = UseStyle();
  return (
    <div className={classes.footerContent}>
      <Container className={classes.footerContainer}>
        <Grid container className={classes.footerGrid}>
          <Grid item xs>
              Organisateur
              <ul className={classes.footerMenu}>
                <li>Contacter nous</li>
                <li>Lancer une pub</li>
                <li>Partenariat</li>
              </ul>
          </Grid>
          <Grid item xs>
              Visiteurs
              <ul className={classes.footerMenu}>
                <li>J'ai perdu mon ticket</li>
                <li>Faire un don</li>
              </ul>
          </Grid>
          <Grid item xs>
              Condition d'utilisation
              <ul className={classes.footerMenu}>
                <li>Contacter nous</li>
                <li>Lancer une pub</li>
              </ul>
          </Grid>
        </Grid>

        <Grid container direction='row'>
          <Grid item xs className={classes.footerCopy}>
            <Typography >
              INVENOS Coprright 2023 By TECMATRIX
            </Typography>
          </Grid>
          <Grid item xs className={classes.footerIcone}>
            <IconButton sx={{color: 'white' }}>
              <FacebookOutlined sx={{fontSize: 40}}/>
              <Twitter sx={{fontSize: 40}}/>
              <Instagram sx={{fontSize: 40}}/>
              <WhatsApp sx={{fontSize: 40}}/>
            </IconButton>
          </Grid>
        </Grid>
        
      </Container>
    </div>
  )
}

export default Footer