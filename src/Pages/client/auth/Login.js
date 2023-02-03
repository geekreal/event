import React from 'react'
import { VpnKey } from '@mui/icons-material';
import { Avatar, Button, Chip, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import ClientNavBar from '../../../components/client/navbar/ClientNavbar';
import useStyle from './Style';
import GoogleButton from 'react-google-button';
import { ReactElement, Fragment, useState } from 'react'


const Login = () => {
    const [login, setlogin] = useState(false);
    const classes = useStyle();

    return (
        <div>
        <ClientNavBar />
        <Grid container 
        // sx={{
        //     marginTop: -1,
        // }} 
        >
            <Grid item xs={12} sm={6} className={classes.leftGrid}>
                <Typography variant='h3' className={classes.leftGridText}>
                    Ravi de vous revoir !
                </Typography>
            </Grid>
            {/* <div > */}
                
                <Grid item xs={12} sm={6}className={classes.rightDiv}>
                {/* <Typography variant='h6' 
                sx={{margin: 2}} >
                    Déjà membre ? Se connecter!
                </Typography> */}
                    <Paper elevation={6} sx={{
                        padding: 2,
                        margin: 2
                    }}>
                        <Typography align='center' variant='h6' 
                sx={{margin: 2}} >
                    Nouveau membre ? Se connecter!
                </Typography>
                        <Container  sx={{marginBottom: 2,}}>
                            <GoogleButton
                                style={{
                                    background: 'primary',
                                    height: 'auto',
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    // padding: '0 6px',
                                    border: '2px solid transparent',
                                    boxSizing: 'border-box',
                                    borderRadius: '4px',
                                    width: "100%",
                                    fontSize: '1rem',
                                    verticalAlign: 'middle',
                                    alignItems: 'center',
                                    lineWeight: 'normal',
                                }}
                                label="Se connecter avec google"
                                 // can be light or dark
                                onClick={() => { console.log('Google button clicked') }}
                            />
                        </Container>
                        <Container  sx={{marginBottom: 2,}}>
                            <GoogleButton
                                style={{
                                    background: 'primary',
                                    // height: 'auto',
                                    maxWidth: '100%',
                                    minWidth: '100%',
                                    padding: '0 6px',
                                    border: '2px solid transparent',
                                    boxSizing: 'border-box',
                                    borderRadius: '4px',
                                    width: "100%",
                                    fontSize: '1rem',
                                    verticalAlign: 'middle',
                                    horizontalAlign: 'middle',
                                    alignItems: 'center',
                                    lineWeight: 'normal',
                                }}
                                label="Se connecter avec facebook"
                                 // can be light or dark
                                onClick={() => { console.log('Google button clicked') }}
                            />
                        </Container>

                        <Container>
                            <Divider>
                                <Chip label="OU" />
                            </Divider>
                        </Container>

                        <Container>
                            <form className={classes.rightGrid} >
                                <TextField
                                    fullWidth
                                    margin='dense' size='small'
                                    name='email' id="email" label="email" variant="outlined"
                                />
                                <Typography variant='p' component="span">
                                </Typography><br/>
                                
                                <TextField fullWidth margin='dense'
                                size='small'
                                name='password' id="password" label="Mot de passe" variant="outlined"
                                />
                                <Typography variant='p' component="span">
                                </Typography><br/>
                                
                                <Typography variant='p' sx={{
                                    fontSize: 13,
                                    lineHeight: 1.6,
                                }}>
                                
                                En continuant, vous acceptez les 
                                Conditions générales d’utilisation
                                de ivinx.<br/> Lire notre  
                                Politique de confidentialité ! 
                                </Typography><br/><br/>
                                <Button variant="contained"
                                    color="primary"
                                    size="large"
                                    type='submit'
                                >
                                    Connexion
                                </Button>
                                <Button
                                    color="primary"
                                    size="large"
                                    className={classes.forgetButton}
                                >
                                    Mot depasse oublié
                                </Button>
                            </form>
                        </Container>

                    </Paper>
                </Grid>
            {/* </div> */}
            
        </Grid>
    </div>
    )
}

export default Login