const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/" , function(req, res) {
    var today = new Date();
    var currday = today.getDay();
    var daysarr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    var day = daysarr[currday];

    res.render("list", {kindofDay : day});
    
});


app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});