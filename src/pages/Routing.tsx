/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import { Container } from '@mui/material';

import { Main } from './Main';

const routes = [{
  path: '/',
  element: <Main />,
}];

export function Routing() {
  return (
    <Container sx={{ paddingTop: '60px' }}>
      <Routes>
        {routes.map((route) => (<Route key={route.path} {...route} />))}
      </Routes>
    </Container>
  );
}
