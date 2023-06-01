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


const SendCodePage = () => {
    const [login, setlogin] = useState(false);
    const classes = useStyle();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("");
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [codeInput, setLogin] = useState({   
        email: '',
        verify_code: '',
        error_list: []
    });


    // attribuer les valeurs au differents champ à chaque changement d'etat
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...codeInput, [e.target.name]: e.target.value });
    };

     // inscription
     const codeSubmit = (e) => {
        //TODO handle form submit
        e.preventDefault();
        setLoading(true)

        const data =  {
            verify_code: codeInput.verify_code,
            email: localStorage.getItem('redis_user_mail'),
        }
        // send the request
        //config/'supports_credentials' => true, dans laravel
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/user/check/verification-code`, data).then(resp => {
                if (resp.data.status === 200) {
                    // Ok response
                    localStorage.setItem('redis_user_auth_token' , resp.data.auth_token);
                    localStorage.setItem('redis_user_auth_name' , resp.data.username);
                    console.log("Parfait", resp.data.message, "success");

                    setSnackbarColor("success");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false);
                    history.push('/event');

                } else if(resp.data.status === 400) {
                    setSnackbarColor("error");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false);
                }else{
                    // unknown error
                    setSnackbarColor("error");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false);
                    // setLogin({...codeInput , error_list: resp.data.validation_errors });
                }   
            });
        })
        .catch((error) => {
            // Error
            setLoading(false)
            console.log(error.message);
        });
    }

    const resendVerificationCode = (e) => {
        e.preventDefault();
        setLoading(true)

        const data =  {
            email: localStorage.getItem('redis_user_mail'),
        }
        // send the request
        //config/'supports_credentials' => true, dans laravel
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/user/resend/verification-code`, data).then(resp => {
                if (resp.data.status === 200 ) {
                     // email code send
                     setSnackbarColor("success");
                     setOpenSnackbar(true);
                     setMessage(resp.data.message)
                     setLoading(false)

                } else if(resp.data.status === 400) {
                    // invalide code
                    setSnackbarColor("error");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)
                }else{
                    // unknown error
                    setSnackbarColor("error");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false);
                    // setLogin({...codeInput , error_list: resp.data.validation_errors });
                }   
            });
        })
        .catch((error) => {
            // Error
            setLoading(false)
            console.log(error.message);
        });
    }

    return (
        <div>
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
            {/* <ClientNavBar/> */}
        {/* <ClientNavBar /> */}
        <Grid container 
        className={classes.backContainer}
        // sx={{
        //     marginTop: -1,
        // }} 
        >
            {/* <Grid item xs={12} sm={12} className={classes.leftGrid}>
                <Typography variant='h3' className={classes.leftGridText}>
                    Pour continuer votre aventure, prenez juste une minute pour vérifier votre email
                </Typography>
            </Grid> */}
            {/* <div > */}
                
                <Grid item xs={12} sm={12}className={classes.rightDiv}>
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
                    Vérification de compte <br />
                    <Typography variant='p' sx={{fontSize: 13, lineHeight: 1.6, }}>
                        Nous avons envoyé un code de évérification à votre mail de connexion. veillez saisir le code.
                    </Typography><br/>
                </Typography>

                    <Container>
                        <form className={classes.rightGrid} onSubmit={codeSubmit}>
                            <TextField
                                fullWidth
                                margin='dense' size='small'
                                onChange={handleInput} value={codeInput.verify_code}
                                name='verify_code' id="verify_code" label="Code de vérification" variant="outlined"
                            /> <br />
                            
                            <Button variant="contained"
                                color="primary"
                                size="large"
                                type='submit'
                            >
                                {loading ? <Loading type='balls' color="white" height={40} width={40} delay={0.5}/> : 'Vérifier'}
                            </Button>
                            <Button
                                color="primary"
                                size="large"
                                className={classes.forgetButton}
                                onClick={resendVerificationCode}
                            >
                                Renvoyer le code
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

export default SendCodePage