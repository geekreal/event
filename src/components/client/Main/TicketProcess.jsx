import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentForm from './Forms/PaymentForm';
import TicketGenerate from './Forms/TicketGenerate';
import TicketDownload from './Forms/TicketDownload';
import { Fragment } from 'react';
import TabPayment from './Forms/TabPayment';

const steps = ['Payement', 'Ticket', 'Télécharger'];

export default function TicketProcess() {
return (
    <Box sx={{ width: '100%' }}>
      <TabPayment/>
    </Box>
  );
}