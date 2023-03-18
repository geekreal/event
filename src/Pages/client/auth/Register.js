import { VpnKey } from '@mui/icons-material';
import { Avatar, Button, Chip, Container, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import useStyle from './Style';
import GoogleButton from 'react-google-button';
import { ReactElement, Fragment, useState } from 'react'
import ClientNavBar from '../../../components/client/navbar/ClientNavbar';
import swal from 'sweetalert';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Login = () => {
    const [register, setRegiste] = useState(false);
    const history = useHistory();
    const classes = useStyle();

    const [registerInput, setRegister] = useState({
        name: '',
        prenom: '',
        pays: '',
        adresse: '',
        telephone: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: []
    });

    // attribuer les valeurs au differents champ à chaque changement d'etat
    const handleInput = (e) => {
        e.persist();

        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };
      // inscription
      const registerSubmit = (e) => {
        //TODO handle form submit
        e.preventDefault();

        const data =  {
            name: registerInput.name,
            prenom: registerInput.prenom,
            email: registerInput.email,
            telephone: registerInput.telephone,
            adresse: registerInput.adresse,
            pays: registerInput.pays,
            password: registerInput.password,
            type_user: "USER",
            password_confirmation: registerInput.password_confirmation,
        }
        // send the request
        //config/'supports_credentials' => true, dans laravel
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/admin/register/`, data).then(resp => {
                if (resp.data.status === 200) {
                    localStorage.setItem('auth_token' , resp.data.auth_token)
                    localStorage.setItem('auth_name' , resp.data.username)
                    swal("Parfait", resp.data.message, "success");
                    history.push('/admin/home');
                } else {
                    setRegister({...registerInput , error_list: resp.data.validation_errors })
                }
            });
        });
    }
    

    return (
        <div>
            <Grid container 
            // sx={{
            //     marginTop: -1,
            // }} 
            >
                <Grid item xs={12} sm={6} className={classes.leftGrid}>
                    <Typography variant='h3' className={classes.leftGridText}>
                        Le debut d'une nouvelle aventure
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
                        Déjà membre ? Se connecter!
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
                                    label="S'inscrire avec google"
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
                                    label="S'inscrire avec facebook"
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
                                <form onSubmit={registerSubmit} className={classes.rightGrid} >
                                    <TextField
                                        fullWidth
                                        margin='dense' size='small'name='name' 
                                        onChange={handleInput} value={registerInput.name}
                                        id="name" label="Karl Jons" variant="outlined"
                                    />
                                    <Typography variant='p' component="span">
                                        {registerInput.error_list.name}
                                    </Typography><br/>
                                   
                                    <TextField
                                        fullWidth
                                        margin='dense' size='small' name='email' 
                                        onChange={handleInput} value={registerInput.email}
                                        id="email" label="email" variant="outlined"
                                    />
                                    <Typography variant='p' component="span">
                                        {registerInput.error_list.email}
                                    </Typography><br/>

                                    <TextField
                                        fullWidth
                                        margin='dense' size='pays' name='pays' 
                                        onChange={handleInput} value={registerInput.pays}
                                        id="pays" label="pays" variant="outlined"
                                    />
                                    <Typography variant='p' component="pays">
                                        {registerInput.error_list.name}
                                    </Typography><br/>


                                    <TextField
                                        fullWidth
                                        margin='dense' size='ville' name='adresse' 
                                        onChange={handleInput} value={registerInput.adresse}
                                        id="adresse" label="adresse" variant="outlined"
                                    />
                                    <Typography variant='p' component="span">
                                        {registerInput.error_list.adresse}
                                    </Typography><br/>

                                    <TextField
                                        fullWidth
                                        margin='dense' size='telephone' name='telephone' 
                                        onChange={handleInput} value={registerInput.telephone}
                                        id="telephone" label="telephone" variant="outlined"
                                    />
                                    <Typography variant='p' component="span">
                                        {registerInput.error_list.telephone}
                                    </Typography><br/>
                                    
                                    <TextField fullWidth margin='dense'
                                    size='small'
                                    name='password' 
                                    onChange={handleInput} value={registerInput.password}
                                    id="password" label="Mot de passe" variant="outlined"
                                    />
                                    <Typography variant='p' component="span">
                                        {registerInput.error_list.password}
                                    </Typography><br/>

                                    <TextField fullWidth margin='dense'
                                    size='small'
                                    name='password_confirmation' 
                                    onChange={handleInput} value={registerInput.password_confirmation}
                                    id="password" label="Confirmer le mot de passe" variant="outlined"
                                    />
                                    <Typography variant='p' component="span">
                                        {registerInput.error_list.password_confirmation}
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
                                    {/* <Button
                                        color="primary"
                                        size="large"
                                        className={classes.forgetButton}
                                    >
                                        Mot depasse oublié
                                    </Button> */}
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