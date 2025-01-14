import React from 'react';
import { Grid, Typography } from '@mui/material';
import './ContrastResult.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ContrastResult = (props) => {
  const roundToDecimalPlaces = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return parseFloat((Math.round(num * factor) / factor).toString());
  };

  return (
    <Grid item xs={props.xs}>
      <Typography variant="h6" component="p" color="#FFF" aria-live="polite">
        {roundToDecimalPlaces(props.contrastRatio, props.roundTo)}
        <span aria-hidden="true">:</span>
        <span className="sr-only"> to </span>1
      </Typography>
    </Grid>
  );
};

export default ContrastResult;
