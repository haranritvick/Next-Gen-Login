import React from 'react';
import { useState , useEffect } from 'react';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';
import AlertPass from './AlertPass';
import axios from 'axios';


function Passkey() {
    const [receivedData, setReceivedData] = useState('');

    return (
        <div>
            <AlertPass />
            <div style={{ paddingTop: '15%' }}>

            </div>
            <MDBCard alignment='center' >
                <MDBCardHeader>Pass Key</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>Your 10-digit Pass Key is </MDBCardTitle>
                    <MDBCardText>{receivedData}</MDBCardText>
                    
                    <MDBBtn href="/">Home</MDBBtn>
                  
                    <MDBBtn href='#'>Copy</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}
export default Passkey;