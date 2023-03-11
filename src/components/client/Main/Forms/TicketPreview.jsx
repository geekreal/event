import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Circular from "../../Loader/Circular";

const TicketPreview = () => {

  let ticketPreview = localStorage.getItem("tickets");
  const [openProgress, setOpenProgress] = useState(false);
  const [messages, setMessages] = useState({
    error: [],
  });

  const CancelTicketClick = () => {
    setOpenProgress(true)
    const timer = setTimeout(() => {
      localStorage.setItem('ticketId' , "");
      localStorage.setItem('ticketNb' , "");
      localStorage.setItem('event' , "");
      localStorage.setItem('ticketPrice' , "");
      setOpenProgress(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  const SaveTicket = (e) => {
    setOpenProgress(true)
    const timer = setTimeout(() => {
      var  user_id = localStorage.getItem("user_id");
      var  ticket_id= localStorage.getItem("ticket_id");
      var  event_id= localStorage.getItem("event_id");
      var  nb_ticket_payer = localStorage.getItem("nb_ticket_payer");
      var  code_reservation = localStorage.getItem("code_reservation");
      var  date_reservation = dayjs(new Date()).format("YYYY-MM-DD") ;
      var  number = localStorage.getItem("number");
      var  total_reservation = localStorage.getItem("total_reservation");
      var  moyen_paiement = localStorage.getItem("moyen_paiement");
      var  nom_ticket = localStorage.getItem("nom_ticket");

      let num = Math.floor(Math.random() * (2023 - 2009 + 1)) + 2009;
      let code1 = "1I"+nom_ticket;
      let code2 = "2VE"+ticket_id;
      let code3 = "3NOS"+num;
      let codeR = code1+"-"+code2+"-"+code3

      e.preventDefault();
      const data ={
        user_id: user_id,
        event_id: event_id,
        ticket_id: ticket_id,
        nb_ticket_payer: nb_ticket_payer,
        code_reservation: codeR,
        date_reservation: date_reservation,
        number: number,
        total_reservation: total_reservation,
        moyen_paiement: moyen_paiement,
        nom_ticket: nom_ticket,
      }
  
      axios.get('/sanctum/csrf-cookie').then(response =>{ 
        axios.post(`/api/user/event/ticket/reservation`, data).then(resp => {
            if (resp.data.status === 200) {
                localStorage.setItem('resevation_id' , resp.data.reservation.id)
                swal("Parfait", resp.data.message, "success");

            } else if(resp.data.status === 400){
                setMessages({...messages , error: resp.data.validation_errors })
            }else {
              swal("Alert", resp.data.message, "info");
          }
        });
      });

      setOpenProgress(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Evènement</TableCell>
              <TableCell align="left">Ticket</TableCell>
              <TableCell align="left">Qté</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={localStorage.getItem("ticketId")}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{localStorage.getItem("event")}</TableCell>
              <TableCell align="left">{localStorage.getItem("ticketPrice")}</TableCell>
              <TableCell align="left">
                {localStorage.getItem("ticketNb")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    <div style={{display: 'flex', alignItems: 'center', padding: 2}}>
    {openProgress ? <Circular />: ""}
    <Button
        type="contained"
        size="large"
        color="primary"
        
        sx={{
          backgroundColor: "#f44336",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          letterSpacing: "0.02857em",
          minWidth: "64px",
          width: "100%",
          marginTop: 2,
          marginLeft: 2,
          color: "white",
          padding: 2,
          "&:hover":{
            backgroundColor: "#b71c1c",
          }
        }}
        // disabled={activeBtn}
        onClick={CancelTicketClick}
      >
        Tout anuluer !
      </Button>
    </div>

    <Button
        type="contained"
        size="large"
        color="primary"
        sx={{
          backgroundColor: "green",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "700",
          letterSpacing: "0.02857em",
          minWidth: "64px",
          width: "100%",
          marginTop: 2,
          marginLeft: 2,
          color: "white",
          padding: 2,
          "&:hover":{
            backgroundColor: "#b71c1c",
          }
        }}
        onClick={SaveTicket}
      >
        Save
      </Button>
    
      
    </div>
  );
};

export default TicketPreview;
