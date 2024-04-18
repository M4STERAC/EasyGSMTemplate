// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (mode) => {
  const colors = presetPalettes;

  const greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  const greyConstant = ['#fafafb', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  const lightTheme = createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      divider: paletteColor.grey[200],
      border: {
        primary: paletteColor.grey[100],
        active: paletteColor.grey[300]
      },
      menu: {
        lighter: '#e8ecfc'
      }
    }
  });

  const darkTheme = createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: '#fff',
        secondary: paletteColor.grey[500],
        disabled: paletteColor.grey[900]
      },
      action: {
        disabled: paletteColor.grey[700],
        disabledBackground: paletteColor.grey[900]
      },
      background: {
        paper: paletteColor.grey[800]
      },
      divider: paletteColor.grey[700],
      border: {
        primary: paletteColor.grey[700],
        active: paletteColor.grey[600]
      },
      menu: {
        lighter: '#18243c'
      }
    }
  });
  if (mode === 'dark') return darkTheme;
  return lightTheme;
};

export default Palette;
