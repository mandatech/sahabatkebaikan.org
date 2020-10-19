import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4156A5',
    },
    secondary: {
      main: '#1BBCC2',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F7F7F7',
    },
  },
  typography: {
    fontFamily: ['Poppins', '-apple-system', 'sans-serif'],
  },
});

export default theme;
