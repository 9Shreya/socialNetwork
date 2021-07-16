const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { User } = require("../models/user");
const jwt = require("jsonwebtoken");

var { Coustomer } = require("../models/coustomer");
const { json } = require("body-parser");

const http = require("http");

verifyJwtToken = (req, res) => {
  console.log("hi");
  var token;
  //console.log(req.headers);
  if ("authorization" in req.headers) {
    token = req.headers["authorization"].split(" ")[1];
    console.log(token);

    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const buff = new Buffer(base64, "base64");

      const payloadinit = buff.toString("ascii");
      const payload = JSON.parse(payloadinit);
      console.log(payload);
      // Buffer.from(string);
    } else return null;
  }
  if (!token) {
    // console.log(token);
    return res.send({ auth: false, message: "No token provided." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Token authentication failed." });
      else {
        console.log(decoded.id);
        /////next();
        req.id = decoded.id;
        // next();
      }
    });
  }
};

//==>  localhost:3000/coustomer/
router.get("/", (req, res) => {
  //   console.log(res);
  Coustomer.find((err, docs) => {
    // verifyJwtToken(req,res)
    if (!err) {
      res.send({ status: 200, result: docs });
      console.log(docs);
    } else {
      console.log("Error" + JSON.stringify(err, undefined, 2));
    }
  });
});

//==> localhost:3000/coustomer/id
router.get("/:id", (req, res) => {
  verifyJwtToken(req, res);
  console.log(req.body, req.params.id, "mvbnjhvhjhj");
  if(!ObjectId.isValid(req.params.id))
  {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  

  Coustomer.findOne({ coustomerId: req.params.id },(err,doc) =>
  {
    if (!err) {
      res.send({ status: 200, result: doc });
    } else {
      console.log("error " + JSON.stringify(err, undifined, 2));
      return res.status(400).send("No record with this Id");
    }
  });
}
);
let urlCall = "http://localhost:3000/coustomer";
// router.post('/',(req,res)=>{
// })
// router.get('/',(req,res)=>{
// })

//==> localhost:3000/coustomer
router.post("/", (req, res) => {
  //  verifyJwtToken(req,res)
  console.log(req);
  var coust = new Coustomer({
    name: req.body.name,
    post: [],
    followerID:[],
    image: req.body.image,
    coustomerId: req.body.coustomerId,
  });
  coust.save((err, doc) => {
    if (!err) {
      res.send({ requestLocation: urlCall, status: 200, result: doc });
    } else {
      console.log("Error" + JSON.stringify(err, undefined, 2));
      return res.status(400).send("No record with this Id");
    }

    console.log(doc);
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("No record with this Id");
  }
  var coustomer = {
    name: req.body.name,
    post: req.body.post,
    followerID:req.body.followerID==null?[]:req.body.followerID,
    image: req.body.image,
    coustomerId: req.body.coustomerId,
  };
  Coustomer.findByIdAndUpdate(
    req.params.id,
    { $set: coustomer },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send({ status: 200, result: doc,message:'Data updated succesfully' });
      } else {
        console.log("error " + JSON.stringify(err, undefined, 2));
        return res.status(400).send("No record with this Id");
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  verifyJwtToken(req, res);

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`no record with given id : ${req.params.id} `);
  } else {
    Coustomer.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        return res.send({ status: 200, result: doc });
      } else {
        console.log(
          "Error in Coustomer Delete :" + JSON.stringify(err, undefined, 2)
        );
        return res.status(400).send("No record with this Id");
      }
    });
  }
});

module.exports = router;
