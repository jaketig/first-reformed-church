import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1372B1',
    },
    secondary: {
      main: '#828383',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;