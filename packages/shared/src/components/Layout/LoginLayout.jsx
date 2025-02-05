import { Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Logo from '../Images/Logo';
import Navbar from '../Navbar';
import Background from '../Resources/Background';

function LoginLayout({ children }) {
  return (
    <>
      <Background />
      <Grid alignItems="center" justifyContent="center">
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Navbar />
          <Grid sx={{ margin: '20px' }}>
            <Logo />
          </Grid>
          <Header />
          {children}
        </Grid>
      </Grid>
    </>
  );
}

export default LoginLayout;

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
