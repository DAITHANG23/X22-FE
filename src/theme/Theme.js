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
    spacing: [8, 12, 16, 20, 24, 32, 48, 56, 170],
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1025,
        lg: 1280,
        xl: 1920,
      },
    },
  });
};

export default getTheme;
