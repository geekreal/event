import { Check } from '@mui/icons-material';
import { Box, Button, Fade, FormControl, FormGroup, Grid, LinearProgress, Paper, Slide, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import BodyStyle from './BodyStyle';
import contact from '../../../assets/client/images/contact.png';
import swal from 'sweetalert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loading from 'react-loading';


const Content = () => {
    const classes = BodyStyle();
    const history = useHistory();
    const [click, setClick] = useState(false);
    const [promoteClick, setPromoteClick] = useState(false);

    const [promoteInput, setPromoteInput] = useState({
        email: "",
        nom_prenom:"",
        pays_ville: "",
        telephone: "",
        message:"",
        error_list : [],
    });

    const [subscribeInput, setSubscribeInput] = useState({
        email: "",
        meassage: "",
        error_list : [],
    });

    const handleSubscribeInputChange = (e) => {
        e.persist();
        setSubscribeInput({...subscribeInput, [e.target.name] : e.target.value});
    }

    const handlePromoteInputChange = (e) => {
        e.persist();
        setPromoteInput({...promoteInput, [e.target.name] : e.target.value});
    }

    const Subscribe = (e)=>{
        e.preventDefault();

        const data ={
            email : subscribeInput.email,// 'Authorization': localStorage.getItem('auth_token')
        }
        setClick(true);
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/user/subscriber/store`, data).then(resp => {
                if (resp.data.status === 200) {
                    // swal("Parfait", resp.data.message, "success");
                    // history.push('/admin/category-event/create');
                    setClick(false)
                    setSubscribeInput({...subscribeInput , message: resp.data.message })

                } else if (resp.data.status === 501) {

                    console.log(resp.data.message)
                    setSubscribeInput({...subscribeInput , message: "Oup houston! Veillez réessayer svp!" })
                    // setSubscribeInput({...subscribeInput , error_list: "Oup houston! Veillez réessayer svp!" })
                    setClick(false)

                }else {

                    // setSubscribeInput({...subscribeInput , error_list: resp.data.validation_errors })
                    setSubscribeInput({...subscribeInput , message: resp.data.validation_errors.email })
                    setClick(false)

                }
            });
        });
    }

    const Promote = (e)=>{
        e.preventDefault();

        const data ={
            email : promoteInput.email,
            nom_prenom : promoteInput.nom_prenom,
            telephone : promoteInput.telephone,
            pays_ville : promoteInput.pays_ville,
        }
        setPromoteClick(true);
        axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/user/promotion/store`, data).then(resp => {
                if (resp.data.status === 200) {
                    setPromoteInput({...promoteInput , message: resp.data.message })
                    setPromoteClick(false)

                } else if (resp.data.status === 501) {

                    console.log(resp.data.message)
                    setPromoteInput({...promoteInput , message: "Oup houston! Veillez réessayer svp!" })
                    setPromoteClick(false)

                }else {

                    setPromoteInput({...promoteInput , error_list: resp.data.validation_errors })
                    setPromoteClick(false)

                }
            });
        });
    }

  return (
    <> 
    <Slide in={true} direction='up' mountOnEnter unmountOnExit appear={false}> 
    <div className={classes.contentPage}> 
        <Grid container direction='row' className={classes.getTouchGrid}>
        <Grid item className={classes.touchImgGrid} component='div'>
            <img src={contact} className={classes.touchImg}/>
        </Grid>
        <Grid item className={classes.touchText} sx={{marginLeft: "30px"}} >
            <div className={classes.touchTitle}>
                Soumettez-nous votre évènements
            </div>
            <div className={classes.touchActionTitle}>
            Veillez remplir le formulaire de demande
            </div>
            <div>
                <FormGroup>
                    <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='nom_prenom' label='Votre nom et prénom' variant='outlined'
                        onChange={handlePromoteInputChange} value={promoteInput.nom_prenom}/>
                        <Typography variant='p' component="span">
                            {promoteInput.error_list.nom_prenom}
                        </Typography>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto', borderRadius: "15px",}}
                        name='telephone' label='Votre numéro de téléphone' variant='outlined'
                        onChange={handlePromoteInputChange} value={promoteInput.telephone}/>
                        <Typography variant='p' component="span">
                            {promoteInput.error_list.email}
                        </Typography>
                        <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='email' label='Votre adresse mail' variant='outlined'
                        onChange={handlePromoteInputChange} value={promoteInput.email}/>
                        <Typography variant='p' component="span">
                            {promoteInput.error_list.email}
                        </Typography>
                    </FormControl>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}}
                        name='pays_ville' label='Votre Pays et la ville' variant='outlined'
                        onChange={handlePromoteInputChange} value={promoteInput.pays_ville}/>
                        <Typography variant='p' component="span">
                            {promoteInput.error_list.pays_ville}
                        </Typography>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl>
                    {promoteClick ? (<Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' size='large'>
                            <Loading type='balls' color="white" height={40} width={40} delay={0.5}/>
                        </Button>
                        ) : (
                        <Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' 
                        size='large' onClick={Promote} >
                            <Check/> Envoyer
                        </Button>)
                    }
                    <Typography variant='p' component="span">
                        {promoteInput.message}
                    </Typography>

                    </FormControl>
                </FormGroup>
            </div>
        </Grid> 
        </Grid>

    {/* <Slide in={true} direction='left' mountOnEnter unmountOnExit> */}
        <div>
            <Grid container direction='column' className={classes.letterGrid}>
                <Box sx={{ boxShadow: 4 }} className={classes.letterBox}>
                {/* <Grow style={{ transformOrigin: '0 0 0' }}/> */}
                <Grid item xs={12}>
                    <div className={classes.letterText}>
                        <div className={classes.letterTitle}>
                            Voulez vous recevoir des offres exclusives?
                        </div>
                        <Typography className={classes.letterDesc}>
                            Souscrivez avec votre adresse mail
                        </Typography>
                    </div>
                </Grid>
                <Grid item className={classes.letterForm}>
                    <TextField className={classes.mailInput} sx={{margin: 1, minWidth: 'auto',}} name='email' label='Votre adresse mail' variant='outlined'
                    value={subscribeInput.email} onChange={handleSubscribeInputChange}/>
                    
                    {click ? (<Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' size='large'>
                            <Loading type='balls' color="white" height={40} width={40} delay={0.5}/>
                        </Button>
                        ) : (
                        <Button sx={{margin: 1,}} className={classes.mailButton} variant='contained' size='large' onClick={Subscribe} >
                            <Check/> Soucrire
                        </Button>)
                    }
                    <Typography variant='p' component="span" sx={{ color: 'inherit'}}>
                        {subscribeInput.message}
                    </Typography>
                </Grid>
                </Box>
            </Grid>
        </div>
    {/* </Slide> */}
    </div>
    
    </Slide>
    </>
  )
}

export default Content