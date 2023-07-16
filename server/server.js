const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: true}));
const crypto = require('crypto');


let otpValue = '';
let pkeyValue = '';

var users = [
    {
        phno: '7777877666',
        pkey: '6000'
    },
    {
        phno: '6303366012',
        pkey: '0000'
    }
    
]

app.post('/', async (req, res) => {

    let result = users.find(user =>
        user.phno == req.body.phno
    );
    
    if (result) {
        if (result.pkey == req.body.pkey) {
            res.status(200).send({
                message: "Valid Credentials"
            });
            pkeyValue=result.pkey;
        }
        else {
            res.status(200).send({
                message: "Incorrect Private Key"
            });
        }
    }
    else {
        res.status(200).send({
            message: "User not found"
        });
    }
    console.log(pkeyValue);
});

app.post('/passkey', (req, res) => {
    // const { value } = req.body; // Access the submitted value
    // console.log(value);
    // // Handle the value as needed (e.g., store it in a database, perform calculations, etc.)
    // // ...
  
    // // Send a response back to the client
    // res.json({ message: 'Value received successfully!' });
    // console.log(res.data);

    otpValue = req.body.otp;
    // pkeyValue = req.body.pkey; // Store the OTP value from the request body
  res.status(200).send({ message: 'OTP received successfully' });
  });

  app.get('/passkey', async (req, res) => {
    // try {
    //   // Make an HTTP GET request to fetch the data from an external API or your own server endpoint
    //   const response = await axios.get('http://localhost:4000/passkey');
    //   const data = response.data; // Extract the data from the response
    //   console.log(data);
    //   // Send the data back to the client
    //   res.json(data);
    // //   res.status(200).send(data);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'An error occurred while fetching the data' });
    // }
    // console.log('passkey:',pkeyValue);
    const otpAndPKey = otpValue + pkeyValue; // Combine OTP and PKey as a 10-digit string

     // Generate a secure encryption key of the appropriate length
  const encryptionKey = crypto.randomBytes(32); // 256-bit key length for AES-256

  // Encrypt the OTP and PKey values
  const initializationVector = crypto.randomBytes(16); // Generate a random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, initializationVector);
  let encryptedOtpAndPKey = cipher.update(otpAndPKey, 'utf8', 'hex');
  encryptedOtpAndPKey += cipher.final('hex');

  // Prepare the encrypted OTP and PKey data to be sent
  const encryptedData = {
    // iv: initializationVector.toString('hex'),
    encryptedOtpAndPKey,
  };

  res.json({ passkey: encryptedData });
  });
  

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});