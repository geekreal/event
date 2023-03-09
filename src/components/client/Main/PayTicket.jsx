import React from 'react'
import { Avatar, AvatarGroup, Badge, Button, Card, CardContent, CardMedia, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Skeleton, Slide, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import BodyStyle from './BodyStyle';
import { useRef } from 'react';
import affiche from '../../../assets/client/images/affiche.jpg';
import { useState } from 'react';
import { Add, DateRange, Favorite, HourglassTopSharp, Place, PlusOne, ReadMore, ShoppingBag, ShoppingCart, Watch, WatchLater, WatchRounded, WidthWideTwoTone } from '@mui/icons-material';
import swal from 'sweetalert';
import Payement from './Payement';
import { useEffect } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function PayTicket(props) {
    const classes = BodyStyle();
    const containerRef = useRef(null)
    const [activeBtn, setActiveBtn] = useState(true);
    const [typeTicket, setTypeTicket] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dateEvent, setDateEvent] = useState(dayjs());

    const [ticketInput, setTicketInput] = useState({
        ticketId : '',
        ticketType : '',
        ticketPrice : '',
        ticketNb : '',
        ticketCommand : '',
        typeId : '',
        eventNom : '',
        eventId : '',
        eventDescription : '',
        eventDate : '',
        eventLieu : '',
        eventDuree: '',
        eventHeure : '',
    });

    const handleChangeSelect = (e) => {
        let id = e.target.value;
        setTicketInput({...ticketInput, ticketType : e.target.value});
        axios.get(`api/user/event/${id}/ticket/price`).then(res=> {
            if (res.status === 200) {
                setTicketInput({...ticketInput, 
                    ticketPrice: res.data.ticket.prix, 
                    ticketNb: res.data.ticket.nb_ticket
                })
                // console.log("id :", id, res.data.ticket)
            }else{

            }
        });
        // setTypeTicket(event.target.value);
    };

    const handleInputChange =(e) =>{
        e.persist();
        let total = ticketInput.ticketPrice;
        setTicketInput({...ticketInput, ticketCommand : e.target.value});
        // ticketInput.ticketPrice = e.target.value * ticketInput.ticketPrice;
        // total = ticketInput.ticketPrice * e.target.value;
        // setTicketInput({...ticketInput, ticketPrice: e.target.value * ticketInput.ticketPrice});
    }
  
    const addTicket = () => {
        const id = props.match.params.id;
        if (ticketInput.ticketNb =="" || typeTicket === '') {
            swal("Veillez d'abord faire un choix du ticket avec la quantité !")
        }else{
            if (ticketInput.ticketNb <= 0) {
                swal("Sélectionnez aumoins un ticket")
            }
            localStorage.setItem('ticketId' , id);
            localStorage.setItem('ticketNb' , ticketInput.ticketNb);
            setActiveBtn(false)
        }
        // localStorage.setItem('ticket' , ticketInput.ticketNb);
    }

    useEffect(() => {

        if(localStorage.getItem("ticketNb") != 0){
            setActiveBtn(false);
        }  
        const id = props.match.params.id;
        axios.get(`api/user/event/${id}/tickets/get`).then(res=> {
              if (res.status === 200) {
                  setTypeTicket(res.data.tickets)
              }else{

              }
          });
        //   ticket info
          axios.get(`api/user/event/${id}/info`).then(res=> {
            if (res.status === 200) {
                setTicketInput({...ticketInput, 
                      eventNom: res.data.ticket.nom, 
                      eventDescription: res.data.ticket.description,
                      eventId: res.data.ticket.id,
                      eventDate: res.data.ticket.date,
                      eventHeure: res.data.ticket.heure,
                      eventDuree: res.data.ticket.duree,
                      eventLieu: res.data.ticket.pays+'-'+res.data.ticket.lieu,
                  })
                //   console.log("ticketInput",ticketInput)
            }else{

            }
        });
    }, []);

    const paymentClick = () =>{
        setShowDrawer(true);
    }

  return (
    <>
    <Slide in={true} direction='up' mountOnEnter unmountOnExit appear={false}>
        <div>
            <div className={classes.banner}>
                <div component='Typography' className={classes.bannerText}>
                    Le début d'une nouvelle aventure commence.
                    <div component='Typography' className={classes.bannerTextDesc}>
                    Payez votre ticket et reserver votre place dès maintenant.
                </div>
                </div>
            </div>
            <div className={classes.eventImage} sx={{ alignContent: 'center', alignItems: 'center'}}>
                <Grid container sx={{display: 'flex'}} columns={{ xs: 2, sm: 8, md: 12 }}>
                        <Card>
                            <Grid item xs={2} sm={2} md={3}>
                                <CardMedia
                                    component="img"
                                    sx={{ minWidth: 'auto', width: 500}}
                                    image={affiche}
                                    alt="Live from space album cover"
                                />
                            </Grid>
                        </Card>
                        <Grid item xs={6}>
                            <div sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h3" sx={{fontSize:'1.385rem',
                                color: 'rgb(52, 71, 103)',
                                fontWeight: 700,
                                fontSize: '1.875rem',
                                lineHeight: 1.375,}}>
                                    {ticketInput.eventNom}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" 
                                component="div" sx={{margin: 1, display: 'inline-flex'}}>
                                    <div style={{margin: 1}}>
                                        <DateRange fontSize='large' /> 
                                        { dayjs( ticketInput.eventDate ).format("DD-MM-YYYY") }
                                    </div>
                                    <div style={{margin: 1}}>
                                        <WatchRounded fontSize='large'/> {ticketInput.eventHeure}
                                        
                                    </div>
                                    <div style={{margin: 1}}>
                                        <HourglassTopSharp fontSize='large'/> {ticketInput.eventDuree}
                                    </div>
                                    <div style={{margin: 1}}>
                                        <Place fontSize='large'/> {ticketInput.eventLieu}
                                    </div>
                                </Typography>
                                <div className={classes.eventTitle} component="Typography">
                                    {ticketInput.eventDescription}
                                </div>
                                
                                <div className={classes.guestAvatar}>
                                    <Typography component="div" variant="h4" sx={{fontSize:'1.385rem',
                                color: 'rgb(52, 71, 103)',
                                fontWeight: 700,
                                fontSize: '1.875rem',
                                lineHeight: 1.375,}}>
                                        Guest
                                    </Typography>
                                    <AvatarGroup max={4} sx={{WebkitFlexDirection: "row"}}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                    </AvatarGroup>
                                </div>
                                {typeTicket !== "" ? (
                                    <Fragment>
                                        <Grid container className={classes.eventSelect} spacing={2} sx={{marginBottom: 2,}}>
                                    <Grid item xs={6} md={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Type de ticket</InputLabel>
                                            <Select labelId="demo-simple-select-label" id="demo-simple-select"
                                            sx={{
                                                borderRadius: 20,
                                                boxSizing: 'border-box',
                                                border: '0.0625rem solid rgb(210, 214, 218)',
                                                borderRadius: '0.5rem',
                                            }}
                                            value={ticketInput.typeTicket}
                                            onChange={handleChangeSelect}
                                            label="Selectonner la quantité">
                                                {typeTicket.map((item) =>
                                                    <MenuItem value={item.ticketId} key={item.ticketId}>
                                                        {item.typeLibelle}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label-number">Type de ticket</InputLabel> */}
                                            <TextField id="outlined-controlled"
                                                name='ticketNb'
                                                sx={{
                                                    borderRadius: 20,
                                                    boxSizing: 'border-box',
                                                    border: '0.0625rem solid rgb(210, 214, 218)',
                                                    borderRadius: '0.5rem',
                                                }}
                                                type='number' label="Quantité"
                                                value={ticketInput.ticketCommand}
                                                onChange={handleInputChange}>
                                            </TextField>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <Button type='contained' size='large' color='primary' sx={{
                                            backgroundColor: '#ED9A15',
                                            minWidth: '64px',
                                            width: '100%',
                                            color: 'white',
                                            ":hover" :{
                                                backgroundImage: 'linear-gradient(310deg, #00255B , #001137, #001137)',
                                            },
                                            padding: 2 }} onClick={addTicket}>
                                        Valider
                                    </Button>
                                    </Grid>
                                        </Grid>
                                        <div component='Typography' className={classes.eventPrice}>
                                            XOF {ticketInput.ticketCommand != 0 ? ticketInput.ticketPrice * ticketInput.ticketCommand: ticketInput.ticketPrice}
                                        </div>
                                        <Button type='contained' size='large' color='primary' sx={{
                                            backgroundImage: 'linear-gradient(310deg, #00255B , #001137, #001137)',
                                            alignItems: 'center',
                                            fontSize: '1.5rem',
                                            fontWeight: '700',
                                            letterSpacing: '0.02857em',
                                            minWidth: '64px',
                                            width: '100%',
                                            marginTop: 2,
                                            color: 'white',
                                            padding: 2,
                                        }}
                                        disabled={activeBtn}
                                        onClick={paymentClick}
                                        >
                                            Générer votre ticket
                                        </Button>
                                    </Fragment>
                                    
                                ) : (<div>Cet évènement n'as pas de ticket !</div> )}
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                </Box>
                            </div>
                        </Grid>
                </Grid>
            </div>
        </div>
    </Slide>
    <div className={classes.cart} >
        <Fab  aria-label="add" sx={{backgroundColor: "#ED9A15", height: 60, width: 60, fontSize: 25, color: 'white', ":hover": {
            backgroundColor: "#ED9A15"
        }}}>
            <ShoppingCart  /><Badge>{localStorage.getItem('ticketNb')}</Badge>
        </Fab>  
    </div>

    {showDrawer ? 
    (<Payement 
        eventId = {props.match.params.id}
        open={showDrawer} close={()=> setShowDrawer(false)}/>
    ):(<Skeleton/>) }

    </>
  )
}

export default PayTicket