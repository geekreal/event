import React, { useState } from 'react'
import { Box, Button,  FormControl, Grid, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import useStyle from './Style';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import axios from 'axios';
import CircularProgress from '../../../../components/loader/CircularProgress';
import { ListAltTwoTone, PersonAddAlt, Refresh } from '@mui/icons-material';


const CreateInvites = () => {
  const classes = useStyle();
  // const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [circularLoading, setCircularLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const [error, setError] = useState([]);

  const  [createEventInput, setEvent] = useState({
    nom : '',
    description : '',
  });

  const handleInput = (e) => {
    e.persist();
    setEvent({...createEventInput, [e.target.name] : e.target.value});
  }
  
  const handleImage = (e) =>{
    setPicture({photo : e.target.files[0]});
  }

  const createClientSubmit=(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo' , picture.photo)
    formData.append('nom', createEventInput.nom)
    formData.append('description' , createEventInput.description)
    formData.append('Authorization' , localStorage.getItem('auth_token'))

    setCircularLoading(true);
    axios.get('/sanctum/csrf-cookie').then(response =>{ 
      axios.post(`/api/admin/events/invites/create`, formData).then(resp => {
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
              to="/admin/events/invites/list"
              >
              Clients
          </Link>
          <Link
              underline="hover"
              color="text.primary"
              to="/admin/events/invites/create"
              aria-current="page"
          >
              Ajouter de nouveaux clients
          </Link>
          </Breadcrumbs>
        </div>
    </Paper>
    <Stack direction="row" spacing={3} className='breadPaper' background-color="#fff">
        <Link to="/admin/events/invites/list" sx={{ textDecoration: "none" }}>
            <Button color='primary' size='large' variant="contained" endIcon={<ListAltTwoTone />}>
                Retourner à la liste des clients
            </Button>
        </Link>
        <Link to="/admin/events/invites/create" sx={{ textDecoration: "none" }}>
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
                    margin="none" label="Nom de l'invité" 
                    fullWidth
                    variant="outlined" name='nom'
                    value={createEventInput.nom}
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
                        margin="none" label="description" variant="outlined" name='description'
                        value={createEventInput.description}
                        onChange={handleInput} 
                    />
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
                        // value={createEventInput.photo}
                        onChange={handleImage} 
                    />
                    <Typography variant='p' component="span">
                        {error.photo}
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

export default CreateInvites