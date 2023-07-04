const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
// var path = require('path');
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

// app.use(express.static(path.join(__dirname, '/')));

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

// var {phno, pkey} = users;

// console.log(users.phno)
// app.get('/', (req, res) => {
//     res.send('Hello World! Haran');
// });

// app.get('/login', (req, res) => {
//     res.sendFile(`/client/src/components/Login.jsx`)
// });


// app.get("/", (req, res) => {
//     res.sendFile(__dirname,"/src/components/Login.jsx")
// })

// app.get("/", (req, res) => {
//     res.render("Login")
// })

app.post('/', async (req, res) => {

    // res.append("Access-Control-Allow-Origin", ["*"]);
    // res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    // res.append("Access-Control-Allow-Headers", "Content-Type");
        // console.log(req.body.phno);
    let result = users.find(user =>
        user.phno == req.body.phno
        // console.log(user);
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

    // const token = jwt.sign(
    //     {
    //       id: result.id,
    //     },
    //     JWT_SECRET
    //   );
    
    //   return res.json({ token });
});

// app.get("/:universalURL", (req, res) => {
//     res.send("404 URL NOT FOUND");
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});