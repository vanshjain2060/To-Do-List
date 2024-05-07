const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));                                                                                                                                                           
let items = [];

app.get("/" , function(req, res) {
    let today = new Date();
    let option = {
        weekday : "long",
        day : "numeric" ,
        month : "long"
    };

    let day = today.toLocaleDateString("en-US", option);

    res.render("list", {kindofDay : day , newListItems : items});
    
});

app.post("/" , function(req, res) {
    let item = req.body.newItem; 
    items.push(item);

    res.redirect("/");
});



app.listen(8000, () => {
    console.log("Server is running on port 8000.");
});