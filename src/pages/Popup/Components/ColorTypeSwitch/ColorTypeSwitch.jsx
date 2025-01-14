import React from 'react';
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const ColorTypeSwitch = (props) => {
  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      props.onChange();
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        checked={props.checked}
        onChange={props.onChange}
        control={<Switch size="small" />}
        label={props.checked ? 'Hex' : 'RGB'}
        aria-live="polite"
        onKeyDown={handleKeydown}
      />
    </FormGroup>
  );
};

export default ColorTypeSwitch;
