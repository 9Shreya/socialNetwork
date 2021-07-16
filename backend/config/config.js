//check env
var env =process.env.NODE_ENV || 'development';
//for peoduction we have to run command ==> PORT=production node index.js
// and by defalut it will use development port index.js is entery point
console.log(env );
//fetch configration data env 
var config= require('./config.json');
var envCnfig=config[env]

console.log(envCnfig+'from config.js');
//configure nodejs api using process.env key value structure
Object.keys(envCnfig).forEach(key=>{
    process.env[key]=envCnfig[key]
    console.log( process.env[key]);
})
