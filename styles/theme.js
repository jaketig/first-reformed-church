import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0074C3',
    },
    secondary: {
      main: '#808080',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;