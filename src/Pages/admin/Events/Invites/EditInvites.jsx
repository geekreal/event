import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';


import useStyle from './Style';
import { ListAltSharp, PersonAdd, Refresh } from '@mui/icons-material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import axios from 'axios';
import SimpleBackdrop from '../../../../components/loader/SimpleBackdrop';
import CircularProgress from '../../../../components/loader/CircularProgress';


function EditInvites(props) {
    const classes = useStyle();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [circularLoading, setCircularLoading] = useState(false);
    const [error, setError] = useState([]);
    const invitesId = props.match.params.id;
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;
    const [picture, setPicture] = useState([]);

    const [updateInvitesInput, setInvites] = useState({
        nom: '',
        description: '',
        photo: '',
    });

    const handleInput = (e) => {
        e.persist();
        setInvites({ ...updateInvitesInput, [e.target.name]: e.target.value });
    };

    const handleImage = (e) =>{
        setPicture({photo : e.target.files[0]});
        console.log(e.target.files[0])
      }

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`api/admin/events/invites/${id}/infos`).then(resp => {
            if (resp.data.status === 200) {
                setInvites(resp.data.invites)
                setLoading(false);
            }
            else if (resp.data.status === 404) {
                swal("Infos", resp.data.message, "error");
                setLoading(false);
                history.push('/admin/events/invites/list');

            } 
            // else {
            //     swal("Erreur", resp.data.message, "error");
            //     setLoading(false);
            //     history.push('/admin/events/invites/list');
            // }

        });
    }, [props.match.params.id , history]);

    const updateInvitesSubmit = (e) => {
        e.preventDefault();
        const id = props.match.params.id;

        const formData = new FormData();
        formData.append('photo' , picture.photo)
        formData.append('nom', updateInvitesInput.nom)
        formData.append('description' , updateInvitesInput.description)
        formData.append('Authorization' , localStorage.getItem('auth_token'))

        setCircularLoading(true);
        console.log(formData);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/admin/events/invites/${id}/update`, formData).then(resp => {
                if (resp.data.status === 200) {

                    swal("Parfait", resp.data.message, "success");
                    setCircularLoading(false);
                    history.push('/admin/events/invites/list');

                }

                else if (resp.data.status === 404) {

                    swal("Not Found", resp.data.status+" "+resp.data.message, "error");
                    setCircularLoading(false);
                    history.push('/admin/events/invites/list');
                } 
                else if (resp.data.status === 501){

                    swal("Erreur Serveur !", resp.data.status+" "+resp.data.message, "error");
                    setCircularLoading(false);

                } else if (resp.data.status === 400){

                    setError(resp.data.validation_errors);
                    console.log(resp.data.validation_errors);
                    setCircularLoading(false);
                    
                }
            });
        });

    };

    if(loading){
        return <SimpleBackdrop/>
    }

    return (
        <div className="content">
            <Paper className='breadPaper' elevation={1} background-color="#fff">
                <div role="presentation" className={classes.breadcrumbs}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/admin/home">
                            Accueil
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            to="/admin/events/invites/list"
                        >
                            Aller à la liste des ivnités
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            to="/admin/events/invites/create"
                            aria-current="page"
                        >
                            Ajouter de nouveaux invités
                        </Link>
                    </Breadcrumbs>
                </div>
            </Paper>

            <Stack direction="row" spacing={3} className='breadPaper' background-color="#fff">
                <Link to="/admin/events/invites/create" sx={{ textDecoration: "none" }}>
                    <Button color='primary' size='large' variant="contained" endIcon={<PersonAdd />}>
                        Ajouter de nouveaux clients
                    </Button>
                </Link>
                <Link to="/admin/events/invites/list" sx={{ textDecoration: "none" }}>
                    <Button color='secondary' size='large' variant="contained" endIcon={<ListAltSharp />}>
                        Aller à la liste des clients
                    </Button>
                </Link>
                <Link to={`/admin/events/invites/edit/${invitesId}`} sx={{ textDecoration: "none" }}>
                    <Button color='success' size='large' variant="contained">
                        <Refresh />
                    </Button>
                </Link>
            </Stack>

            <Paper elevation={2} className="breadPaper">
                <Box item xs={3} sm={2} className={classes.formTitle}>
                    <Typography variant="h5" component="strong">
                        Mise à jours des informations
                    </Typography>
                </Box>
                <form onSubmit={updateInvitesSubmit}>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <TextField
                                margin="none" label="Nom du client"
                                fullWidth
                                variant="outlined" name='nom'
                                value={updateInvitesInput.nom}
                                onChange={handleInput} />
                            <Typography variant='p' component="span">
                                {error.nom}
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    margin="none" label="description" variant="outlined" name='description'
                                    value={updateInvitesInput.description}
                                    onChange={handleInput} />
                                <Typography variant='p' component="span">
                                    {error.description}
                                </Typography>
                            </FormControl>
                        </Grid>

                        <Grid item sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                type='file'
                                fullWidth
                                className='inputfile'
                                margin="none" variant="outlined" name='photo'
                                // value={updateInvitesInput.photo}
                                onChange={handleImage} 
                            />
                            <Typography variant='p' component="span">
                                {error.photo}
                            </Typography>
                            </FormControl>
                            <img height={100} width={100} src={`${BASE_URL}${updateInvitesInput.photo}`}
                            alt="présentaion"
                            loading="lazy" />
                        </Grid>

                    </Grid>
                    <Stack direction="row" spacing={2} sx={{ margin: 5 }}>
                        <Button type='submit' size="large" className={classes.submitButton} color="success" variant="contained">
                            Mettre à jour
                        </Button> {circularLoading ? <CircularProgress /> : ""}
                        <Button size="large" color="error" variant="outlined">
                            Annuler
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    );
}

export default EditInvites