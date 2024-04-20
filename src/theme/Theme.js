import { createTheme } from "@mui/material/styles";
import theme from "./config/theme";
const getTheme = () => {
  const { colors } = theme;
  return createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: { main: colors.secondary },
      background: {
        paper: colors.white,
      },
      info: { main: colors.info, dark: colors.darkTertiary },
      text: {
        secondary: colors.grey800,
        primary: colors.grey900,
      },
      error: {
        main: colors.error,
      },
      success: { main: colors.success },
      warning: { main: colors.warning },
      grey: {
        300: colors.grey300,
        400: colors.grey400,
        500: colors.grey500,
        600: colors.grey600,
        700: colors.grey700,
        800: colors.grey800,
        900: colors.grey900,
      },
      common: {
        white: colors.white,
        black: colors.black,
        link: colors.link,
        disabled: colors.ghostDisabled,
      },
    },
    spacing: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120],
    components: {
      MuiInputBase: {
        root: {
          fontSize: "16px",
          minHeight: 44,
        },
      },
      MuiFormLabel: { styleOverrides: { asterisk: { color: colors.error } } },
      MuiCssBaseline: {
        styleOverrides: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "rgb(151, 151, 151)",
            borderRadius: "20px",
          },
          "*::-webkit-scrollbar-track": {
            background: "rgba(0, 0, 0, 0.04)",
            borderRadius: "20px",
          },
          ".MuiAutocomplete-option": {
            "&:hover": {
              color: colors.primary,
              "& h6": {
                color: colors.primary,
                fontWeight: 400,
              },
            },
            '&[aria-selected="true"]': {
              fontWeight: 500,
              color: colors.primary,
              "& h6": {
                fontWeight: 500,
                color: colors.primary,
              },
            },
          },
        },
      },
      MuiLink: {
        button: {
          "&:disabled": {
            cursor: "not-allowed",
          },
        },
      },
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1280,
        xl: 1920,
      },
    },
  });
};

export default getTheme;
