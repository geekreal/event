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
import React, { useEffect, useState } from "react";
import Circular from "../../Loader/Circular";

const TicketPreview = () => {

  let ticketPreview = localStorage.getItem("tickets");
  const [openProgress, setOpenProgress] = useState(false);

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
    
      
    </div>
  );
};

export default TicketPreview;
