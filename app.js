const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));                                                                                                                                                           

const items = [];
const workItems = [];

app.get("/" , function(req, res) {
    let day = date.getDay();
    res.render("list", {listTitle : day , newListItems : items});
    
});

app.post("/" , function(req, res) {
    let item = req.body.newItem; 

    if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else {
        items.push(item);       
        res.redirect("/");
    }
});


app.get("/about" , function(req, res) {
    res.render("about");
});


app.get("/work" , function(req, res) {
    res.render("list", {listTitle : "Work List" , newListItems : workItems})
});
app.post("/work" , function(req, res) {
    let item = res.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000.");
});