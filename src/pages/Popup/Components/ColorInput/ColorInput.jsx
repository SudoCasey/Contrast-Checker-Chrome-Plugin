import React from 'react';
import { Grid, TextField } from '@mui/material';
import './ColorInput.scss';

const ColorInput = (props) => {
  return (
    <Grid item xs={props.xs}>
      <TextField
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        color={props.color}
        inputProps={{
          maxLength: props.name === 'hex' ? 7 : 20,
          //style: { padding: 10 },
        }}
        className={props.className}
        autoComplete="off"
      />
    </Grid>
  );
};

export default ColorInput;
