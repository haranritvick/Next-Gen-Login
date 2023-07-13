const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


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
});


app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});