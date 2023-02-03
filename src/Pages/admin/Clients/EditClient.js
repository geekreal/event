import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';


import useStyle from './Style';
import { ListAltSharp, PersonAdd, Refresh } from '@mui/icons-material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import axios from 'axios';
import SimpleBackdrop from '../../../components/loader/SimpleBackdrop';
import CircularProgress from '../../../components/loader/CircularProgress';


function EditClient(props) {
    const classes = useStyle();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [circularLoading, setCircularLoading] = useState(false);
    const [error, setError] = useState([]);
    const clientId = props.match.params.id;
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;
    const [picture, setPicture] = useState([]);

    // function handleClick(event) {
    //   event.preventDefault();
    //   console.info('You clicked a breadcrumb.');
    // }
    const [updateClientInput, setClient] = useState({
        nom: '',
        adresse: '',
        ville: '',
        telephone: '',
        logo: '',
        email: '',
        type_client_id: '',
    });

    const handleInput = (e) => {
        e.persist();
        setClient({ ...updateClientInput, [e.target.name]: e.target.value });
    };

    const handleImage = (e) =>{
        setPicture({logo : e.target.files[0]});
        console.log(e.target.files[0])
      }

    useEffect(() => {
        const id = props.match.params.id;
        axios.get(`api/admin/clients/${id}/infos`).then(resp => {
            if (resp.data.status === 200) {
                setClient(resp.data.clients)
                console.log(updateClientInput);
                setLoading(false);
            }
            else if (resp.data.status === 404) {
                swal("Infos", resp.data.message, "error");
                setLoading(false);
                history.push('/admin/clients/list');

            } 
            // else {
            //     swal("Erreur", resp.data.message, "error");
            //     setLoading(false);
            //     history.push('/admin/clients/list');
            // }

        });
    }, [props.match.params.id , history]);

    const updateClientSubmit = (e) => {
        e.preventDefault();
        const id = props.match.params.id;

        const formData = new FormData();
        formData.append('logo' , picture.logo)
        formData.append('nom', updateClientInput.nom)
        formData.append('adresse' , updateClientInput.adresse)
        formData.append('ville', updateClientInput.ville)
        formData.append('telephone' , updateClientInput.telephone)
        formData.append('email' ,updateClientInput.email)
        formData.append('type_client_id',  updateClientInput.type_client_id)
        formData.append('Authorization' , localStorage.getItem('auth_token'))

        setCircularLoading(true);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/admin/clients/${id}/update`, formData).then(resp => {
                if (resp.data.status === 200) {
                    swal("Parfait", resp.data.message, "success");
                    setCircularLoading(false);
                    history.push('/admin/clients/list');

                }

                else if (resp.data.status === 404) {

                    swal("Not Found", resp.data.status+" "+resp.data.message, "error");
                    setCircularLoading(false);
                    history.push('/admin/client/list');
                } 
                else if (resp.data.status === 501){

                    swal("Erreur Serveur !", resp.data.status+" "+resp.data.message, "error");
                    setCircularLoading(false);

                }else{

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
                            to="/admin/clients/list"
                        >
                            Clients
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            to="/admin/clients/create"
                            aria-current="page"
                        >
                            Ajouter de nouveaux clients
                        </Link>
                    </Breadcrumbs>
                </div>
            </Paper>

            <Stack direction="row" spacing={3} className='breadPaper' background-color="#fff">
                <Link to="/admin/clients/create" sx={{ textDecoration: "none" }}>
                    <Button color='primary' size='large' variant="contained" endIcon={<PersonAdd />}>
                        Ajouter de nouveaux clients
                    </Button>
                </Link>
                <Link to="/admin/clients/list" sx={{ textDecoration: "none" }}>
                    <Button color='secondary' size='large' variant="contained" endIcon={<ListAltSharp />}>
                        Aller à la liste des clients
                    </Button>
                </Link>
                <Link to={`/admin/clients/edit/${clientId}`} sx={{ textDecoration: "none" }}>
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
                <form onSubmit={updateClientSubmit}>
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <TextField
                                margin="none" label="Nom du client"
                                fullWidth
                                variant="outlined" name='nom'
                                value={updateClientInput.nom}
                                onChange={handleInput} />
                            <Typography variant='p' component="span">
                                {error.nom}
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    margin="none" label="Email" variant="outlined" name='email'
                                    value={updateClientInput.email}
                                    onChange={handleInput} />
                                <Typography variant='p' component="span">
                                    {error.email}
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    margin="none" label="Téléphone" variant="outlined" name='telephone'
                                    value={updateClientInput.telephone}
                                    onChange={handleInput} />
                                <Typography variant='p' component="span">
                                    {error.telephone}
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    margin="none" label="Ville" variant="outlined" name='ville'
                                    value={updateClientInput.ville}
                                    onChange={handleInput} />
                                <Typography variant='p' component="span">
                                    {error.ville}
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    margin="none" label="adresse" variant="outlined" name='adresse'
                                    value={updateClientInput.adresse}
                                    onChange={handleInput} />
                                <Typography variant='p' component="span">
                                    {error.adresse}
                                </Typography>
                            </FormControl>
                        </Grid>
                        <Grid item sm={4}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    margin="none" label="Type" variant="outlined" name='type_client_id'
                                    value={updateClientInput.type_client_id}
                                    onChange={handleInput} />
                                <Typography variant='p' component="span">
                                    {error.type_client_id}
                                </Typography>
                            </FormControl>
                        </Grid>

                        <Grid item sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                type='file'
                                fullWidth
                                className='inputfile'
                                margin="none" variant="outlined" name='logo'
                                // value={updateClientInput.logo}
                                onChange={handleImage} 
                            />
                            <Typography variant='p' component="span">
                                {error.logo}
                            </Typography>
                            </FormControl>
                            <img src={`${BASE_URL}${updateClientInput.logo}`}
                            alt="Logo de l'etreprise"
                            height={100} width={100}
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

export default EditClient