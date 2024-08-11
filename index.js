import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const titles = [];
const contents = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { titles: titles, contents: contents});
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/about",(req,res)=>{
  res.render("about.ejs")
});

app.post("/view", (req, res) => {
  var view_title = titles[req.body["view"]];
  var view_content = contents[req.body["view"]];
  var index = req.body["view"];
  res.render("view.ejs",{title: view_title, content: view_content, index: index});
});

app.post("/remove", (req, res) => {
  var index = req.body["remove"];
  if (index > -1) {
    titles.splice(index, 1);
    contents.splice(index, 1);
  }
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  var editable_title = titles[req.body["edit"]];
  var editable_content = contents[req.body["edit"]];
  var index = req.body["edit"];
  res.render("edit.ejs",{title: editable_title, content: editable_content, index: index});
});

app.post("/edited",(req,res)=>{
  titles[req.body["edited_index"]] = req.body["editTitle"];
  contents[[req.body["edited_index"]]] = req.body["editContent"];
  res.redirect("/");
});



app.post("/post",(req,res)=>{
  const new_content = req.body["writeContent"];
  const new_title = req.body["writeTitle"];

  titles.push(new_title);
  contents.push(new_content);

  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
