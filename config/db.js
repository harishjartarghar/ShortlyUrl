var mongoose=require("mongoose");
var config=require("config");
var db=config.get("mongoURI");

var connectDB=async()=>
{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,useUnifiedTopology: true
        });
        console.log("mongodb connected...");

    } catch (error) {
        console.log(error.message);
        process.exit(1);
        
    }
};

module.exports=connectDB;