import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingPage() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', width: '100dvw', position: 'fixed', left: 0, top: 0, zIndex: 999999, backgroundColor: '#fff' }}>
            <CircularProgress />
        </Box>
    );
}