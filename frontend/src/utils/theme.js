
import { createMuiTheme } from "@material-ui/core/styles";

const LIGHT_WHITE = "#fff";
const DARK_BLACK = "#000";
const LIGHT_GRAYISH_BLUE = "hsl(220, 16%, 96%)";
const DARK_GRAY = "#303030";

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
      main: LIGHT_WHITE,
    },
    background: {
      main: LIGHT_GRAYISH_BLUE,
    },
    text: {
      main: DARK_BLACK,
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
      main: DARK_BLACK,
    },
    background: {
      main: DARK_GRAY,
    },
    text: {
      main: LIGHT_WHITE,
    }
  }
});

export { lightTheme, darkTheme };