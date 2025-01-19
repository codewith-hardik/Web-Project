const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js")


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then((res) => {
        console.log("Databases is connected...")
    })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// 

// index route

app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        res.render("index.ejs", { chats });
    } catch (err) {
        throw new ExpressError(500, "Some Error");
    }



})

// New route
app.get("/chats/new", asyncWrap((req, res) => {
    // throw new ExpressError(500, "Some Error");
    res.render("new.ejs");

    // next(err);
}));

// Creat route
app.post("/chats", (req, res) => {
    try {
        let { msg, from, to } = req.body;
        const newChat = new Chat({
            from: from,
            msg: msg,
            to: to,
            created_at: new Date()
        });

        newChat.save()
            .then((res) => { console.log("Add chat...") })
            

        res.redirect("/chats");
    } catch (err) {
        // throw new ExpressError(500, "Some Error");
        next(err);
    }


});



// Edit route
app.get("/chats/:id/edit", async (req, res) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", { chat });
    } catch (err) {
        next(err);
    }


});

//Update route
app.put("/chats/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { msg: newMsg } = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(
            id,
            { msg: newMsg },
            { runValidators: true, new: true }
        );
        console.log(updatedChat);
        res.redirect("/chats");
    } catch (err) {
        next(err);
    }


});

// Destroy Route
app.delete("/chats/:id/delete", async (req, res) => {
    try {
        let { id } = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats");
    } catch (err) {
        next(err);
    }


});

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}

// Error Handalar middlware
app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error" } = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("app is runing.....");
});
