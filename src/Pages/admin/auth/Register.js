import React, { useState } from 'react';

import {
    AppBar,
    Button, CardActions, Card,
    CardActionArea, CardContent,
    CardHeader, Container, TextField,
    Toolbar, Typography, Grid, Avatar, Divider
} from '@mui/material';
import {useHistory} from "react-router-dom";

import makeStyles from '@mui/styles/makeStyles';
import authStyle from '../../../assets/admin/styles/authStyle';
import { VpnKey, Add, AppRegistration, AppRegistrationOutlined, PersonAddAlt } from '@mui/icons-material';
import { theme } from '../../../components/admin/theme';
import { pink } from '@mui/material/colors';
import axios from 'axios';
import swal from 'sweetalert';



const Register = () => {
    // function
    const history = useHistory();
    const classes = authStyle();

    const [registerInput, setRegister] = useState({
        name: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        pays: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });
    

    const handleInput = (e) => {
        //TODO handle input
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

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
            type_user: "ADMIN",
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
                    history.push('/admin');
                } else {
                    setRegister({...registerInput , error_list: resp.data.validation_errors })
                }
            });
        });
    }
    

    // page
    return (<Container >
        <AppBar>
            <Toolbar>
                <Typography>
                    Création de profile
                </Typography>
            </Toolbar>
        </AppBar>

        <Grid container
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item xs={3}>
                <Card className={classes.inputContainer}>
                <form  onSubmit={registerSubmit} >
                    <CardActions>
                        <Grid className={classes.RegisterHeader} container
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid item xs={3} className={classes.RegisterHeaderAvatar}>
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, height: 60, width: 60 }}>
                                    <PersonAddAlt />
                                </Avatar>
                            </Grid>
                            <Grid item xs={3}>
                                <Divider>
                                    <Typography className={classes.RegisterHeaderText} variant='h6' component="strong">
                                        Register-Admin
                                    </Typography>
                                </Divider>
                            </Grid>
                        </Grid>
                    </CardActions>
                    <CardActionArea>
                        <CardContent>
                        <TextField
                                name="name" id="name" label="Nom"
                                onChange={handleInput}
                                value={registerInput.name}
                                fullWidth
                                margin='normal'
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.name}
                            </Typography>

                            <TextField
                                fullWidth
                                name="prenom" 
                                onChange={handleInput}
                                value={registerInput.prenom}
                                margin='normal'
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                id="prenom" label="Prénoms" variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.prenom}
                            </Typography>

                            <TextField
                                fullWidth

                                onChange={handleInput}
                                value={registerInput.email}
                                margin='normal'
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="email" id="email" label="Email" variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.email}
                            </Typography>

                            <TextField
                                fullWidth
                                name="telephone" 
                                onChange={handleInput}
                                value={registerInput.telephone}
                                margin='normal'
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                id="telephone" label="Numéro de téléphone" variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.telephone}
                            </Typography>

                            <TextField
                                name="pays" 
                                onChange={handleInput}
                                value={registerInput.pays}
                                fullWidth
                                margin='normal'
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                id="pays" label="Pays"
                                variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.pays}
                            </Typography>


                            <TextField
                                name="adresse" 
                                onChange={handleInput}
                                value={registerInput.adresse}
                                fullWidth
                                margin='normal'
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                id="adresse" label="Adresse"
                                variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.adresse}
                            </Typography>

                            <TextField
                                name='password'
                                onChange={handleInput}
                                value={registerInput.password}
                                fullWidth
                                className={classes.textField}
                                inputProps={
                                    { className: classes.input }
                                }
                                margin='normal' label="Mot de passe" variant="outlined"
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.password}
                            </Typography>


                            <TextField
                                name='password_confirmation'
                                onChange={handleInput}
                                value={registerInput.password_confirmation}
                                fullWidth
                                className={classes.textField}
                                inputProps={
                                    { className: classes.input }
                                }
                                margin='normal'variant="outlined"
                                label='Confirmer le mot de passe'
                            />
                            <Typography variant='p' component="span">
                                {registerInput.error_list.password_confirmation}
                            </Typography>


                        </CardContent>
                    </CardActionArea>

                    <CardActions className={classes.FooterPied}>
                        <Button variant="contained"
                            type='submit'
                            color="primary"
                            size="large"
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
                    </CardActions>
                    </form>
                </Card>
            </Grid>
        </Grid>

    </Container>

    );
}

export default Register;