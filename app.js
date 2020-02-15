var express             =require("express"),
    app                 =express(),
    connectDatabase     =require("./config/db"),
    validurl            =require("valid-url"),
    shortid             =require("shortid"),
    config              =require("config"),
    Url                 =require("./models/url")
    bodyParser = require("body-parser");
    var u;

app.use(express.static("public"));
app.use(express.urlencoded());
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
//--------database--------//
connectDatabase();
//------------------------//


//------------------------------------------//
app.get("/",function(req,res)
{
    res.render("home");
});

app.get("/home2",function(req,res)
{
    res.render("home2",{urlcode:u});
});

app.post("/api/url/shorten",async function(req,res)
{
    var longurl=req.body.URL;
var baseurl=config.get("baseURL");

//check base url
if(!validurl.isUri(baseurl))
{
    return res.status(401).json("invalid base url");
}
    

//create url code
var urlcode=shortid.generate();

//check long url

if(validurl.isUri(longurl))
{
    try {
        let url= await Url.findOne({longurl});
        if(url)
        {
            res.json(url);
        }
        else
        {
            var shorturl=baseurl+"/"+urlcode;
            url =new Url({
                longurl,
                shorturl,
                urlcode,
                date:new Date()
            });
            await url.save();
            u=urlcode;
            res.redirect("/home2");
        }
    } catch (error) {
        console.log(err);
        res.status(500).json("server error");
        
    }
}
else{
    res.status(401).json("invalid long url");
}

});

app.get('/:code', async (req, res) => {
    try {
      const url = await Url.findOne({ urlcode: req.params.code });
  
      if (url) {
        return res.redirect(url.longurl);
      } else {
        return res.status(404).json('No url found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  });
//-----------------------------------------//




//-------------hosting--------------//
app.listen(3000,function()
{
    console.log("server has started");
});
//-----------------------------------//