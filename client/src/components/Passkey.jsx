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
    // const [receivedData, setReceivedData] = useState('');

    // const [data, setData] = useState(null);
    
    // useEffect(() => {
    //   fetchData();
    // }, []);

    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:4000/passkey'); // Make an HTTP GET request to the server endpoint
    //     console.log('passkey: ', response.data);
    //     setData(response.data); // Set the retrieved data in the component state
    //   } catch (error) {
    //     console.error(error);
    //   }
    
    // const [passkey, setPasskey] = useState('');
  // const [pkey, setPKey] = useState('');
  const [encryptedData, setEncryptedData] = useState({ iv: '', encryptedOtpAndPKey: '' });

  // useEffect(() => {
  //   fetchOtp();
  // }, []);

  // const fetchOtp = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:4000/passkey');
  //     const passkeyValue = response.data.passkey;
  //     // const pkeyValue = response.data.pkey;
  //     setPasskey(passkeyValue);
  //     // setPKey(pkeyValue);
  //     console.log('OTP and PKey retrieved:', passkeyValue);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
                    
                    <MDBBtn href="/">Home</MDBBtn>
                  
                    <MDBBtn href='#'>Copy</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}
export default Passkey;