import { blue, brown, blueGrey, green, lightGreen, orange, red, grey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";
// import _ from "lodash";

// import State from "env/ApplicationState.json";

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
  text: {
    primary: {
      color: "rgba(222, 222, 222, 0.54)"
    },
    secondary: {
      color: "rgba(0, 0, 0, 0.54)"
    }
  },
  palette: {
    primary: genInteractions(blueGrey, 50),
    secondary: genInteractions(lightGreen, baseTone),
    default: "#eee",
    white: "#fff",
    debug: genInteractions(brown, baseTone)
  },
  status: {
    success: genInteractions(green, baseTone),
    info: genInteractions(blue, baseTone),
    warn: genInteractions(orange, baseTone),
    danger: genInteractions(red, baseTone),
    debug: genInteractions(brown, baseTone),
    emergency: genInteractions(red, baseTone + 200)
  },
  debugObject: {
    color: brown[baseTone],
    backgroundColor: brown[baseTone * strongMod],
    "&:hover": { color: grey[baseTone * boldMod] },
    "&:focus": { color: brown[baseTone * strongMod] }
  },
  overrides: {
    MuiGrid: {
      item: {
        overflow: "hidden"
        // backgroundColor: State.Debug ? "rgba(155 , 00, 166, 0.10) !important" : undefined
      }
    }
  }
});
