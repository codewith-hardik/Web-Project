const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

app.listen(port,()=>{
    console.log("server start");
})

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "hardikchavda",
        content : " I Love Coding"
    },  {
        id : uuidv4(),
        username: "ankit11112008",
        content : " I Love Engineering"
    },  {
        id : uuidv4(),
        username: "prin6u2006",
        content : " I Love Lern New things...."
    },  {
        id : uuidv4(),
        username: "kk2007",
        content : " I Love A.I."
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts });

});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
   let id = uuidv4();
    let { username, content} = req.body;
    posts.push({ id, username, content})
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let { id } =  req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{ post })
})

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    // console.log(id);
    let ncontent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = ncontent;
    // console.log(post)
    res.redirect("/posts")
})

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=> id != p.id);

    res.redirect("/posts")
})


app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})








