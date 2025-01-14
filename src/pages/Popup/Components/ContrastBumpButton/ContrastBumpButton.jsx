import React from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const ContrastBumpButton = (props) => {
  return (
    <Button
      onClick={() => props.onClick(props.contrastRatio, props.inputNum)}
      variant="contained"
      size="small"
      disabled={props.disabled}
    >
      {props.buttonIcon === 'singleArrowUp' ? (
        <KeyboardArrowUpIcon fontSize="12px" />
      ) : (
        <KeyboardDoubleArrowUpIcon fontSize="12px" />
      )}
      &nbsp;
      {props.contrastRatio}:1
    </Button>
  );
};

export default ContrastBumpButton;
