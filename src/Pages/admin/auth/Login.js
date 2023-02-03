import React from 'react';

import { AppBar, Button, CardActions, Card, CardActionArea, CardContent, CardHeader, Container, TextField, Toolbar, Typography, Grid, Avatar, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import authStyle from '../../../assets/admin/styles/authStyle';
import { VpnKey } from '@mui/icons-material';
import { theme } from '../../../components/admin/theme';
import { pink } from '@mui/material/colors';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {

    const history = useHistory();
    const classes = authStyle();

    // initialisation des variables 
    /**
     * loginIput le state
     * setLogin le setState
     */
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

    const loginSubmit = (e) => {
        e.preventDefault();
        // api data input name
        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        // sending of the request
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/admin/login`, data).then(res => {
                if (res.data.status === 200) {

                    localStorage.setItem('auth_token' , res.data.auth_token)
                    localStorage.setItem('auth_name' , res.data.username)
                    swal("Parfait", res.data.message, "success");
                    history.push('/admin/');

                }
                else if (res.data.status === 401) {
                    swal("Oops", res.data.message, "warning");
                } else {
                    // validation errors
                    setLogin({...loginInput, error_list: res.data.validation_errors });
                }
            })
        });
    } //endlogin
        return (<Container >
            <AppBar>
                <Toolbar>
                    <Typography>
                        Auhtentification
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
                        <form onSubmit={loginSubmit}>
                            <CardActions>
                                <Grid className={classes.loginHeader} container
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                >
                                    <Grid item xs={3} className={classes.loginHeaderAvatar}>
                                        <Avatar sx={{ bgcolor: theme.palette.primary.main, height: 60, width: 60 }}>
                                            <VpnKey />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Divider>
                                            <Typography className={classes.loginHeaderText} variant='h6' component="strong">
                                                Login-Admin
                                            </Typography>
                                        </Divider>
                                    </Grid>
                                </Grid>
                            </CardActions>
                            <CardActionArea>
                                <CardContent>

                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        name='email' id="email" label="Email" variant="outlined"
                                        onChange={handleInput}
                                        value={loginInput.email}
                                        InputProps={{
                                            classes: {
                                                underline: classes.textFieldUnderline,
                                                input: classes.textField,
                                            },
                                        }}
                                    />
                                    <Typography variant='p' component="span">
                                        {loginInput.error_list.email}
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        label="Mot de passe" variant="outlined"
                                        name='password'
                                        onChange={handleInput}
                                        value={loginInput.password}
                                        className={classes.textField}

                                        inputProps={
                                            { className: classes.input }
                                        } />
                                    <Typography variant='p' component="span">
                                        {loginInput.error_list.password}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>

                            <CardActions className={classes.FooterPied}>
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
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>

        </Container>

        );
    }

    export default Login;