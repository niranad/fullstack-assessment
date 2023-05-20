import { ThemeProvider } from '@emotion/react';
import { Container } from '@mui/material';
import customTheme from '../styles/theme';
import React from 'react'


export default function Layout({ children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth='xl'>{children}</Container>
    </ThemeProvider>
  )
}
