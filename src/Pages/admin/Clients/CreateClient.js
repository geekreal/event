import React, { useState } from 'react'
import { Box, Button,  FormControl, Grid, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import useStyle from './Style';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import axios from 'axios';
import CircularProgress from '../../../components/loader/CircularProgress';
import { ListAltTwoTone, PersonAddAlt, Refresh } from '@mui/icons-material';


const CreateClient = () => {
  const classes = useStyle();
  // const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [circularLoading, setCircularLoading] = useState(false);
  const [typeClient, setTypeClient] = useState('');
  const [picture, setPicture] = useState([]);
  const [error, setError] = useState([]);

  // function handleClick(event) {
  //   event.preventDefault();
  //   console.info('You clicked a breadcrumb.');
  // }

  const  [createClientInput, setClient] = useState({
    nom : '',
    adresse : '',
    ville : '',
    telephone : '',
    email : '',
    type_client_id : '',
  });

  const handleInput = (e) => {
    e.persist();
    setClient({...createClientInput, [e.target.name] : e.target.value});
  }


  const handleChange = (event) => {
    // event.persist();
    setTypeClient(event.target.value);
    setClient({...createClientInput , type_client_id: event.target.value })
  };

  
  const handleImage = (e) =>{
    setPicture({logo : e.target.files[0]});
    console.log(e.target.files[0])
  }

  const createClientSubmit=(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('logo' , picture.logo)
    formData.append('nom', createClientInput.nom)
    formData.append('adresse' , createClientInput.adresse)
    formData.append('ville', createClientInput.ville)
    formData.append('telephone' , createClientInput.telephone)
    formData.append('email' ,createClientInput.email)
    formData.append('type_client_id',  createClientInput.type_client_id)
    formData.append('Authorization' , localStorage.getItem('auth_token'))

    setCircularLoading(true);
    axios.get('/sanctum/csrf-cookie').then(response =>{ 
      axios.post(`/api/admin/clients/create`, formData).then(resp => {
          if (resp.data.status === 200) {
              // localStorage.setItem('auth_token' , resp.data.auth_token)
              // localStorage.setItem('auth_name' , resp.data.auth_name)
              swal("Parfait", resp.data.message, "success");
              setCircularLoading(false)
              setError([]);
          }
          else if(resp.data.status === 400) {
              setError(resp.data.validation_errors)
              setCircularLoading(false);
          }else{
            swal("Erreur", resp.data.message, "error");
            setCircularLoading(false)
          }
      });
    });

  }

 

  return (
  <div className="content">
    <Paper className='breadPaper' elevation={1} background-color="#fff">
        <div role="presentation" className={classes.breadcrumbs} >
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
        <Link to="/admin/clients/list" sx={{ textDecoration: "none" }}>
            <Button color='primary' size='large' variant="contained" endIcon={<ListAltTwoTone />}>
                Retourner à la liste des clients
            </Button>
        </Link>
        <Link to="/admin/clients/create" sx={{ textDecoration: "none" }}>
            <Button color='success' size='large' variant="contained">
                <Refresh />
            </Button>
        </Link>
    </Stack>

      <Paper elevation={2} className="breadPaper">
          <Box item xs={3} sm={2} className={classes.formTitle}>
              <Typography variant="h5" component="strong">
                Ajout d'un client
              </Typography>
          </Box>
          <form  onSubmit={createClientSubmit} >
          <Grid container spacing={2}>
            <Grid item sm={4} >
              <TextField
                margin="none" label="Nom du client" 
                fullWidth
                variant="outlined" name='nom'
                value={createClientInput.nom}
                onChange={handleInput} 
              />
              <Typography variant='p' component="span">
                  {error.nom}
              </Typography>
            </Grid>
            <Grid item sm={4} >
                <FormControl fullWidth>
                  <TextField
                    fullWidth 
                    margin="none" label="Email" variant="outlined" name='email'
                    value={createClientInput.email}
                    onChange={handleInput} 
                  />
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
                    value={createClientInput.telepone}
                    onChange={handleInput} 
                  />
                  <Typography variant='p' component="span">
                      {error.telephone}
                  </Typography>
                </FormControl>
            </Grid>
            <Grid item sm={4}>
                <FormControl fullWidth >
                  <TextField
                    fullWidth
                    margin="none" label="Ville" variant="outlined" name='ville'
                    value={createClientInput.ville}
                    onChange={handleInput} 
                  />
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
                    value={createClientInput.adresse}
                    onChange={handleInput} 
                  />
                  <Typography variant='p' component="span">
                      {error.adresse}
                  </Typography>
                </FormControl>
            </Grid>
            <Grid item sm={4}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeClient}
                  label="Type de client"
                  onChange={handleChange}
                >
                  <MenuItem value="Particulier">Particulier</MenuItem>
                  <MenuItem value="Entreprise">Entreprise</MenuItem>
                </Select>
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
                    // value={createClientInput.logo}
                    onChange={handleImage} 
                  />
                  <Typography variant='p' component="span">
                      {error.logo}
                  </Typography>
                </FormControl>
            </Grid>
            
          </Grid>
          <Stack direction="row" spacing={2} sx={{margin : 5}}>
            <Button type='submit' size="large" className={classes.submitButton} color="success" variant="contained">
              Valider
            </Button> {circularLoading ? <CircularProgress/> : ""}
            <Button size="large" color="error" variant="outlined">
              Annuler
            </Button>
          </Stack>
          </form>
      </Paper>
    </div>
  )
}

export default CreateClient