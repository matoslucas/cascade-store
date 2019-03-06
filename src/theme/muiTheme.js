import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: {
      main: "#03A9F4",
      light: "rgb(53, 186, 246)",
      dark: "rgb(2, 118, 170)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      main: "#212121",
      light: "rgb(77, 77, 77)",
      dark: "rgb(23, 23, 23)",
      contrastText: "#fff",
    }
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiDrawer: {
      paper: {
        minWidth: 256,
      },
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
    },
  },
});

export default theme;
