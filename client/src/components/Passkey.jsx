import React from 'react';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,

    MDBBtn
} from 'mdb-react-ui-kit';
import AlertPass from './AlertPass';


function Passkey() {
    return (
        <div>
            <AlertPass />
            <div style={{ paddingTop: '15%' }}>

            </div>
            <MDBCard alignment='center' >
                <MDBCardHeader>Pass Key</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>Your 10-digit Pass Key is </MDBCardTitle>
                    <MDBCardText>**********</MDBCardText>
                    <MDBBtn href='#'>Copy</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Passkey;