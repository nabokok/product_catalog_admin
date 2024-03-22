'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GithubLogin from './GithubLogin';
import GoogleLogin from './GoogleLogin';

export function SignInForm(): React.JSX.Element {
  return (
    <Stack spacing={4} sx={{ width: '240px' }}>
      <Stack spacing={2}>
        <Stack direction="column" spacing={2}>
          <GoogleLogin />
          <GithubLogin />
        </Stack>
      </Stack>
    </Stack>
  );
}
