const express = require("express");
const app = express();
require("./db/config");
const User = require("./users/users");
app.use(express.json());

app.post("/register",async(req,res)=>{
    let user = new User(req.body);
    console.log(req.body);
    let result = await user.save();
    console.log(result)
    res.json({result});
})

app.listen(5000);