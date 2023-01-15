import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 760,
      lg: 1220,
      xl: 1220,
    },
  },
});
const withTheme = (children:()=> React.ReactNode) => () => (
  <ThemeProvider theme={theme}>
    {children()}
  </ThemeProvider>
);
export { withTheme };
