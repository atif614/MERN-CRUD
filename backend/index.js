const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./users/users");
app.use(express.json());
app.use(cors());

app.post("/register",async(req,res)=>{
    let user = new User(req.body);
    console.log(req.body);
    let result = await user.save();
    console.log(result)
    res.json({result});
})

app.listen(5000);