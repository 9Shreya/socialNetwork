// require('./config/config');
require("./config/config");
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const { mongoose } = require("./db.js"); //here we have used destructuring syntax so we
// have value in mongoose variable of all db.js file which is exported from db.js
//example for destructuring
var o = { p: 42, q: true };
let { k, w } = o;
let { p, q } = o;
console.log(k, w, p, q); //here we can see we got that value directly by that name

var userController = require("./controllers/userController");
var coustomerController = require("./controllers/coustomerController");

var app = express();
app.use(express.json()); //now we configure express middleware in order to send json
//data to node js project
app.use(cors()); //this will allow any port to call this node api
// to make it specific we have to write
//app.use(cors({origin:'http://localhost:4200'}))
app.use(passport.initialize());

app.listen(process.env.PORT, () => {
  console.log(`server started on port :${process.env.PORT}`);
});
//now to start express server we call function app.listen
// app.use("/employees", employeeControler);
app.use("/api", userController);
app.use("/coustomer", coustomerController);

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
// app.post('/api/login', (req, res) => {
//   // Mock user
//   const user = {
//     id: 1,
//     username: 'brad',
//     email: 'brad@gmail.com'
//   }

//   jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
//     res.json({
//       token
//     });
//   });
// });
