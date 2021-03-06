import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import GridContainer from '../components/Dashboard/Grid/GridContainer';
import GridItem from '../components/Dashboard/Grid/GridItem';

export default function Login() {
    const style1 = {
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
    };

    const LoadPage =() =>{
        window.location.href = "https://testauth.boligmappa.no/auth/realms/professional-realm-staging/protocol/openid-connect/auth?client_id=staging-michelle&scope=openid&redirect_uri=http://localhost:3000/redirect&response_type=code";
    }

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={style1}>
                  <Box
                    component="form"
                    noValidate
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '90%' },
                    }}
                    autoComplete="off"
                    padding={10}
                    margin={5}
                    backgroundColor={'lightblue'}
                  >
                      <Button variant="outlined" onClick={LoadPage}>continue to boligmappa</Button>
                  </Box>
                </GridItem>
            </GridContainer>
        </div>
    )
}
