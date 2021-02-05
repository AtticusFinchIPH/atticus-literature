
import { createMuiTheme } from "@material-ui/core/styles";

const FONT_F_DANCING_SCRIPT = 'Dancing Script';
const FONT_F_PLAYFAIR = 'Playfair Display';
const FONT_F_QUICKSAND = 'Quicksand'; 

const LIGHT_WHITE = "#fff";
const DARK_BLACK = "#000";
const LIGHT_GRAYISH_BLUE = "hsl(220, 16%, 96%)";
const DARK_GRAY = "#303030";

const commonTheme = {
  typography: {
    fontFamily: FONT_F_QUICKSAND,
  },
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
  },
}

const lightTheme = createMuiTheme({
  ...commonTheme,
  type: "light",
  palette: {
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
  ...commonTheme,
  type: "dark",
  palette: {
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

export { lightTheme, darkTheme, FONT_F_DANCING_SCRIPT, FONT_F_PLAYFAIR, FONT_F_QUICKSAND };