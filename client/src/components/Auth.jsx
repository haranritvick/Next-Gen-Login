import React, { useState } from 'react'
import {
  MDBContainer,
  // MDBCol,
  // MDBRow,
  MDBBtn,
  MDBInput,
  // MDBCheckbox,
  MDBCard,
  // MDBCardHeader,
  MDBCardTitle,
  MDBCardBody,
} from "mdb-react-ui-kit";
import axios from "axios";

  const mystyle = { padding: "10%" };
  const tstyle = {paddingBottom: '5%'};


const Auth = () => {

  const [data, setData] = useState({
    encrypt: "",
    message: '',
  });

  const { encrypt } = { ...data };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/auth', { encrypt });
      const { message } = response.data;
      setData({ ...data, message });
      alert(message)
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div>
      <MDBContainer fluid className="p-3 my-5">
        <MDBCard alignment="center">
        {/* <MDBCardHeader></MDBCardHeader> */}
          <MDBCardBody style={mystyle}>
          <MDBCardTitle style={tstyle}>Enter your passkey below</MDBCardTitle>
            <form onSubmit={handleSubmit}>
              <div>
                <MDBInput
                  label="Enter Passkey"
                  name="encrypt"
                  id="typePassword"
                  type="password"
                  required
                  value={encrypt}
                  onChange={changeHandler}
                />
              </div>
              <div style={{ paddingTop: "1%" }}>
                <MDBBtn href='/' > Cancel </MDBBtn>
                <MDBBtn type="submit">Submit</MDBBtn>
              </div>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Auth