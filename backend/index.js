const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./users/users");
app.use(express.json());
app.use(cors());

app.post("/register",async(req,res)=>{
     const data = req.body;
     if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }

    if(!req.body.name || !req.body.password || !req.body.email){
        return res.status(400).json({ error: 'Missing required fields: name or email' });
    }
    let user = new User(req.body);
    console.log(req.body);
    let result = await user.save();
    delete result.password;
    console.log(result)
    res.json({result});
})

app.post("/login",async(req,res)=>{
     const data = req.body;
     if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }

    if(!req.body.password || !req.body.email){
        return res.status(400).json({ error: 'Missing required fields: email or password' });
    }
    let user = await User.findOne(req.body);
    console.log(user);
    if(user){
        res.json({user});
    }
    else{
        return res.json({ error: 'No User Found' });
    }
;})

app.listen(5000);