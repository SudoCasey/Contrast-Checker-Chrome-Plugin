import React from 'react';
import { useEffect, useRef } from 'react';
import './Options.scss';
import Typography from '@mui/material/Typography';
import {
  Grid,
  List,
  ListItem,
  Link,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { saveOption, restoreOption } from '../../utils/storageUtils';

const Options = ({ title }) => {
  const hasRendered = useRef(false);
  const [defaultColorType, setDefaultColorType] = React.useState(true);

  useEffect(() => {
    // restore user settings on page load
    async function restore(option) {
      try {
        const optionValue = await restoreOption(option);
        setDefaultColorType(optionValue);
      } catch (error) {
        console.error('Error restoring option: ', error);
      }
    }
    restore('defaultColorType');
    //restore(other settings)
  }, []);

  useEffect(() => {
    if (!hasRendered.current) {
      hasRendered.current = true;
      return;
    }

    saveOption({ name: 'defaultColorType', value: defaultColorType });
  }, [defaultColorType]);

  return (
    <div className="OptionsPage">
      <Grid container spacing={3} className="OptionsContainer">
        {/* Page Title */}
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" className="OptionsTitle">
            {title}
          </Typography>
        </Grid>

        {/* Instructions */}
        <Grid item xs={12} md={12}>
          <Typography variant="h5" component="h2" className="OptionsSubtitle">
            How to Use
          </Typography>
          <Typography variant="body1" className="OptionsText">
            Enter or select any 2 colors in Hex or RGB format. The plugin will
            automatically calculate the color contrast ratio of any valid color
            pair.
          </Typography>
          <Typography variant="h5" component="h2" className="OptionsSubtitle">
            Auto-Adjust Buttons
          </Typography>
          <Typography variant="body1" className="OptionsText">
            When the current color contrast ratio is below 3:1 or 4.5:1, the
            respective "auto-adjust" buttons will become available. Activating
            them will adjust the adjacent color to meet the desired contrast
            ratio, while making the minimum possible change to the color value.
          </Typography>
          {/* Settings */}
          <Typography variant="h5" component="h2" className="OptionsSubtitle">
            Settings
          </Typography>
          <Typography variant="h6" component="h3" className="OptionsSubtitle">
            Default Color Value Format
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={defaultColorType}
                onChange={() => setDefaultColorType(!defaultColorType)}
                color="primary"
              />
            }
            className="OptionsSwitch"
            label={defaultColorType ? 'Hex' : 'RGB'}
          />
          {/* TODO: Enable/Disable 'add to clipboard' when using color dropper */}
          {/*<FormControlLabel
            control={<Switch color="primary" />}
            label="Enable Auto-Adjust"
            className="OptionsSwitch"
          />*/}
        </Grid>

        {/* Links to WCAG */}
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" className="OptionsSubtitle">
            WCAG 2.2
          </Typography>
          <List>
            <ListItem>
              <Link
                href="https://www.w3.org/TR/WCAG22/"
                variant="body2"
                className="OptionsLink"
              >
                https://www.w3.org/TR/WCAG22/
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
                variant="body2"
                className="OptionsLink"
              >
                Success Criterion 1.4.3 - Contrast (Minimum)
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html"
                variant="body2"
                className="OptionsLink"
              >
                Success Criterion 1.4.6 - Contrast (Enhanced)
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html"
                variant="body2"
                className="OptionsLink"
              >
                Success Criterion 1.4.11 - Non-text Contrast (Level AA)
              </Link>
            </ListItem>
            <ListItem>
              <Link
                href="https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html"
                variant="body2"
                className="OptionsLink"
              >
                Success Criterion 2.4.13 - Focus Appearance
              </Link>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Options;
