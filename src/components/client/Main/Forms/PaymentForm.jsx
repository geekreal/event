import React, { useEffect, useRef } from 'react';
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, LinearProgress, linearProgressClasses, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import Style from './Style';
import Tmoney from '../../../../assets/client/images/tmoney.png';
import orange from '../../../../assets/client/images/orange.png';
import visa from '../../../../assets/client/images/visav.png';
import flooz from '../../../../assets/client/images/flooz.png';
import ReactInputMask from 'react-input-mask';
import { useState } from 'react';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import Pusher from 'pusher-js';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : '',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

export default function PaymentForm(props) {
  const classes = Style();
  const eventId = props.eventId;
  const history = useHistory();
  const [paymentStatus, setPaymentStatus] = useState("0");
  const [disablePayBtn, setDisablePayBtn] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("Valider-");

  const [tickets, setTickets] = useState({
    id: '',
    typeTicket: '',
  });

  const [payement, setPayement] = useState({
    visa:'',
    network: '',
    amount: '',
    phone_number: '',
    identifier: '',
    description:'',
    codeReservation: '',
    ticketId: '',
    eventId: '',
    nbTicket: '',
    code: '',
  });


  const pusher = new Pusher('7f414dc36d7726d3b013', {
    cluster: 'mt1',
    encrypted: true,
  });

      pusher.connection.bind("error", function (err) {
        if (err.error) {
          // console.log(">>> detected limit error", err.error.data.message);
          pusher.disconnect();
        }
      });

      const channel = pusher.subscribe('paygate-channel');

      channel.bind('paygate-event', function(data) {
        // setPaymentStatus(data.status)
        // console.log(data.status);
        setPaymentStatus("0");
        setDisablePayBtn(true)
        setPaymentMessage("Confirmation reçue! Merci")
        pusher.disconnect();
      });

      

  const [expanded, setExpanded] = React.useState('');

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const handleInputChange =(e) =>{
    e.persist();
    setPayement({...payement, [e.target.name] : e.target.value});
  }

  const NetworkChange = (param) =>{
    setPayement({...payement, network:param});
    setPayement({...payement, phone_number:''});
    console.log(param);
    localStorage.setItem("network", param);
    setPaymentStatus("0");
    setDisablePayBtn(false)
  }

  const PaygatePay = (e) =>{
    e.preventDefault();
    setPaymentStatus("pending");
    setPaymentMessage("En cours");
    setDisablePayBtn(true);
    var  number = localStorage.getItem("number");
    var  total_reservation = localStorage.getItem("total_reservation");
    var  moyen_paiement = localStorage.getItem("network");
    var  nom_ticket = localStorage.getItem("nom_ticket");
    var  description = localStorage.getItem("nom_ticket");
    var  user_id = localStorage.getItem("user_id");
    var  ticket_id= localStorage.getItem("ticket_id");
    var  event_id= localStorage.getItem("event_id");
    var  nb_ticket_payer = localStorage.getItem("nb_ticket_payer");
    var  date_reservation = dayjs(new Date()).format("YYYY-MM-DD") ;

    let num = Math.floor(Math.random() * (202325 - 2087090 + 1)) + 2009;
    let code1 = "1I"+nom_ticket;
    let code2 = "2VE"+ticket_id;
    let code3 = "3NOS"+num;
    let codeR = code1+"-"+code2+"-"+code3
    localStorage.setItem("code_reservation", codeR);
    var nom_ticket = localStorage.getItem("nom_ticket");


    var  code_reservation = localStorage.getItem("code_reservation");

    const data ={
      phone_number: payement.phone_number,
      identifier: code_reservation,
      amount: 1,
      description: description,
      user_id: 1,
      network: moyen_paiement,
      codeReservation: code_reservation,
      ticketId:ticket_id,
      eventId: event_id,
      nbTicket: nb_ticket_payer,
      date_reservation:date_reservation,
      nom_ticket:nom_ticket
    }

    axios.get('/sanctum/csrf-cookie').then(response =>{ 
      axios.post(`/api/user/ticket/paygate/pay`, data).then(resp => {
          if (resp.data.status === 0) {
            // localStorage.setItem('libelle' , resp.data.libelle)
            setPaymentStatus("save");
            setPaymentMessage("Confirmation En attente")
            // swal("Parfait", resp.data.status+""+resp.data.message, "success");
          } else {

            setPaymentStatus("0");
            setDisablePayBtn(false)
            
            swal("Erreur", resp.data.status+""+resp.data.message, "info");
          }
      }) .catch(error => {
        // handle error
        console.log(error.message);
      });
    });
  }

  const [countdown, setCountdown] = useState();

  // demande de confirmation
  useEffect(() => {
    if (paymentStatus === "save") {
      let count = 50;
      setCountdown(count);

      const timer = setInterval(() => {
        count--;
        setCountdown(count);
        setPaymentMessage("Vérification !")
        // setPaymentMessage(countdown+" "+"Confirmation En attente")
        if (count === 0 && paymentStatus === "save") {

          let data = {
            code_reservation: localStorage.getItem("code_reservation"),
            number: payement.phone_number,
          }

          axios.get('/sanctum/csrf-cookie').then(response =>{ 
            axios.post(`/api/paygate/confirmation/check`, data).then(resp => {
              setPaymentStatus("pending");
              //  console.log(resp.data);
                if (resp.data.status === 200) {
                  setPaymentStatus("0");
                  setDisablePayBtn(true)
                  setPaymentMessage(resp.data.message)
                  // swal("Parfait", resp.data.status+""+resp.data.message, "success");
                } else {
                  swal("ERROR", resp.data.status+""+resp.data.message, "error");
                  setPaymentStatus("non");
                  setDisablePayBtn(false)
                  setPaymentMessage(resp.data.message)
                  setCountdown("");
                }
            }) .catch(error => {
              // handle error
              console.log(error.message);
            });
          });
        
          clearInterval(timer);
          setPaymentStatus("0");
          setDisablePayBtn(false);
          setPaymentMessage("Non confirmer");
        }
      }, 1000);
      return () => clearInterval(timer);
    }

  }, [paymentStatus]);

  return (
    <>
    <div >
    Sélectionnez un moyen de paiement
    <div className={classes.formContainer}>
      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel1'} 
      onChange={handleAccordionChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <div className={classes.paymentImd} onClick={() => NetworkChange("TMONEY")}>
              <FormControlLabel className={classes.radioBtn} value="Tmoney" control={<Radio />}/> Tomney
              <img src={Tmoney} alt="" height={50} className={classes.radioImg}/>
            </div>
          </AccordionSummary>
          <AccordionDetails>
          <div className={classes.floozInput}>
            {paymentStatus === "save" || paymentStatus === "paid" ? (<Fragment>
              {/* <Box sx={{ width: '100%', marginBottom: 2}}> */}
                <BorderLinearProgress variant="buffer" 
                sx={{ width: '100%',  marginBottom: 2}}
                value={paymentStatus === "save" ? 50 : paymentStatus === "paid" ? 100 : paymentStatus === "0" ? 0: 0} 
                valueBuffer={paymentStatus === "save" ? 50 : paymentStatus === "paid" ? 100: paymentStatus === "0" ? 0: 0} 
                />
              {/* </Box> */}
            </Fragment>) : ""}
            <FormControl>
              <FormGroup id='flooz' className={classes.number}>
                <TextField variant='outlined' size='large' 
                value={payement.phone_number} 
                onChange={handleInputChange} name='phone_number' type='text' label="Numéro T-money TOGO"/>
              </FormGroup>
              <FormGroup>
            <Button disabled={disablePayBtn} size='large' variant='contained' onClick={PaygatePay}>
            {paymentStatus === "pending" || paymentStatus === "save" ? (<Fragment>
              <CircularProgress color="inherit" sx={{marginRight: 2}}/>
              </Fragment>) : ""}
             {countdown > 0 ? countdown : ""} {paymentMessage}
          </Button>
          </FormGroup>
            </FormControl>
          </div>
          </AccordionDetails>
      </Accordion>

      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div className={classes.paymentImd} onClick={() => NetworkChange("FLOOZ")}>
            <FormControlLabel value="flooz" control={<Radio />} sx={{marginRight: 0}}/> Moov money togo
            <img src={flooz} alt="" height={50} className={classes.radioImg}/>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.floozInput}>
        <FormControl>
          <FormGroup id='flooz' className={classes.number}>
            <TextField  name='phone_number'
              sx={{minHeight: "100px"}} variant='outlined' size='large' type='text' label="Card number" 
              value={payement.phone_number} 
              onChange={handleInputChange}/>
          </FormGroup>
          <FormGroup>
            <Button size='large' variant='contained' onClick={PaygatePay}>Valider</Button>
          </FormGroup>
        </FormControl>
        </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <div className={classes.paymentImd} onClick={() => NetworkChange("VISA")}>
            <FormControlLabel value="visa" control={<Radio />}  sx={{marginRight: 0}}/> Carte visa
              <img src={visa} alt="" height={50} className={classes.radioImg}/>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.floozInput}>
          <FormControl>
            <FormGroup id='flooz' className={classes.number}>
              <TextField name='visa'
                sx={{minHeight: "100px"}} variant='outlined' size='large' type='text' label="Card number" 
                value={payement.visa}
                onChange={handleInputChange}/>
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormGroup id='flooz' className={classes.number}>
              <TextField variant='outlined' size='large' type='text' label="Date d'expiration"/>
            </FormGroup>
          </FormControl>
          <FormControl>
            <FormGroup id='flooz' className={classes.number}>
              <TextField variant='outlined' size='large' type='text' label="Cryptograme(CVV)"/>
            </FormGroup>
          </FormControl>
        </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <div className={classes.paymentImd} onClick={() => NetworkChange("ORANGE")}>
            <FormControlLabel value="orange" control={<Radio />} sx={{marginRight: 0}}/> Orange money
            <img src={orange} alt="" height={50} className={classes.radioImg}/>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.floozInput}>
          <FormControl>
            <FormGroup id='flooz' className={classes.number}>
              <TextField variant='outlined' size='large' type='text' label="Numéro Orange money"/>
            </FormGroup>
            <FormGroup>
            <Button size='large' variant='contained'>Valider</Button>
          </FormGroup>
          </FormControl>
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
    </>
  );
}
