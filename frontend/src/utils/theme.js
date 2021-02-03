
import { createMuiTheme } from "@material-ui/core/styles";

const lightTheme = createMuiTheme({
  type: "light",
  palette: {
    primary: {
      light: "#5c67a3",
      main: "#3f51b5",
      dark: "#2e355b",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000"
    },
    navBar: {
      main: "#ffffff",
    },
    background: {
      main: "#3f51b5",
    },
    text: {
      main: "#000",
    }
  }
});
const darkTheme = createMuiTheme({
  type: "dark",
  palette: {
    primary: {
      light: "#5c67a3",
      main: "#3f51b5",
      dark: "#2e355b",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff79b0",
      main: "#ff4081",
      dark: "#c60055",
      contrastText: "#000"
    },
    navBar: {
      main: "#303030",
    },
    background: {
      main: "#3f51b5",
    },
    text: {
      main: "#fff",
    }
  }
});

export { lightTheme, darkTheme };