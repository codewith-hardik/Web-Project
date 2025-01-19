const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'friend',
    password: 'Hardik@1'
  });

  let getRandomUser = () => {
    return [
       faker.string.uuid(),
      faker.internet.username(), 
      faker.internet.email(),
      faker.internet.password()      
    ];
  }


// home route
app.get("/",(req,res)=>{
   let q = ` SELECT count(*) from data_100;`;
   try{    
  connection.query(q,(err,result)=>{
    if (err) throw err;
    let count = result[0]["count(*)"];
    res.render("home.ejs",{count});

  });

}catch(err){
    console.log(err);
    res.send("Some Error In DataBases...");
}
});


// show route
app.get("/users",(req,res)=>{
  let q = ` SELECT * FROM data_100;`;
  try{    
    connection.query(q,(err,users)=>{
      if (err) throw err;
      res.render("showUsers.ejs",{users});
  
    });
  
  }catch(err){
      console.log(err);
      res.send("Some Error In DataBases...");
  }

});

// Edit route
app.get("/users/:id/edit",(req,res)=>{
  let { id } = req.params;
  let q = `SELECT * FROM data_100 WHERE id='${id}';`;
  try{    
    connection.query(q,(err,result)=>{
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs",{user});
  
    });
  
  }catch(err){
       console.log(err);
      res.send("Some Error In DataBases...");
  }
});

//  Update route
app.patch("/users/:id",(req,res)=>{
  let { id } = req.params;
  let { password: formPass , username: newUser} = req.body;
  let q = `SELECT * FROM data_100 WHERE id='${id}';`;
  try{    
    connection.query(q,(err,result)=>{
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password){
        res.send(" WRONG PASSWORD !!!... ENTER CORECT PASSWORD");
      }else{
        let q2 = `UPDATE data_100 SET username='${newUser}' where id='${id}';`;
        connection.query(q2, (err,result)=>{
          if(err) throw err;
          res.redirect("/users");
        })
      }  
    });
  
  }catch(err){
       console.log(err);
      res.send("Some Error In DataBases...");
  }
});

// Join / add route
app.get("/users/join",(req,res)=>{
  res.render("join.ejs");
})
app.post("/users/join",(req,res)=>{
  let id = uuidv4();
  let { username,email, password} = req.body;
  let q = `INSERT INTO data_100 (username, email, password, id) VALUES ('${username}', '${email}', '${password}', '${id}');`;
  try{
    connection.query(q, (err, result)=>{
      if(err) throw err;
      res.redirect("/users");
      
    });
  }catch(err){
    console.log(err);
    res.send("Some Error In DataBases...");
  }
});

// DELETE route...
app.get("/users/:id/delete",(req,res)=>{
  let { id } = req.params;
  let q = `SELECT * FROM data_100 WHERE id='${id}';`;
  try{    
    connection.query(q,(err,result)=>{
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs",{user});
  
    });
  
  }catch(err){
       console.log(err);
      res.send("Some Error In DataBases...");
  }
 
})

app.delete("/users/:id/delete",(req,res)=>{
  let { id } = req.params;
  let { password: formPass, email: formEmail} = req.body;
  let q = `SELECT * FROM data_100 WHERE id='${id}';`;
  try{    
    connection.query(q,(err,result)=>{
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password){
        res.send(" WRONG PASSWORD !!!... ENTER CORECT PASSWORD.");
      }else if(formEmail != user.email){
        res.send(" WRONG EMAIL !!!... ENTER CORECT EMAIL.")
      }else{
        let q2 = `DELETE FROM data_100 WHERE id='${id}';`;
        connection.query(q2, (err,result)=>{
          if(err) throw err;
          res.redirect("/users");
        })
      }  
    });
  
  }catch(err){
       console.log(err);
      res.send("Some Error In DataBases...");
  }


});







app.listen("8080",()=>{
  console.log("server is listening to port 8080")
});








  


