// import React, { useState } from "react";
// import AlertOtp from "./AlertOtp";
// import {
//     MDBCard,
//     MDBCardHeader,
//     MDBCardBody,
//     // MDBCardTitle,
//     // MDBCardText,
//     MDBInput,
//     MDBBtn
// } from 'mdb-react-ui-kit';
// import confirmationResult from '../../../Login'

//     const sty1 = { width: '70%', paddingLeft: '30%', maxWidth: '100%' };

// function Getotp() {

//     const [data, setData] = useState({
//         otp: ''
//     })
//     const { otp } = { ...data };

//     const changeHandler = e => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     }

//     const onSubmitOtp = (e) => {
//         e.preventDefault();
//         const code = otp;
//         console.log(code)
//         confirmationResult.confirm(code).then((result) => {
//             // User signed in successfully.
//             const user = result.user;
//             console.log(JSON.stringify(user))
//             alert("User is verified")
//             // window.location.replace('/passkey')
//             // ...
//         }).catch((error) => {
//             // User couldn't sign in (bad verification code?)
//             // ...
//             console.log('OTP not sent')
//         });
//     }
    


//     return (

//         <div>

//             <AlertOtp />
//             <div style={{ paddingBottom: '5%' }}></div>
//             <div style={sty1}>
//                 <MDBCard alignment='center' >
//                     <MDBCardHeader>Pass Key</MDBCardHeader>
//                     <MDBCardBody>
//                         {/* <MDBCardTitle>Enter your Otp here</MDBCardTitle> */}
//                         <form onSubmit={onSubmitOtp}>
//                             <div >
//                                 <MDBInput
//                                     label='Enter OTP'
//                                     name='otp'
//                                     id='typePassword'
//                                     type='password'
//                                     pattern="[0-9]{6}"
//                                     required
//                                     // style={sty1}
//                                     onChange={changeHandler}
//                                 />
//                             </div>
//                             <div style={{ paddingTop: '1%' }}>
//                                 <MDBBtn type="submit">Submit</MDBBtn>
//                             </div>
//                         </form>
//                     </MDBCardBody>
//                 </MDBCard>
//             </div>

//         </div>
//     );
// }

// export default Getotp;