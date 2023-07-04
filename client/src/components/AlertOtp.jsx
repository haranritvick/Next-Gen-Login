import React from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function AlertOtp(){
    return(
        <Stack sx={{ width: '60%', paddingLeft: '35%', paddingTop: '2%'}} spacing={2}>
            <Alert severity="info">Enter the One-Time Password below</Alert>
        </Stack>
    );
}

export default AlertOtp;