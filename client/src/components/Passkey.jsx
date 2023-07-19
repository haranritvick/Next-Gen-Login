import React from 'react';
import { useState , useEffect } from 'react';
import AlertPass from './AlertPass';
import axios from 'axios';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn
} from 'mdb-react-ui-kit';


function Passkey() {
  const [encryptedData, setEncryptedData] = useState({ iv: '', encryptedOtpAndPKey: '' });

  function handleCancel(){
    setEncryptedData.encryptedOtpAndPKey=null;
    window.location.replace('/')
  }

  useEffect(() => {
    fetchEncryptedData();
  }, []);

  const fetchEncryptedData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/passkey');
      const encryptedData = response.data.passkey;
      setEncryptedData(encryptedData);
      console.log('Encrypted OTP and PKey retrieved:', encryptedData);
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedData.encryptedOtpAndPKey)
      .then(() => {
        alert("Value copied to clipboard!");
        window.location.replace(`/auth?encryptedData=${encryptedData.iv}`);
      })
      .catch((error) => {
        console.error("Failed to copy value to clipboard:", error);
      });
  };

    return (
        <div>
            <AlertPass />
            <div style={{ paddingTop: '15%' }}>

            </div>
            <MDBCard alignment='center' >
                <MDBCardHeader>Pass Key</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>Your Pass Key is </MDBCardTitle>
                    <MDBCardText>{encryptedData.encryptedOtpAndPKey}</MDBCardText>
                    
                    <MDBBtn onClick={handleCancel}>Cancel</MDBBtn>
                  
                    <MDBBtn onClick={copyToClipboard}>Copy</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}
export default Passkey;