var mongoose=require("mongoose");

var URLschema=new mongoose.Schema({
    urlcode:String,
    longurl:String,
    shorturl:String,
    Date:{type:String,default:Date.now}
});
module.exports=mongoose.model('URL',URLschema);