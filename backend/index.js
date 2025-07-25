const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./users/users");
const Product = require("./products/product");
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
})

app.post("/add-product",async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
  const formattedCreatedAt = new Date(product.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const formattedUpdatedAt = new Date(product.updatedAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    return res.json({result,formattedCreatedAt,formattedUpdatedAt});
})

app.listen(5000);











