import { Refresh } from '@mui/icons-material';
import { Breadcrumbs, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useStyle from './Style';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';


import { ListAltTwoTone, PersonAddAlt } from '@mui/icons-material';
const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;

const AddGuest = (props) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const classes = useStyle();
    const theme = useTheme();
    const[guestList , setGuestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState("");
    const [circularLoading, setCircularLoading] = useState(false);
    const [personName, setPersonName] = useState([]);
    const [guestInput, setGuestInput] = useState({
        'id': "",
        'photo': '',
        'nom' : '',
    });

    useEffect(() => {
        axios.get('api/admin/events/invites/list').then( res=> {
        //   console.log(res.data.categories);
            if (res.status === 200) {
                setGuestList(res.data.invites)
                console.log(" data",res.data.invites)
            }
            setLoading(false);
        })
    }, []);

    const handleGuestChange = (e) => {
        setGuestInput({...guestInput, id : e.target.value});
        console.log(e);

        const id = e.target.value;

        const {target: { value },} = e;
        setPersonName(typeof value === 'string' ? value.split(',') : value);
        console.log(personName);

        // axios.get(`api/admin/events/invites/${id}/infos`).then( res=> {
        //     //   console.log(res.data.categories);
        //         if (res.status === 200) {
        //             setPicture(res.data.invites.photo);
        //         }
        //         setLoading(false);
        //     })
    }

    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

      const addGuestSubmit=(e) => {
            e.preventDefault();
            const data ={
            nom : personName,
            event_id : 1,
            'Authorization': localStorage.getItem('auth_token')
            }

        const id = props.match.params.id;
        
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/admin/event/${id}/guest/add`, data).then(resp => {
                if (resp.data.status === 200) {
                    swal("Parfait", resp.data.message, "success");
                    // history.push('/admin/category-event/create');
                } else {
                    console.log("error");
                    // setEventCategory({...createEventCategoryInput , error_list: resp.data.validation_errors })
                }
            });
        });
      }

    const handleInput = () =>{

    };

    return (
    <div className='content'>
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
              Liste des évènements
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
          <form  onSubmit={addGuestSubmit} >
            <Grid container spacing={2}>
                <Grid item sm={4} >
                    <TextField
                        margin="none" label="Nom de l'évènement" 
                        fullWidth
                        variant="outlined" name='nom'
                        onChange={handleInput} 
                    />
                </Grid>

                <Grid item sm={4}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-multiple-chip-label">Liste des invités</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            name='client_id'
                            value={personName}
                            label="Invités"
                            onChange={handleGuestChange} 
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {guestList.map((item) => 
                                <MenuItem 
                                value={item.nom} 
                                key={item.id}
                                style={getStyles(item.nom, personName, theme)}>
                                    {item.nom}
                                </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                    <img src={`${BASE_URL}${picture}`}
                        alt="Guest picture"
                        height={100} width={100}
                        loading="lazy" />
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
    </div>)
}

export default AddGuest