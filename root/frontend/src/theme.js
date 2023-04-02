import {createTheme} from "@mui/material";

const themeOptionsLight = {
    palette: {
        mode: "light",
        primary: {
            main: "#007DBD",
            light: "#4ec0f7",
            dark: "#027bb1",
            contrastText: "rgba(255,255,255,0.87)"
        },
        secondary: {
            main: "#00796b",
            light: "#19b5a2",
            dark: "#004d40"
        },
        text: {
            hint: "#0297cb",
            secondary: "rgba(49,49,49,0.6)",
            disabled: "rgba(158,158,158,0.38)"
        },
        error: {
            main: "#ea0707"
        },
        warning: {
            main: "#ffb300"
        },
        info: {
            main: "#9c27b0"
        },
        success: {
            main: "#00c853"
        },
        divider: "rgba(78,78,78,0.12)",
        background: {
            paper: "#ffffff",
            default: "#ececec"
        }
    },
    typography: {
        fontFamily: "Exo 2",
        fontSize: 14,
        fontWeightLight: 200,
        fontWeightRegular: 300,
        h1: {
            fontWeight: 500
        },
        h2: {
            fontWeight: 400
        },
        subtitle1: {
            fontWeight: 200
        },
        subtitle2: {
            fontWeight: 300
        },
        button: {
            fontWeight: 500
        },
        body1: {
            fontSize: 16
        },
        body2: {
            fontSize: 15
        }
    },
    spacing: 8,
    direction: "rtl",
    shape: {
        borderRadius: 4
    }
};

const themeOptionsDark = {
    palette: {
        mode: "dark",
        primary: {
            main: "#29b4f7",
            light: "#68cbff",
            dark: "#027bb1",
            contrastText: "rgba(255,255,255,0.87)"
        },
        secondary: {
            main: "#00a48d",
            light: "#38e8d4",
            dark: "#007764",
            contrastText: "rgba(249,249,249,0.87)"
        },
        text: {
            hint: "#0297cb",
            secondary: "rgba(230,229,229,0.6)",
            disabled: "#bdbdbd"
        },
        error: {
            main: "#ea0707"
        },
        warning: {
            main: "#ffb300"
        },
        info: {
            main: "#9c27b0"
        },
        success: {
            main: "#00c853"
        },
        divider: "#aaa8a9",
        background: {
            paper: "#3f3f3f",
            default: "#020202"
        }
    },
    typography: {
        fontFamily: "Exo 2",
        fontSize: 14,
        fontWeightLight: 200,
        fontWeightRegular: 300,
        h1: {
            fontWeight: 500
        },
        h2: {
            fontWeight: 400
        },
        subtitle1: {
            fontWeight: 200
        },
        subtitle2: {
            fontWeight: 300
        },
        button: {
            fontWeight: 500
        },
        body1: {
            fontSize: 16
        },
        body2: {
            fontSize: 15
        }
    },
    spacing: 8,
    direction: "ltr", // orig: rtl
    shape: {
        borderRadius: 4
    }
};

export const theme = createTheme({
    light: {...themeOptionsLight},
    dark: {...themeOptionsDark}
});
