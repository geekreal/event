import React from 'react'
import { AvatarGroup, Card, CardContent, Fab, FormControl, Grid, Skeleton, Slide, Stack, Typography } from '@mui/material'
import BodyStyle from './BodyStyle';
import { alpha, Box } from '@mui/system';

const PayticketSkeleton = () => {
    const classes = BodyStyle();

  return (
    <div><Slide in={true} direction='up' mountOnEnter unmountOnExit appear={false}>
    <div>
        <div className={classes.banner}>
            <div component='Typography' className={classes.bannerText}>
                <Skeleton animation="wave" height={50} width="80%" sx={{background: alpha("#ffff" , 0.1)}}/>
                {/* <Skeleton variant='rectangular' width={60}/> */}
                <div component='Typography' className={classes.bannerTextDesc}>
                    <Typography variant="subtitle1" color="text.secondary" sx={{margin: 0.5, fontSize: 18}}>
                        {/* <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} sx={{background: alpha("#ffff" , 0.1)}}/> */}
                        <Skeleton animation="wave" height={10} width="40%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                        <Skeleton animation="wave" height={10} width="40%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                        <Skeleton animation="wave" height={10} width="40%" sx={{background: alpha("#ffff" , 0.1)}}/> 
                        {/* Status :<Chip label="Déjà passé" color="error" /> */}
                        {/* <Skeleton variant='text' width={200}/> */}
                    </Typography>
                </div>
            </div>
        </div>
        <div className={classes.eventImage} sx={{ alignContent: 'center', alignItems: 'center'}}>
            <Grid container sx={{display: 'flex'}} columns={{ xs: 2, sm: 8, md: 12 }}>
                    <Card>
                        <Grid item xs={2} sm={2} md={3}>
                            <Skeleton animation="pulse"  variant='rectangular' sx={{ minWidth: 'auto', width: 400, height: 400}}></Skeleton>
                            {/* <CardMedia
                                component="img"
                                sx={{ minWidth: 'auto', width: 500}}
                                image={affiche}
                                alt="Live from space album cover"
                            /> */}
                        </Grid>
                    </Card>
                    <Grid item xs={6}>
                        <div sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h3" sx={{fontSize:'1.385rem',
                            color: 'rgb(52, 71, 103)',
                            fontWeight: 700,
                            // fontSize: '1.875rem',
                            lineHeight: 1.375,}}>
                                <Skeleton variant='text' height={20} width="100%"/>
                                <Skeleton variant='text' height={20} width="80%"/>
                                {/* {ticketInput.eventNom} */}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" 
                            component="div" sx={{margin: 1, display: 'inline-flex'}}>
                                <div style={{margin: 1}}>
                                    {/* <Skeleton variant='rounded' width={20}/> */}
                                    <Skeleton variant='text' height={50} width={100}/>
                                    {/* { dayjs( ticketInput.eventDate ).format("DD-MM-YYYY") } */}
                                </div>
                                <div style={{margin: 1}}>
                                    {/* <Skeleton variant='rounded' width={20}/> */}
                                    <Skeleton variant='text' height={50} width={100}/>
                                    {/* <WatchRounded fontSize='small'/> {ticketInput.eventHeure} */}
                                    
                                </div>
                                <div style={{margin: 1}}>
                                    {/* <Skeleton variant='rounded' width={20}/> */}
                                    <Skeleton variant='text' height={50} width={100}/>
                                    {/* <HourglassTopSharp fontSize='small'/> {ticketInput.eventDuree} */}
                                </div>
                                <div style={{margin: 1}}>
                                    {/* <Skeleton variant='rounded' width={20}/> */}
                                    <Skeleton variant='text' height={50} width={100}/>
                                    {/* <Place fontSize='small'/> {ticketInput.eventLieu} */}
                                </div>
                            </Typography>
                            <div className={classes.eventTitle} component="Typography">
                                <Skeleton animation="wave" height={10} width="100%" /> 
                                <Skeleton animation="wave" height={10} width="100%" /> 
                                <Skeleton animation="wave" height={10} width="80%" /> 
                                <Skeleton animation="wave" height={10} width="60%" /> 
                                <Skeleton animation="wave" height={10} width="100%" /> 
                                {/* {ticketInput.eventDescription} */}
                            </div>
                            
                            <div className={classes.guestAvatar}>
                                <Typography component="div" variant="h4" sx={{fontSize:'1.385rem',
                            color: 'rgb(52, 71, 103)',
                            fontWeight: 700,
                            // fontSize: '1.875rem',
                            lineHeight: 1.375,}}>
                                    <Skeleton variant='text' height={40} width="25%"/>
                                </Typography>
                                <Stack direction="row" spacing={0}>
                                    <Skeleton variant='circular' height={40} width={40}/>
                                    <Skeleton variant='circular' height={40} width={40}/>
                                    <Skeleton variant='circular' height={40} width={40}/>
                                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
                                </Stack>
                            </div>
                                <Grid container className={classes.eventSelect} spacing={2} sx={{marginBottom: 2,}}>
                                <Grid item xs={6} md={4}>
                                    <FormControl fullWidth>
                                        <Skeleton variant='text' height={10} width={80}/>
                                        <Skeleton variant='rounded' height={30} width="100%"/>
                                        {/* <InputLabel id="demo-simple-select-label">Type de ticket</InputLabel> */}
                                        
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Skeleton variant='text' height={10} width={80}/>
                                    <Skeleton variant='rounded' height={30} width="100%"/>
                                    {/* <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label-number">Type de ticket</InputLabel>
                                        <TextField id="outlined-controlled"
                                            name='ticketNb'
                                            sx={{
                                                // borderRadius: 20,
                                                boxSizing: 'border-box',
                                                border: '0.0625rem solid rgb(210, 214, 218)',
                                                borderRadius: '0.5rem',
                                            }}
                                            type='number' label="Quantité"
                                            value={ticketInput.ticketCommand}
                                            onChange={handleInputChange}>
                                        </TextField>
                                    </FormControl> */}
                                </Grid>
                                <Grid item xs={6} md={4} sx={{display: 'flex', alignItems: 'center'}}>
                                    <Skeleton variant='rounded'height={40} width="100%"/>
                                </Grid>
                                </Grid>
                                <div component='Typography' className={classes.eventPrice}>
                                    <Stack direction="row" spacing={2}>
                                        <Skeleton animation="wave" height={10} width="10%" /> 
                                        <Skeleton animation="wave" height={10} width="15%" /> 
                                    </Stack>
                                </div>
                                    <Skeleton variant='rounded' height={60} width="100%" sx={{marginTop: 3}}/>
                                {/* <Button type='contained' size='large' color='primary' sx={{
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
                                </Button> */}
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
            <Skeleton variant='circular' height={40} width={40}/>
        </Fab>  
    </div>
    </div>
  )
}

export default PayticketSkeleton