const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const crypto = require('crypto');


let otpValue = '';
let pkeyValue = '';
let x = '';

var users = [
    {
        phno: '7777877666',
        pkey: '6000'
    },
    {
        phno: '6303366012',
        pkey: '0000'
    },
    {
        phno: '8328319905',
        pkey: '6069'
    },
    {
        phno: '6302249391',
        pkey: '1234'
    },
    {
        phno: '9398255801',
        pkey: '9398'
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
            pkeyValue = result.pkey;
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

    otpValue = req.body.otp;
    res.status(200).send({ message: 'OTP received successfully' });
});

app.get('/passkey', async (req, res) => {
    const otpAndPKey = otpValue + pkeyValue;

    const encryptionKey = crypto.randomBytes(32);
    const initializationVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, initializationVector);
    let encryptedOtpAndPKey = cipher.update(otpAndPKey, 'utf8', 'hex');
    encryptedOtpAndPKey += cipher.final('hex');

    const encryptedData = {
        iv: initializationVector.toString('hex'),
        encryptedOtpAndPKey,
    };
    x = encryptedData.encryptedOtpAndPKey;
    console.log('x: ', x);
    res.json({ passkey: encryptedData });
});


app.post('/auth', (req, res) => {
    const { encrypt } = req.body;

    const encrypted = x;
    console.log('auth: ', encrypted)

    if (encrypt === encrypted) {
        res.status(200).send({ message: '3-factor Authentication done successfully' });
    } else {
        res.status(200).send({ message: 'Invalid passkey' });
    }
});


app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});