import React from 'react';
import { useEffect } from 'react';
import './Popup.scss';
import ContrastChecker from './Components/ContrastChecker/ContrastChecker';
import ColorTypeSwitch from './Components/ColorTypeSwitch/ColorTypeSwitch';
import { Typography, Grid } from '@mui/material';

const Popup = () => {
  const [checked, setChecked] = React.useState(true);

  const handleColorTypeChange = (event) => {
    setChecked(!checked);
  };

  useEffect(() => {
    const colorType = localStorage.getItem('colorType');
    if (colorType) {
      setChecked(JSON.parse(colorType));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorType', checked);
  }, [checked]);

  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography variant="h5" component="h1">
              Contrast Checker
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <ColorTypeSwitch
              checked={checked}
              onChange={handleColorTypeChange}
            />
          </Grid>
        </Grid>
      </header>
      <main>
        <ContrastChecker colorType={checked} />
      </main>
    </div>
  );
};

export default Popup;
