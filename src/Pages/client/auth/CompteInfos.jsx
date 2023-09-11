import { CloseTwoTone, SecurityUpdateTwoTone, UpdateOutlined, UpdateSharp } from '@mui/icons-material';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import Loading from 'react-loading';

const CompteInfos = () => {
    const id = localStorage.getItem('redis_user_auth_id');
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userInfos, setUserInfos] = useState({
        nom: "",
        prenom: '',
        email:'',
        adresse:'',
        pays: '',
        ville:'',
        telephone: '', 
    });

    const [registerInput, setRegister] = useState({
        name: '',
        pays: '',
        adresse: '',
        telephone: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const handleShowForm  = () => {
        setShowForm(true);
    }

    useEffect(() => {
        axios.get(`api/user/${id}/information`).then(res=> {
        //console.log(res.data.events);
            if (res.status === 200) {
                setUserInfos({...userInfos, 
                nom : res.data.name,
                pays: res.data.pays,
                telephone: res.data.telephone,
                email: res.data.email,
                adresse: res.data.adresse,
            });

            setRegister({...registerInput, 
                name: res.data.name,
                pays: res.data.pays,
                adresse: res.data.adresse,
                telephone: res.data.telephone,
            })

            // console.log(registerInput);

            }
            setLoading(false);
        });
    }, []);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
      // inscription
    const registerSubmit = (e) => {
        //TODO handle form submit
        e.preventDefault();
        setLoading(true)

        const data =  {
            name: registerInput.name,
            // prenom: registerInput.prenom,
            email: registerInput.email,
            telephone: registerInput.telephone,
            adresse: registerInput.adresse,
            pays: registerInput.pays,
        }

        // send the request
        //config/'supports_credentials' => true, dans laravel
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/admin/register/`, data).then(resp => {
                if (resp.data.status === 200) {
                    setSnackbarColor("success");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)

                } else {
                    setSnackbarColor("error");
                    setOpenSnackbar(true);
                    setMessage(resp.data.message)
                    setLoading(false)
                    setRegister({...registerInput , error_list: resp.data.validation_errors })
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
        <Box xs={3} sm={2} padding={3} textAlign='center'>
            <Typography variant="h5" component="strong">
                Information Profile
            </Typography>
        </Box>
        <Grid container direction="row" padding={2} marginBottom={2}>
            <Grid item sm={6} sx={{paddingLeft: 5}}>
                <Typography variant='h3' sx={{fontSize: 18}}>
                    Nom et Prénom
                </Typography>
                <Typography variant='h4' sx={{fontSize: 14}}>
                    {userInfos.nom}
                </Typography><br />

                <Typography variant='h3' sx={{fontSize: 18}}>
                Contact
                </Typography>
                <Typography variant='h4' sx={{fontSize: 14}}>
                    {userInfos.email} <br />
                    {userInfos.telephone} <br />
                    {userInfos.adresse}-{userInfos.pays} <br />
                </Typography>
            </Grid>
            <Grid item sm={6}>
            <Container>
            {showForm === false ?  
                <Stack>
                    <Button variant='contained' size='large'onClick={handleShowForm}>
                        <UpdateSharp sx={{marginRight: 2}}/> Mettre à jour vos informations
                    </Button>
                </Stack>: ''
            }
            {showForm === true ? 
                <Fragment>
                    <form onSubmit={registerSubmit}  >
                    <TextField fullWidth margin='dense' size='small'name='name' 
                    onChange={handleInput} value={registerInput.name === null ? '' : registerInput.name}
                    id="name" label="Nom et prénom" variant="outlined"
                    />
                    <Typography variant='p' component="span">
                        {registerInput.error_list.name}
                    </Typography><br/>
                    
                    <TextField
                        fullWidth
                        margin='dense' size='telephone' name='telephone' 
                        onChange={handleInput} value={registerInput.telephone === null ? '' : registerInput.telephone}
                        id="telephone" label="telephone" variant="outlined"
                    />
                    <Typography variant='p' component="span">
                        {registerInput.error_list.telephone}
                    </Typography><br/>

                    <TextField
                        fullWidth
                        margin='dense' size='pays' name='pays' 
                        onChange={handleInput} value={registerInput.pays === null ? '' : registerInput.pays}
                        id="pays" label="pays" variant="outlined"
                    />
                    <Typography variant='p'>
                        {registerInput.error_list.name}
                    </Typography><br/>


                    <TextField
                        fullWidth
                        margin='dense' size='large' name='adresse' 
                        onChange={handleInput} value={registerInput.adresse === null ? '' : registerInput.adresse}
                        id="adresse" label="adresse" variant="outlined"
                    />
                    <Typography variant='p' component="span">
                        {registerInput.error_list.adresse}
                    </Typography><br/>

                    <Button variant="contained"
                        color="primary"
                        size="large"
                        type='submit'
                    >
                        <UpdateOutlined sx={{marginRight: 2}}/>{loading ? <Loading type='balls' color="white" height={40} width={40} delay={0.5}/> : 'Mettre à jour'}
                    </Button>
                    <Button
                        color="warning"
                        size="large"
                        variant='contained'
                        onClick={() => {setShowForm(false)}}
                        sx={{marginLeft: 3}}
                    >
                         <CloseTwoTone sx={{marginRight: 2}}/>Fermer
                    </Button>
                    </form>
                </Fragment> : ''
            }
            </Container>
            </Grid>
        </Grid>
    </div>
  )
}

export default CompteInfos