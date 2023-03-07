import React from 'react';
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
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

export default function PaymentForm(props) {
  const [payement, setPayement] = useState({
    visa:'',
    flooz:'',
    tmoney:'',
    orange: '',
  });
  const [expanded, setExpanded] = React.useState('panel1');

  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  const handleInputChange =(e) =>{
    e.persist();
    setPayement({...payement, [e.target.name] : e.target.value});
  }
  const classes = Style();
  return (
    <>
    <div >
    Sélectionnez un moyen de paiement
    <div className={classes.formContainer}>
      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel1'} 
      onChange={handleAccordionChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <div className={classes.paymentImd}>
              <FormControlLabel className={classes.radioBtn} value="Tmoney" control={<Radio />}/> Tomney
              <img src={Tmoney} alt="" height={50} className={classes.radioImg}/>
            </div>
          </AccordionSummary>
          <AccordionDetails>
          <div className={classes.floozInput}>
            <FormControl>
              <FormGroup id='flooz' className={classes.number}>
                <TextField variant='outlined' size='large' type='text' label="Numéro T-money TOGO"/>
              </FormGroup>
              <FormGroup>
            <Button size='large' variant='contained'>Valider</Button>
          </FormGroup>
            </FormControl>
          </div>
          </AccordionDetails>
      </Accordion>

      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <div className={classes.paymentImd}>
            <FormControlLabel value="flooz" control={<Radio />} sx={{marginRight: 0}}/> Moov money togo
            <img src={flooz} alt="" height={50} className={classes.radioImg}/>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.floozInput}>
        <FormControl>
          <FormGroup id='flooz' className={classes.number}>
            <TextField 
              sx={{minHeight: "100px"}} variant='outlined' size='large' type='text' label="Card number" 
              value={payement.visa}
              onChange={handleInputChange}/>
          </FormGroup>
          <FormGroup>
            <Button size='large' variant='contained'>Valider</Button>
          </FormGroup>
          <FormGroup>
            <Button size='large' variant='contained'>Valider</Button>
          </FormGroup>
        </FormControl>
        </div>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{border: 'none'}} className={classes.accordion} expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <div className={classes.paymentImd}>
            <FormControlLabel value="visa" control={<Radio />}  sx={{marginRight: 0}}/> Carte visa
            <img src={visa} alt="" height={50} className={classes.radioImg}/>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className={classes.floozInput}>
          <FormControl>
            <FormGroup id='flooz' className={classes.number}>
              <TextField 
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
          <div className={classes.paymentImd}>
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
