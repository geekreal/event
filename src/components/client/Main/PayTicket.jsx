import React from 'react'
import { Avatar, AvatarGroup, Badge, Button, Card, CardContent, CardMedia, Fab, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Skeleton, Slide, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import BodyStyle from './BodyStyle';
import { useRef } from 'react';
import affiche from '../../../assets/client/images/affiche.jpg';
import { useState } from 'react';
import { Add, Favorite, PlusOne, ReadMore, ShoppingBag, ShoppingCart, WidthWideTwoTone } from '@mui/icons-material';
import swal from 'sweetalert';
import Payement from './Payement';

function PayTicket(props) {
    const classes = BodyStyle();
    const containerRef = useRef(null)
    const [activeBtn, setActiveBtn] = useState(true);
    const [typeTicket, setTypeTicket] = useState('');
    const [showDrawer, setShowDrawer] = useState(false);

    const [ticketInput, setTicketInput] = useState({
        ticketId : '',
        ticketType : '',
        ticketPrice : '',
        ticketNb : '',
    });

    const handleChangeSelect = (event) => {
        setTypeTicket(event.target.value);
    };

    const handleInputChange =(e) =>{
        e.persist();
        setTicketInput({...ticketInput, [e.target.name] : e.target.value});
    }
  
    const addTicket = () => {
        const id = props.match.params.id;
        if (ticketInput.ticketNb =="" || typeTicket === '') {
            swal("Veillez d'abord faire un choix du ticket avec la quantité !")
        }else{
            localStorage.setItem('ticketId' , id);
            localStorage.setItem('ticketNb' , ticketInput.ticketNb);
            setActiveBtn(false)
        }
        // localStorage.setItem('ticket' , ticketInput.ticketNb);
    }

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
                                    Titre de lévènement
                                </Typography>
                                <div className={classes.eventTitle} component="Typography">
                                    Mac Miller
                                    Petite description de l'évènement
                                    This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like.
                                </div>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Petite description de l'évènement
                                    This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like.
                                </Typography>
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
                                            value={typeTicket}
                                            onChange={handleChangeSelect}
                                                label="Selectonner la quantité">
                                                <MenuItem value={10}>Vip</MenuItem>
                                                <MenuItem value={20}>Gold</MenuItem>
                                                <MenuItem value={30}>Basique</MenuItem>
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
                                                value={ticketInput.ticketNb}
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
                                    XOF 10 500 F
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
        open={showDrawer} close={()=> setShowDrawer(false)}/>
    ):(<Skeleton/>) }

    </>
  )
}

export default PayTicket