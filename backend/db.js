const mongoose=require('mongoose');
require('./config/config')
console.log(process.env.MONGODB_URI +'from db');
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false},(err)=>{
    if(!err)
    console.log('MOngoDB connection Done....');
    else
     console.log('Error in db connection :'+ JSON.stringify(err,undefined,2));
})
module.exports=mongoose;