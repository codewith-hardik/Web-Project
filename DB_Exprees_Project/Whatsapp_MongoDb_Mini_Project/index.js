const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("Database is connected...");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Index Route
app.get("/chats", asyncWrap(async (req, res, next) => {
    const chats = await Chat.find();
    res.render("index.ejs", { chats });
}));

// New Chat Form
app.get("/chats/new", asyncWrap(async (req, res) => {
    // throw new ExpressError(404,"Pag not found");
    res.render("new.ejs");
}));

// Create Chat
app.post("/chats", asyncWrap(async (req, res, next) => {
    const { msg, from, to } = req.body;
    const newChat = new Chat({
        from,
        msg,
        to,
        created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
}));

// Edit Chat Form
app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
}));

// Update Chat
app.put("/chats/:id", asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const { msg: newMsg } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
}));

// Delete Chat
app.delete("/chats/:id/delete", asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
}));

// Error Handling Wrapper
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}

const handlValidationError = (err)=>{
    console.log("Validation Hardik Error");
    console.error("Good Error")
    console.dir(err.message)
    return err;
}

app.use((err,req,res,next)=>{
    console.log(err.name);

    if(err.name === "ValidationError")  handlValidationError(err)
    next(err);
})

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;
    res.status(status).send(message);
});

// Start the Server
app.listen(8080, () => {
    console.log("App is running on port 8080...");
});


