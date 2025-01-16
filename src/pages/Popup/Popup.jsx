import React from 'react';
import { useEffect } from 'react';
import './Popup.scss';
import ContrastChecker from './Components/ContrastChecker/ContrastChecker';
import ColorTypeSwitch from './Components/ColorTypeSwitch/ColorTypeSwitch';
import { Typography, Grid } from '@mui/material';
import { restoreOption as getOption } from '../../utils/storageUtils';

const Popup = () => {
  const [checked, setChecked] = React.useState(true);

  const handleColorTypeChange = (event) => {
    setChecked(!checked);
  };

  useEffect(() => {
    async function getOptions(optionName) {
      const option = await getOption(optionName);
      setChecked(option);
    }

    getOptions('defaultColorType');
  }, []);

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
