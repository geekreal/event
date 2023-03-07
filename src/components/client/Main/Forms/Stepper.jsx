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

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentForm />;
      case 1:
        return <TicketGenerate />;
      case 2:
        return <TicketDownload />;
      default:
        return <div>Not Found</div>;
    }
  }

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
      {activeStep === steps.length ? (
        <Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button>Telecharger</Button>
            <Button onClick={handleReset}>Terminer</Button>
          </Box>
        </Fragment>
          
        ) : (
          <div>
            { _renderStepContent(activeStep) }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Retour
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Télécharger' : 'Suivant'}
            </Button>
          </Box>
          </div>
          
        )
      }
      </Box>
      
    </Box>
  );
}