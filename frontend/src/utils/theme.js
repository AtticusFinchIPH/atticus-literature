
import { createMuiTheme } from "@material-ui/core/styles";

const FONT_F_DANCING_SCRIPT = 'Dancing Script';
const FONT_F_PLAYFAIR = 'Playfair Display';
const FONT_F_QUICKSAND = 'Quicksand'; 

const LIGHT_WHITE = "#fff";
const DARK_BLACK = "#000";
const BLUR_WHITE = "#e0e0e0bf";
const BLUR_BLACK = "rgb(0 0 0 / 65%)";
const LIGHT_GRAYISH_BLUE = "hsl(220, 16%, 96%)";
const LIGHT_WHITE_BLUE = "hsl(220, 16%, 50%)";
const DARK_GRAY = "#303030";
const DARK_BLUE = 'rgb(14,52,90)';
const LIGHT_BUTTON_HOVER = "rgba(0, 0, 0, 0.04)";
const DARK_BUTTON_HOVER = "rgba(0, 0, 0, 0.3)";
const ORANGE = "#fe7e00";

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
      blur: BLUR_BLACK,
    },
    sectionBack: {
      main: DARK_BLUE,
      text: LIGHT_WHITE,
      textHover: DARK_BLUE,
    },
    icon: {
      main: DARK_BLUE,
      hover: LIGHT_WHITE_BLUE,
    },
    buttonHover: {
      main: LIGHT_BUTTON_HOVER,
    },
    sidebarHeader: {
      main: DARK_BLUE,
    },
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
      blur: BLUR_WHITE,
    },
    sectionBack: {
      main: LIGHT_WHITE,
      text: DARK_GRAY,
      textHover: LIGHT_WHITE,
    },
    icon: {
      main: LIGHT_WHITE,
      hover: LIGHT_WHITE_BLUE,
    },
    buttonHover: {
      main: DARK_BUTTON_HOVER,
    },
    sidebarHeader: {
      main: ORANGE,
    },
  }
});

export { 
  lightTheme, darkTheme, 
  FONT_F_DANCING_SCRIPT, FONT_F_PLAYFAIR, FONT_F_QUICKSAND, 
  LIGHT_WHITE, LIGHT_GRAYISH_BLUE, LIGHT_WHITE_BLUE,
  DARK_GRAY, DARK_BLUE, DARK_BLACK,  
};