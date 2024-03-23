'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { paths } from '@/constants/paths';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SignInForm } from '@/components/auth/sign-in-form';
import Loading from '@/components/core/loading';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Nice Gadgets
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignIn() {
  const { data: session, status } = useSession()

  if (session) {
    return redirect(paths.dashboard.products)
  }

  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1603791239531-1dda55e194a6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            p: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <SignInForm />
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignIn;