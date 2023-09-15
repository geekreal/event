import React from 'react'
import { VpnKey } from '@mui/icons-material';
import { Alert, Avatar, Button, Chip, Container, Divider, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import ClientNavBar from '../../../components/client/navbar/ClientNavbar';
import useStyle from './Style';
import GoogleButton from 'react-google-button';
import { ReactElement, Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';
import Loading from 'react-loading';
import axios from 'axios';
import swal from 'sweetalert';


const Login = () => {
    const [login, setlogin] = useState(false);
    const classes = useStyle();

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    const [loginInput, setLogin] = useState({   
        email: '',
        password: '',
        error_list: []
    });

    // attribuer les valeurs au differents champ à chaque changement d'etat
    const handleInput = (e) => {
        e.persist();

        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

     // inscription
     const loginSubmit = (e) => {
        //TODO handle form submit
        e.preventDefault();
        setLoading(true)

        const data =  {
            email: loginInput.email,
            password: loginInput.password,
        }
        // send the request
        //config/'supports_credentials' => true, dans laravel

        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/admin/login`, data).then(resp => {
                localStorage.setItem('redis_user_mail', loginInput.email);

                if (resp.data.status === 200) {
                    localStorage.setItem('redis_user_auth_token' , resp.data.auth_token);
                    localStorage.setItem('redis_user_auth_name' , resp.data.username);
                    localStorage.setItem('redis_user_auth_id' , resp.data.user_id);
                    
                    
                    setSnackbarColor("success");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)
                    history.push('/event');

                }else if(resp.data.status === 400) {
                    setSnackbarColor("error");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)
                    setLogin({...loginInput , error_list: resp.data.validation_errors })
                } else if(resp.data.status === 102) {
                    // verify account
                    setSnackbarColor("info");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)
                    history.push('/event/user/verify-email');

                }else{
                    setSnackbarColor("warning");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)
                    setLogin({...loginInput , error_list: resp.data.validation_errors });
                }   
            });
        })
        .catch((error) => {
            // Error
            setSnackbarColor("error");
            setOpenSnackbar(true);
            setMessage(error.message)
            setLoading(false)
            console.log(error.message);
        });
    }

    return (
        <div>
            {/* <ClientNavBar/> */}
        {/* <ClientNavBar /> */}
        <Grid container className={classes.backContainer}>

        {openSnackbar? <Fragment>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal:'center' }}
                autoHideDuration={10000}
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                key={"top" + "right"}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarColor} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Fragment> : ""}
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
                    Vous êtes nouveau ? 
                    <Link to='/event/user/register'> Inscrivez vous pour contunuer!</Link> 
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
                                <Chip label="OU"/>
                            </Divider>
                        </Container>

                        <Container>
                            <form className={classes.rightGrid} onSubmit={loginSubmit}>
                                <TextField
                                    fullWidth
                                    margin='dense' size='small'
                                    onChange={handleInput} value={loginInput.email}
                                    name='email' id="email" label="email" variant="outlined"
                                />
                                
                                <TextField fullWidth margin='dense'
                                size='small'
                                onChange={handleInput} value={loginInput.password}
                                name='password' id="password" label="Mot de passe" variant="outlined"
                                />
                                
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
                                    {loading ? <Loading type='balls' color="white" height={40} width={40} delay={0.5}/> : 'Connexion'}
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
