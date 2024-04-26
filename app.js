const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req, res) {
    var today = new Date();
    var currday = today.getDay();

    if(currday === 0 || currday === 1) {
        res.write("<h1>Today is Weekend</h1>");
    }else {
        res.sendFile(__dirname+"/index.html")
    }
    
});


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});