const express=require('express');
var router=express.Router();
var ObjectId=require('mongoose').Types.ObjectId
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
var {User}=require('../models/user');
const mongoose = require('mongoose');
//const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

router.post('/register',(req,res,next)=>{
var userData=new User();
console.log(req.body);
   userData.fullName = req.body.fullName;
    userData.email = req.body.email;
    userData.password = req.body.password;

userData.save((err,doc)=>{
    console.log(doc);
 if(!err){
        res.send({status:200,result:doc,message:'SignUp Succesfully'})
    }
    else{ 
    if (err.code == 11000){
  res.status(422).send(['Duplicate email adrress found.']);
    }
    else{
         return next(err);//this is for error validation by nodejs
         //we are calling next()
    }
        console.log('Error' +JSON.stringify(err,undefined,2))}

    console.log(doc);

})
});
 
router.post('/login', (req,res)=>{
    const {email,password}=req.body
    const user = User.findOne({email:req.body.email},function(err,obj) { 
 if (!obj){
   return res.json({status:'error',  message: 'Email is not registered or Password is wrong' })
    }
    console.log(obj.get('password') );
    if( bcrypt.compareSync(req.body.password,obj.get('password'))){
        console.log(obj.get('email'),obj.get('password'),obj.get('_id'));

        const token=jwt.sign({
            id:obj.get('_id'),email:obj.get('email')
        },process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXP})

   return res.json({status:'200',  data: token,id:obj.get('_id') ,message:'Login Succesfully'})
    }
    res.json({status:'error',error:'Email is not registered or Password is wrong'})
})
 })
router.post('/authenticate', (req, res, next) => {
    console.log(res.body,req.body)
    const user = User.findOne({email:req.body.email},function(err,obj) { console.log(obj.get('email')); })
    console.log(user.email);
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) {console.log(err);
            return res.status(400).json(err);}
        // registered user
        else if (user){console.log(user);
            return res.json({status:'200',  data: user.generateJwt(),message:'SignUp Succesfully'})
//  res.status(200).json({ "token": user.generateJwt()
//  });
    } // unknown user or wrong password
        else {console.log(info); 
            return res.status(404).json(info);}
    })(req, res);
})
router.get("/", (req, res) => {
  //   console.log(res);
  User.find((err, docs) => {
    // verifyJwtToken(req,res)
    if (!err) {
      res.send({ status: 200, result: docs });
      console.log(docs);
    } else {
      console.log("Error" + JSON.stringify(err, undefined, 2));
    }
  });
});
//  verifyJwtToken=(req, res, next) => {
//     var token;
//     if ('authorization' in req.headers)
//         token = req.headers['authorization'].split(' ')[1];

//     if (!token)
//         return res.status(403).send({ auth: false, message: 'No token provided.' });
//     else {
//         jwt.verify(token, process.env.JWT_SECRET,
//             (err, decoded) => {
//                 if (err)
//                     return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
//                 else {
//                     req._id = decoded._id;
//                     next();
//                 }
//             }
//         )
//     }
// }

// router.post('/userProfile',verifyJwtToken, (req, res, next) =>{
//     User.findOne({ _id: req.body._id },
//         (err, user) => {
//             console.log(req._id);
//             if (!user)
//                 return res.status(404).json({ status: false, message: 'User record not found.' });
//             else
//                 return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
//         }
//     );
// })

module.exports=router