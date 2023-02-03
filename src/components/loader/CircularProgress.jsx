import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularColorProgress from '@mui/material/CircularProgress';

export default function CircularProgress() {
  return (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularColorProgress color="secondary" />
    </Stack>
  );
}