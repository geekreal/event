import { Check } from '@mui/icons-material';
import { Box, Button, Fade, FormControl, FormGroup, Grid, Paper, Slide, TextareaAutosize, TextField, Typography } from '@mui/material';
import React from 'react'
import BodyStyle from './BodyStyle';
import contact from '../../../assets/client/images/contact.png';


const Content = () => {
    const classes = BodyStyle();
  return (
    <> 
    <Slide in={true} direction='up' mountOnEnter unmountOnExit appear={false}> 
    <div className={classes.contentPage}> 
        <Grid container direction='row' className={classes.getTouchGrid}>
        <Grid item className={classes.touchImgGrid} component='div'>
            <img src={contact} className={classes.touchImg}/>
        </Grid>
        <Grid item className={classes.touchText} >
            <div className={classes.touchTitle}>
                Soumettez-nous votre évènements
            </div>
            <div className={classes.touchActionTitle}>
            Veillez remplir le formulaire de demande
            </div>
            <div>
                <FormGroup>
                    <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='mail' label='Votre nom et prénom' variant='outlined'/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='mail' label='Votre numéro de téléphone' variant='outlined'/>
                        <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='mail' label='Votre adresse mail' variant='outlined'/>
                    </FormControl>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='mail' label='Votre Pays et la ville' variant='outlined'/>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                    <Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' size='large'>
                        <Check/> Envoyer
                    </Button>
                    </FormControl>
                </FormGroup>
            </div>
        </Grid> 
        </Grid>

    {/* <Slide in={true} direction='left' mountOnEnter unmountOnExit> */}
        <div>
            <Grid container direction='column' className={classes.letterGrid}>
                <Box sx={{ boxShadow: 4 }} className={classes.letterBox}>
                {/* <Grow style={{ transformOrigin: '0 0 0' }}/> */}
                <Grid item xs={12}>
                    <div className={classes.letterText}>
                        <div className={classes.letterTitle}>
                            Voulez vous recevoir des offres exclusive?
                        </div>
                        <Typography className={classes.letterDesc}>
                            Souscrivez avec votre adresse mail
                        </Typography>
                    </div>
                </Grid>
                <Grid item className={classes.letterForm}>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                    name='mail' label='Votre adresse mail' variant='outlined'/>
                    <Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' size='large'>
                        <Check/> Souscrire
                    </Button>
                </Grid>
                </Box>
            </Grid>
        </div>
    {/* </Slide> */}
    </div>
    
    </Slide>
    </>
  )
}

export default Content