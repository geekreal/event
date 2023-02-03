
import React, { useState } from 'react'
import { Button, Container, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import useStyle from './Style';
import { TextFields } from '@mui/icons-material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import axios from 'axios';


const CreateEventCategory = () => {
  const classes = useStyle();
  const history = useHistory();
  // function handleClick(event) {
  //   event.preventDefault();
  //   console.info('You clicked a breadcrumb.');
  // }

  const  [createEventCategoryInput, setEventCategory] = useState({
    libelle : '',
    error_list : [],
  });

  const handleInput = (e) => {
    e.persist();
    setEventCategory({...createEventCategoryInput, [e.target.name] : e.target.value});
  }

  const createEventCategorySubmit=(e) => {
    e.preventDefault();
    const data ={
      libelle : createEventCategoryInput.libelle,
      'Authorization': localStorage.getItem('auth_token')
    }

    axios.get('/sanctum/csrf-cookie').then(response =>{ 
      axios.post(`/api/admin/type_event/create`, data).then(resp => {
          if (resp.data.status === 200) {
              // localStorage.setItem('auth_token' , resp.data.auth_token)
              // localStorage.setItem('auth_name' , resp.data.auth_name)
              localStorage.setItem('libelle' , resp.data.libelle)
              localStorage.setItem('type_event_id' , resp.data.type_event_id)
              swal("Parfait", resp.data.message, "success");
              history.push('/admin/category-event/create');
          } else {
              setEventCategory({...createEventCategoryInput , error_list: resp.data.validation_errors })
          }
      });
  });
  }
  
  return (
  <div className={classes.contentMain}>
    <div role="presentation" className={classes.breadcrumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/admin">
          Accueil
        </Link>
        <Link underline="hover" color="inherit" to="/admin/events/list"
        >
          Evènements
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/components/breadcrumbs/"
          aria-current="page"
        >
          Catégorie-évenement
        </Link>
      </Breadcrumbs>
    </div>
  <Paper elevation={2} className={classes.paper}>
  <form  onSubmit={createEventCategorySubmit} >
      <Grid container
        direction="column"
      >
        <Grid item xs={3} sm={2} className={classes.formTitle}>
          <Typography variant="h5" component="strong">
            Ajouter une categorie d'évenement</Typography>
        </Grid>

        <Grid item xs={6} sm={6} className={classes.formContent}>
            <div className={classes.formInput}>

              <TextField
                margin='normal' label="Libellé" variant="outlined" name='libelle'
                value={createEventCategoryInput.libelle}
                onChange={handleInput} 
              />
              <Typography variant='p' component="span">
                  {createEventCategoryInput.error_list.libelle}
              </Typography>

            </div>
        </Grid>

        <Grid item xs={3} sm={2}className={classes.formButton}>
          <Stack direction="row" spacing={2}>
            <Button type='submit' size="medium" className={classes.submitButton} color="success" variant="contained">
              Valider
            </Button>
            <Button size="medium" color="error" variant="outlined">
              Annuler
            </Button>
          </Stack>
        </Grid>

      </Grid>
      </form>
  </Paper></div>

  )
}

export default CreateEventCategory