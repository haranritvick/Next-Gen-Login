import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBCard,
  // MDBCardHeader,
  // MDBCardTitle,
  MDBCardBody,
} from "mdb-react-ui-kit";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "./firebase.js";
import axios from "axios";
const mystyle = { padding: "10%" };

function Login() {
  const [data, setData] = useState({
    phno: "",
    pkey: "",
    otp: "",
  });

  const [flag, setFlag] = useState(false);

  const { phno, pkey, otp } = { ...data };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const configureCaptcha = () => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
        defaultCountry: "IN",
      },
      auth
    );
  };

   function onSignInSubmit (e)  {
    e.preventDefault();
    let request = {
      phno,
      pkey,
    };
    axios
      .post("http://localhost:4000/", request)
      .then((resp) => {
        alert(resp.data.message);
        if (resp.data.message === "Valid Credentials") {
          configureCaptcha();
          const phoneNumber = "+91" + phno;
          const appVerifier = window.recaptchaVerifier;
          console.log(phoneNumber);
          const auth = getAuth(app);
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              console.log("OPT has been sent");
              setFlag(true);
              // window.location.replace('/getotp')
              // ...
            })
            .catch((error) => {
              // Error; SMS not sent
              // ...
              console.log("SMS not sent");
            });
        } else {
          console.log("Invalid");
        }
      })
      .catch((err) => alert(err))
      };

  async function onSubmitOtp(e) {
    e.preventDefault();

    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        window.location.replace("/passkey");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("OTP not sent");
      });
  }

  return (
    <div>
      <nav class="navbar navbar-light bg-light ">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Welcome to the portal</span>
        </div>
      </nav>

      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="side-pic"
            />
          </MDBCol>

          <MDBCol col="4" md="6" style={mystyle}>
            <form
              action="/"
              method="POST"
              onSubmit={onSignInSubmit}
              style={{ display: !flag ? "block" : "none" }}
            >
              <div id="sign-in-button"></div>
              <MDBInput
                wrapperClass="mb-4"
                label="Phone Number"
                id="typePhone"
                size="lg"
                type="tel"
                name="phno"
                value={phno}
                pattern="[0-9]{10}"
                required
                placeholder="10-digit mobile number"
                // onSubmit={submitHandler}
                onChange={changeHandler}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Private Key"
                id="formControlLg"
                type="password"
                pattern="[0-9]{4}"
                required
                name="pkey"
                size="lg"
                value={pkey}
                onChange={changeHandler}
              />

              <div className="d-flex justify-content-between align-items-center mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn className="mb-4 w-100" size="lg" type="submit">
                Get Otp
              </MDBBtn>
            </form>

            <MDBCard alignment="center">
              <MDBCardBody>
                <form
                  onSubmit={onSubmitOtp}
                  style={{ display: flag ? "block" : "none" }}
                >
                  <div>
                    <MDBInput
                      label="Enter OTP"
                      name="otp"
                      id="typePassword"
                      type="password"
                      pattern="[0-9]{6}"
                      required
                      value={otp}
                      onChange={changeHandler}
                    />
                  </div>
                  <div style={{ paddingTop: "1%" }}>
                    <MDBBtn type="submit">Submit</MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
