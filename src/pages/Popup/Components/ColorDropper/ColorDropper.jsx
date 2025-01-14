import React from 'react';
import useEyeDropper from 'use-eye-dropper';
import ColorizeIcon from '@mui/icons-material/Colorize';
import './ColorDropper.scss';

const ColorDropper = (props) => {
  const { isSupported } = useEyeDropper();

  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      props.onClick();
    }
  };

  if (isSupported) {
    return (
      <ColorizeIcon
        role="button"
        aria-hidden="false"
        onClick={props.onClick}
        className={'colorDropper__Icon'}
        color={'primary'}
        tabIndex={0}
        onKeyDown={handleKeydown}
      />
    );
  } else {
    console.error('ColorDropper is not supported on this browser');
    return <></>;
  }
};

export default ColorDropper;
