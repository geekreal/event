import React, { useState, useEffect } from 'react'
import { Box, Button,  FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextareaAutosize, TextField, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useHistory } from 'react-router-dom';
import useStyle from './Style';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import axios from 'axios';
import CircularProgress from '../../../components/loader/CircularProgress';
import { ListAltTwoTone, PersonAddAlt, Refresh } from '@mui/icons-material';
import { DesktopDatePicker, DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Map, {  Marker} from 'react-map-gl';
import Geocoder from '@mapbox/mapbox-gl-geocoder';

import InputFieldAddress from "./Inputs";
import styled from "styled-components";

const CreateEvent = () => {

  const classes = useStyle();
  // const history = useHistory();
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [circularLoading, setCircularLoading] = useState(false);
  const [picture, setPicture] = useState([]);
  const [error, setError] = useState([]);
  

//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

  const [viewport, setViewport] = useState({
    latitude: '',
    longitude: '',
    zoom: 3.5,
  });

  const [typeEvent, setTypeEvent] = useState([]);
  const [clients, setClients] = useState([]);
  const [dateEvent, setDateEvent] = useState(dayjs());
  const [heure, setHeure] = useState(dayjs());

  const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const  [createEventInput, setEvent] = useState({
    nom : '',
    status : '',
    prix_promotion : '',
    lieu : '',
    photo_cover : '',
    payant : '',
    ticket : '',
    type_event_id : '',
    client_id : '',
    nb_personne : '',
    date_time : '',
    date : '',
    heure : '',
    ville : '',
    description : '',
    pays : '',
    duree : '',
    contact : '',
    exigence : '',
    latitude : '',
    longitude : '',
  });

  const handleInput = (e) => {
    e.persist();
    setEvent({...createEventInput, [e.target.name] : e.target.value});
  }
  
  const handleImage = (e) =>{
    setPicture({photo : e.target.files[0]});
  }


  const handlePayantChange = (event) => {
    setEvent({...createEventInput , payant: event.target.value })
   };

   const handleTicketChange = (event) => {
    setEvent({...createEventInput , ticket: event.target.value })
   };

  const handleInviteChange = (event) => {
    // setTypeEvent(event.target.value);
    // setClients(event.target.value);
    // setEvent({...createEventInput , client_id: event.target.value })
  };

  const handleTypeChange = (event) => {
    // setTypeEvent(event.target.value);
    // setClients(event.target.value);
    setEvent({...createEventInput , type_event_id: event.target.value })
  };

  const handleClientChange = (event) => {
    setEvent({...createEventInput , client_id: event.target.value })
   };
 

  useEffect(() => {
    axios.get('api/admin/type_event/list').then(res=> {
    //   console.log(res.data.categories);
        if (res.status === 200) {
            setTypeEvent(res.data.categories)
        }
        setLoading(false);
    });

    axios.get('api/admin/clients/list').then(res=> {
        // console.log(res.data.clients);
          if (res.status === 200) {
              setClients(res.data.clients)
          }
          setLoading(false);
      });

      navigator.geolocation.getCurrentPosition(pos => {
          setViewport({
            ...viewport,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            zoom: 3.5,
          });
        });
    }, [])

  console.log("vieport" , viewport);
  
  const createEventSubmit=(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo' , picture.photo)
    formData.append('nom', createEventInput.nom)
    formData.append('ticket', createEventInput.ticket)
    formData.append('payant', createEventInput.payant)
    formData.append('client_id', createEventInput.client_id)
    formData.append('type_event_id', createEventInput.type_event_id)
    formData.append('lieu', createEventInput.lieu)
    formData.append('pays', createEventInput.pays)
    formData.append('ville', createEventInput.ville)
    formData.append('nb_personne', createEventInput.nb_personne)
    formData.append('exigence', createEventInput.exigence)
    formData.append('description', createEventInput.description)
    formData.append('contact', createEventInput.contact)
    formData.append('heure', dayjs(heure).format("HH:mm"))
    formData.append('date', dateEvent)
    formData.append('date_heure', dateEvent)
    formData.append('longitude', createEventInput.longitude)
    formData.append('latitude', createEventInput.latitude)
    formData.append('description' , createEventInput.description)
    formData.append('Authorization' , localStorage.getItem('auth_token'))

    setCircularLoading(true);
    axios.get('/sanctum/csrf-cookie').then(response =>{ 
      axios.post(`/api/admin/events/create`, formData).then(resp => {
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
                to="/admin/events/list"
                >
                Evènements
            </Link>
            <Link
                underline="hover"
                color="text.primary"
                to="/admin/events/create"
                aria-current="page"
            >
                Création d' evènements
            </Link>
            </Breadcrumbs>
            </div>
        </Paper>
        <Stack direction="row" spacing={3} className='breadPaper' background-color="#fff">
            <Link to="/admin/events/list" sx={{ textDecoration: "none" }}>
                <Button color='primary' size='large' variant="contained" endIcon={<ListAltTwoTone />}>
                    Retourner à la liste des evènements
                </Button>
            </Link>
            <Link to="/admin/events/create" sx={{ textDecoration: "none" }}>
                <Button color='success' size='large' variant="contained">
                    <Refresh />
                </Button>
            </Link>
        </Stack>

        <Paper elevation={2} className="breadPaper">
            <Box item xs={3} sm={2} className={classes.formTitle}>
                <Typography variant="h5" component="strong">
                    Création d'évènement
                </Typography>
            </Box>
            <form  onSubmit={createEventSubmit} >
                <Grid container spacing={2}>
                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Nom de l'évènement" 
                            fullWidth
                            variant="outlined" name='nom'
                            value={createEventInput.nom}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.nom}
                        </Typography>
                    </Grid>

                    <Grid item sm={4}>
                        <FormControl fullWidth>
                        <InputLabel id="type-simple-select-label">Type d'évènement</InputLabel>
                            <Select
                            labelId="type-simple-select-label"
                            id="type-simple-select"
                            name='type_event_id'
                            value={createEventInput.type_event_id}
                            label="type d'évènement"
                            onChange={handleTypeChange} >
                                {typeEvent.map((item) => <MenuItem value={item.id} key={item.id}>{item.libelle}</MenuItem>)}
                            </Select>
                            <Typography variant='p' component="span">
                                {error.type_event_id}
                            </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item sm={4}>
                        <FormControl fullWidth>
                            <InputLabel id="client-simple-select-label">Organisateur (Client)</InputLabel>
                            <Select
                            labelId="client-simple-select-label"
                            id="client-simple-select"
                            value={createEventInput.client_id}
                            label="Organisateur"
                            name='client_id'
                            onChange={handleClientChange} >
                                {clients.map((item) =><MenuItem value={item.id} key={item.id}>{item.nom}</MenuItem>)}
                            </Select>
                            <Typography variant='p' component="span">
                                {error.client_id}
                            </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item sm={4}>
                        <FormControl fullWidth>
                        <InputLabel id="type-simple-select-label">Payant ?</InputLabel>
                            <Select
                            labelId="type-simple-select-label"
                            id="type-simple-select"
                            value={createEventInput.payant}
                            label="type d'évènement"
                            name='payant'
                            onChange={handlePayantChange}>
                                <MenuItem value="Oui" key="Oui">Oui</MenuItem>
                                <MenuItem value="Non" key="Non">Non</MenuItem>
                            </Select>
                            <Typography variant='p' component="span">
                                {error.payant}
                            </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item sm={4}>
                        <FormControl fullWidth>
                        <InputLabel id="type-simple-select-label">Ticket disponible ?</InputLabel>
                            <Select
                            labelId="type-simple-select-label"
                            id="type-simple-select"
                            name='ticket'
                            value={createEventInput.ticket}
                            label="type d'évènement"
                            onChange={handleTicketChange}>
                                <MenuItem value="Oui" key="Oui">Oui</MenuItem>
                                <MenuItem value="Non" key="Non">Non</MenuItem>
                            </Select>
                            <Typography variant='p' component="span">
                                {error.ticket}
                            </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Lieu d'evenement" 
                            fullWidth
                            variant="outlined" name='lieu'
                            value={createEventInput.lieu}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.lieu}
                        </Typography>
                    </Grid>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item sm={4} >
                        <DesktopDatePicker
                        label="For desktop"
                        value={dateEvent}
                        minDate={dayjs('2017-01-01')}
                        name="date"
                        onChange={(newValue) => {
                            setDateEvent(dayjs(newValue).format("YYYY-MM-DD"));
                        }}
                        renderInput={(params) => <TextField {...params} />} />
                    </Grid>

                    <Grid item sm={4} >
                        <DesktopTimePicker
                        label="For desktop"
                        value={heure}
                        name="heure"
                        onChange={(newValue) => {
                            setHeure(dayjs(newValue));
                            // setEvent({...createEventInput , heure: newValue })
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    </LocalizationProvider>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Pays" 
                            fullWidth
                            variant="outlined" name='pays'
                            value={createEventInput.pays}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.pays}
                        </Typography>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Ville" 
                            fullWidth
                            variant="outlined" name='ville'
                            value={createEventInput.ville}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.pays}
                        </Typography>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Contacts" 
                            fullWidth
                            variant="outlined" name='contact'
                            value={createEventInput.contact}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.contact}
                        </Typography>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Nombre de personne" 
                            fullWidth
                            type="number"
                            variant="outlined" name='nb_personne'
                            value={createEventInput.nb_personne}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.nb_personne}
                        </Typography>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Exigence" 
                            fullWidth
                            type="text"
                            variant="outlined" name='exigence'
                            value={createEventInput.exigence}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.exigence}
                        </Typography>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Latitude" 
                            fullWidth
                            type="text"
                            variant="outlined" name='latitude'
                            value={createEventInput.latitude}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.latitude}
                        </Typography>
                    </Grid>

                    <Grid item sm={4} >
                        <TextField
                            margin="none" label="Longitude" 
                            fullWidth
                            type="text"
                            variant="outlined" name='longitude'
                            value={createEventInput.longitude}
                            onChange={handleInput} 
                        />
                        <Typography variant='p' component="span">
                            {error.longitude}
                        </Typography>
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

                    <Grid item sm={4} >
                        <FormControl fullWidth>
                        <TextareaAutosize
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Description de l'évènement"
                            value={createEventInput.description}
                            style={{ width: 400 }}
                            onChange={handleInput} 
                            name="description"
                        />
                        <Typography variant='p' component="span">
                            {error.description}
                        </Typography>
                        </FormControl>
                    </Grid>

                    <Grid item sm={4}>
                        <Wrapper>
                            {/* <ContentWrapper> */}
                                <InputFieldAddress/>
                                
                            {/* </ContentWrapper> */}
                        </Wrapper>
                    </Grid>

                <Grid item sm={12} >
                    {viewport.latitude && viewport.longitude && (
                        <Map
                            initialViewState={viewport}
                            style={{width: 800, height: 500}}
                            mapboxAccessToken={mapBoxToken}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                        >
                        <Marker
                            longitude={viewport.longitude}
                            latitude={viewport.latitude}
                        />
                        </Map>
                    )}
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

export default CreateEvent


const Wrapper = styled.div`
  background: none;
  height: auto;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  padding: 150px 0;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #ffffff;
  text-align: center;
`;
