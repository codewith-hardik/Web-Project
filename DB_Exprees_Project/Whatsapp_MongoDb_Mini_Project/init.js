const mongoose = require("mongoose");
const Chat = require("./models/chats.js")
main()
.then((res)=>{
    console.log("Databases is connected...")
})
.catch(err => console.log(err));
    async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); 
}

const allChats = [
    {
        from: "Kashyap",
        to: "Hardik",
        msg: "You come to my sister's weding....",
        created_at: new Date()
    },
    {
        from: "Vinod sir",
        to: "All Student ",
        msg: "Fill the form before 28/11/2024 , 4:00 PM",
        created_at: new Date()
    },
    {
        from: "Hardik",
        to: "Anil Kaka",
        msg: "Give me Aadhar OTP fast...",
        created_at: new Date()
    },
    {
        from: "Vivek",
        to: "Hardik",
        msg: "Congratulations for buy I-Phone 16tn Pro+....",
        created_at: new Date()
    },
    {
        from: "Kashyap",
        to: "Prince",
        msg: "Please Send 899 rupee for your Jio recharg on this QR. ",
        created_at: new Date()
    },
    {
        from: "Karan",
        to: "Hardik",
        msg: "Send your uncle's phone Number as soon as posible....",
        created_at: new Date()
    },
    {
        from: "Hardik",
        to: "Shreeji Xerox",
        msg: "Please, print 2 copis of this document",
        created_at: new Date()
    },
    {
        from: "Hardik",
        to: "All Contect",
        msg: "Happy New Year to all...",
        created_at: new Date()
    },
    {
        from: "Pankaj bhai",
        to: "Hardik",
        msg: "Come to Youva Kendra at 9:00 PM ...",
        created_at: new Date()
    },  {
        from: "Dharmik",
        to: "Hardik",
        msg: "Do you complet GTU Enrollment Registration Process...",
        created_at: new Date()
    },

];

Chat.insertMany(allChats);


