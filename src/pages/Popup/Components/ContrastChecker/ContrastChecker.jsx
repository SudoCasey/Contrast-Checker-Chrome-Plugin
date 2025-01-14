import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import './ContrastChecker.scss';
import ColorInput from '../ColorInput/ColorInput';
import ContrastResult from '../ContrastResult/ContrastResult';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ColorDropper from '../ColorDropper/ColorDropper';
import useEyeDropper from 'use-eye-dropper';
import ContrastBumpButton from '../ContrastBumpButton/ContrastBumpButton';

const ContrastChecker = (props) => {
  const [colorValue, setColorValue] = useState({
    color1: {
      hex: '#000',
      rgb: 'rgb(0, 0, 0)',
    },
    color2: {
      hex: '#FFF',
      rgb: 'rgb(255, 255, 255)',
    },
  });
  const [contrastRatioValue, setContrastRatioValue] = useState(0);
  const { open, close } = useEyeDropper();
  const [color, setColor] = useState('#fff');
  const [error, setError] = useState();
  const [colorDropperState, setColorDropperState] = useState({
    open: false,
    input: 0,
  });

  useEffect(() => {
    const newColorValue = { ...colorValue };

    if (props.colorType) {
      if (
        isValidHex(colorValue.color1.hex) &&
        isValidHex(colorValue.color2.hex)
      ) {
        const rgb1 = hexToRgb(colorValue.color1.hex);
        const rgb2 = hexToRgb(colorValue.color2.hex);

        newColorValue.color1.rgb = rgb1;
        newColorValue.color2.rgb = rgb2;
      }
    } else {
      if (
        isValidRGB(colorValue.color1.rgb) &&
        isValidRGB(colorValue.color2.rgb)
      ) {
        const hex1 = rgbToHex(colorValue.color1.rgb);
        const hex2 = rgbToHex(colorValue.color2.rgb);

        newColorValue.color1.hex = hex1;
        newColorValue.color2.hex = hex2;
      }
    }

    if (JSON.stringify(newColorValue) !== JSON.stringify(colorValue)) {
      setColorValue(newColorValue);
    }

    const rgb1 = extractRGBValues(newColorValue.color1.rgb);
    const rgb2 = extractRGBValues(newColorValue.color2.rgb);

    if (rgb1 && rgb2) {
      const lum1 = relativeLuminance(rgb1[0], rgb1[1], rgb1[2]);
      const lum2 = relativeLuminance(rgb2[0], rgb2[1], rgb2[2]);

      setContrastRatioValue(contrastRatio(lum1, lum2));
    }
  }, [colorValue, props.colorType]);

  const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  };

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const extractRGBValues = (rgbString) => {
    const match = rgbString.match(/\d+/g);
    return match ? match.map(Number) : null;
  };

  const relativeLuminance = (r, g, b) => {
    const convert = (value) => {
      value /= 255;
      return value <= 0.04045
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    };

    const R = convert(r);
    const G = convert(g);
    const B = convert(b);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const contrastRatio = (lum1, lum2) => {
    const L1 = Math.max(lum1, lum2);
    const L2 = Math.min(lum1, lum2);
    return (L1 + 0.05) / (L2 + 0.05);
  };

  function isValidHex(hex) {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
    const hexRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(hex);
  }

  function handleHexInput(event) {
    const { name, value } = event.target;
    const [color, key] = name.split('.');
    setColorValue((prevState) => ({
      ...prevState,
      [color]: {
        ...prevState[color],
        [key]: value,
      },
    }));
  }

  function isValidRGB(rgb) {
    const rgbRegex =
      /^rgb\(\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*,\s*(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s*\)$/;
    return rgbRegex.test(rgb);
  }

  function handleRGBInput(event) {
    const { name, value } = event.target;
    const [color, key] = name.split('.');
    setColorValue((prevState) => ({
      ...prevState,
      [color]: {
        ...prevState[color],
        [key]: value,
      },
    }));
  }

  const pickColor = useCallback(
    (inputNum) => {
      const openPicker = async () => {
        try {
          setColorDropperState((colorDropperState) => ({
            ...colorDropperState,
            ...{ open: true, input: inputNum },
          }));
          await open().then((color) => {
            setColor(color.sRGBHex.toUpperCase());
            setColorDropperState((colorDropperState) => ({
              ...colorDropperState,
              ...{ open: false, input: inputNum },
            }));
          });
        } catch (e) {
          console.warn(e);
          // Ensures component is still mounted before calling setState
          if (!e.canceled) setError(e);
          close();
        }
      };

      return openPicker;
    },
    [open, close]
  );

  /*useEffect(() => {
    pickColor();
  }, [pickColor]);*/

  useEffect(() => {
    if (!colorDropperState.open) {
      if (colorDropperState.input === 1) {
        setColorValue({
          color1: {
            hex: color,
            rgb: hexToRgb(color),
          },
          color2: {
            hex: colorValue.color2.hex,
            rgb: colorValue.color2.rgb,
          },
        });
      } else if (colorDropperState.input === 2) {
        setColorValue({
          color1: {
            hex: colorValue.color1.hex,
            rgb: colorValue.color1.rgb,
          },
          color2: {
            hex: color,
            rgb: hexToRgb(color),
          },
        });
      }
      //TODO: Copy color value to clipboard, without copying when first opening popup
      //navigator.clipboard.writeText(color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorDropperState]);

  const handleContrastBump = (ratio, inputNum) => {
    const middleOut = (rgb, comparisonRGB, inputNum) => {
      let newRatio = contrastRatio(
        relativeLuminance(rgb[0], rgb[1], rgb[2]),
        relativeLuminance(comparisonRGB[0], comparisonRGB[1], comparisonRGB[2])
      );
      let up = rgb.slice();
      let down = rgb.slice();
      let debug = 0;

      while (newRatio < ratio && debug < 256) {
        for (let i = 0; i < rgb.length; i++) {
          if (up[i] < 255) {
            up[i]++;
          }
          if (down[i] > 0) {
            down[i]--;
          }
        }
        newRatio = contrastRatio(
          relativeLuminance(up[0], up[1], up[2]),
          relativeLuminance(
            comparisonRGB[0],
            comparisonRGB[1],
            comparisonRGB[2]
          )
        );
        if (newRatio >= ratio) {
          updateColorValue(inputNum, up);
          setContrastRatioValue(newRatio);
          return;
        }

        newRatio = contrastRatio(
          relativeLuminance(down[0], down[1], down[2]),
          relativeLuminance(
            comparisonRGB[0],
            comparisonRGB[1],
            comparisonRGB[2]
          )
        );
        if (newRatio >= ratio) {
          updateColorValue(inputNum, down);
          setContrastRatioValue(newRatio);
          return;
        }
        debug++;
      }
    };

    const updateColorValue = (inputNum, rgb) => {
      const newColor = `rgb(${rgb.join(', ')})`;
      const newHex = rgbToHex(newColor);
      setColorValue((prevState) => ({
        ...prevState,
        [`color${inputNum}`]: {
          hex: newHex,
          rgb: newColor,
        },
      }));
    };

    const rgb1 = extractRGBValues(colorValue.color1.rgb);
    const rgb2 = extractRGBValues(colorValue.color2.rgb);

    if (inputNum === 1) {
      middleOut(rgb1, rgb2, 1);
    } else if (inputNum === 2) {
      middleOut(rgb2, rgb1, 2);
    }
  };

  return (
    <Grid container spacing={1} className="contrastChecker__Grid">
      <Grid container item xs={6} spacing={1}>
        <Grid container item xs={12}>
          <Typography variant="h5" component="h2">
            Color 1
          </Typography>
          <ColorDropper
            onClick={() => {
              pickColor(1)();
            }}
          />
          {!!error && console.warn(error.message)}
        </Grid>
        {props.colorType ? (
          <ColorInput
            label={'Hex Value 1'}
            xs={12}
            name="color1.hex"
            value={colorValue.color1.hex}
            onChange={handleHexInput}
            color={isValidHex(colorValue.color1.hex) ? 'success' : 'error'}
            sx={{ color: 'warning' }}
            className="contrastChecker__ColorInput"
          />
        ) : (
          <ColorInput
            label={'RGB Value 1'}
            xs={12}
            name="color1.rgb"
            value={colorValue.color1.rgb}
            onChange={handleRGBInput}
            color={isValidRGB(colorValue.color1.rgb) ? 'success' : 'error'}
            className="contrastChecker__ColorInput"
          />
        )}
        <Grid container item xs={12} spacing={1}>
          <Typography variant="h7" component="h3">
            Auto-Adjust
          </Typography>
          <Grid item xs={6}>
            <ContrastBumpButton
              contrastRatio={3}
              inputNum={1}
              onClick={handleContrastBump}
              disabled={contrastRatioValue >= 3}
              buttonIcon="singleArrowUp"
            />
          </Grid>
          <Grid item xs={6}>
            <ContrastBumpButton
              contrastRatio={4.5}
              inputNum={1}
              onClick={handleContrastBump}
              disabled={contrastRatioValue >= 4.5}
              buttonIcon="doubleArrowUp"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={6} spacing={1}>
        <Grid container item xs={12}>
          <Typography variant="h5" component="h2">
            Color 2
          </Typography>
          <ColorDropper
            onClick={() => {
              pickColor(2)();
            }}
          />
          {!!error && console.warn(error.message)}
        </Grid>

        {props.colorType ? (
          <ColorInput
            label={'Hex Value 2'}
            xs={12}
            name="color2.hex"
            value={colorValue.color2.hex}
            onChange={handleHexInput}
            color={isValidHex(colorValue.color2.hex) ? 'success' : 'error'}
            className="contrastChecker__ColorInput"
          />
        ) : (
          <ColorInput
            label={'RGB Value 2'}
            xs={12}
            name="color2.rgb"
            value={colorValue.color2.rgb}
            onChange={handleRGBInput}
            color={isValidRGB(colorValue.color2.rgb) ? 'success' : 'error'}
            className="contrastChecker__ColorInput"
          />
        )}
        <Grid container item xs={12} spacing={1}>
          <Typography variant="h7" component="h3">
            Auto-Adjust
          </Typography>
          <Grid item xs={6}>
            <ContrastBumpButton
              contrastRatio={3}
              inputNum={2}
              onClick={handleContrastBump}
              disabled={contrastRatioValue >= 3}
              buttonIcon="singleArrowUp"
            />
          </Grid>
          <Grid item xs={6}>
            <ContrastBumpButton
              contrastRatio={4.5}
              inputNum={2}
              onClick={handleContrastBump}
              disabled={contrastRatioValue >= 4.5}
              buttonIcon="doubleArrowUp"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={1}>
        <Typography variant="h5" component="h2">
          Contrast Ratio
        </Typography>
        <ContrastResult
          contrastRatio={contrastRatioValue}
          xs={12}
          roundTo={2}
        />
      </Grid>
    </Grid>
  );
};

export default ContrastChecker;
