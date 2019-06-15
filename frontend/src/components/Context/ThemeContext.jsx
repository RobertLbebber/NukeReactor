import { amber, blue, blueGrey, brown, cyan, green, lightGreen, orange, red, grey } from "@material-ui/core/colors";
import _ from "lodash";
import { createMuiTheme } from "@material-ui/core";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
//Ideal for standard display
const baseTone = 400;
//Ideal for disabled
const fadedMod = 200;
//Ideal for hover/focus
const boldMod = 1.2;
//Ideal for action
const strongMod = 1.4;
const genInteractions = (color, baseTone) => ({
  main: color[baseTone],
  light: color[baseTone - fadedMod],
  dis: color[baseTone - fadedMod],
  hvr: color[baseTone * boldMod],
  dark: color[baseTone * boldMod],
  act: color[baseTone * strongMod]
});

export const theme = createMuiTheme({
  palette: {
    primary: genInteractions(cyan, baseTone),
    secondary: genInteractions(lightGreen, baseTone),
    default: "#eee",
    white: "#fff"
  },
  status: {
    success: genInteractions(green, baseTone),
    info: genInteractions(blue, baseTone),
    warn: genInteractions(orange, baseTone),
    danger: genInteractions(red, baseTone),
    debug: genInteractions(brown, baseTone),
    emergency: genInteractions(red, baseTone + 200)
  }
});
