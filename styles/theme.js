import { createTheme } from "@mui/material";

const taskifyTheme = {
  gray: {
    lighter: "#C5C7CD",
    light: "#9FA2B4",
    dark: "#626262",
    darker: "#252733",
  },
  green: {
    lighter: "#B7EBEC",
    light: "#6CBEBF",
    normal: "#6CBEBF",
    darker: "#02333E",
  },
};

export const theme = createTheme({
  palette: {
    text: {
      taskifyLight: "#E7E7E7",
      taskifyGreen: taskifyTheme.green,
      taskifyGray: taskifyTheme.gray,
      danger: "#B02761",
    },
    background: {
      taskifyPrimary: {
        main: "#EEEEEE",
      },
      taskifyPurple: {
        dark: "#B02761",
      },
      taskifyGray: taskifyTheme.gray,
    },

    border: {
      taskifyGray: taskifyTheme.gray,
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    subtitle1: {
      fontSize: "16px",
      color: taskifyTheme.gray.darker,
    },
    subtitle2: {
      fontSize: "13px",
      color: taskifyTheme.gray.dark,
    },
    h1: {
      color: taskifyTheme.gray.darker,
      fontWeight: "bold",
    },
    h2: {
      color: taskifyTheme.gray.darker,
      fontWeight: "bold",
    },
    h3: {
      color: taskifyTheme.gray.darker,
      fontWeight: "bold",
    },
    h4: {
      color: taskifyTheme.gray.darker,
      fontWeight: "bold",
    },
    h5: {
      color: taskifyTheme.gray.darker,
      fontWeight: "bold",
    },
    h6: {
      color: taskifyTheme.gray.darker,
      fontWeight: "bold",
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
  },
});
