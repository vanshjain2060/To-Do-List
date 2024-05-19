const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));                                                                                                                                                           


mongoose.connect("mongodb+srv://admin-vansh:vanshjain2060@cluster0.ki3p5of.mongodb.net/todolistDB" , {useNewUrlParser : true});

const itemSchema = {
    name : String
}

const Item = mongoose.model("Item" , itemSchema);

// default items which are going to be present in the data base
const item1 = new Item({
    name : "test1"
})
const item2 = new Item({
    name : "test2"
})
const item3 = new Item({
    name : "test3"
})

const defaultItems = [item1, item2, item3];

const listSchema = {
    name : String,
    items : [itemSchema]
}
const List = mongoose.model("List", listSchema);

app.get("/", async function(req, res) {
    try {
      const foundItems = await Item.find({});
      if (foundItems.length === 0) {
        await Item.insertMany(defaultItems);
        console.log("Default items data inserted successfully into the database.");
      }
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    } catch (err) {
      console.error(err);
    }
  });
  

  app.post("/", async function(req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;
  
    const item = new Item({
      name: itemName
    });
  
    try {
      if (listName === "Today") {
        await item.save();
        res.redirect("/");
      } else {
        const foundList = await List.findOne({ name: listName });
        if (foundList) {
          foundList.items.push(item);
          await foundList.save();
          res.redirect("/" + listName);
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
  

  app.post("/delete", async function(req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
  
    try {
      if (listName === "Today") {
        await Item.findByIdAndDelete(checkedItemId);
        console.log("Successfully deleted the item!");
        res.redirect("/");
      } else {
        await List.findOneAndUpdate(
          { name: listName },
          { $pull: { items: { _id: checkedItemId } } }
        );
        res.redirect("/" + listName);
      }
    } catch (err) {
      console.error(err);
    }
  });
  
  

app.get("/about" , function(req, res) {
    res.render("about");
});


// this is the dynamic route which make diffenet Lists using params

app.get("/:topic", async function(req, res) {
    const newList = _.capitalize(req.params.topic);
  
    try {
      const foundList = await List.findOne({ name: newList });
  
      if (!foundList) {
        const list = new List({
          name: newList,
          items: defaultItems
        });
        await list.save();
        res.redirect("/" + newList);
      } else {
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    } catch (err) {
      console.error(err);
    }
  });
  

app.post("/work" , function(req, res) {
    let item = res.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000.");
}); 