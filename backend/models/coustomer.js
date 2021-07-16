const mongoose = require("mongoose");

var Coustomer = mongoose.model("Coustomer", {
  name: String,
  post: { type: Array, default: { text: "hello",image:['',''] } },
  image: String,
  coustomerId: String,
  followerID:Array
});

module.exports = { Coustomer };
//or it can be writen like this  as well
//module.exports =mongoose.model('emp',Emlpoyee)
