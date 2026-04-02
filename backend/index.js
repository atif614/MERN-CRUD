const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./users/users");
const Product = require("./products/product");
const JWT = require('jsonwebtoken');
const SECRETKEY = 'e-commerce Key';
app.use(express.json());
app.use(cors());
require('dotenv').config();
const fetchUser = require("./middleware/fetchUser");

app.get('/getData',(req,res)=>{
    res.send({message:'My message from an  api'})
})

app.post("/register", async (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }

    if (!req.body.name || !req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Missing required fields: name or email' });
    }
    let result = await User.findOne({ email: req.body.email });
    if (result) {
        return res.status(400).json({ error: 'Sorry a user with this email already exists' });
    }
    result = new User(req.body);
    console.log(result)
    let Myresult = await result.save();
    const token = JWT.sign({ Myresult }, SECRETKEY, { expiresIn: '1h' });
    delete Myresult.password;
    res.json({ Myresult, token });
})

app.post("/login", async (req, res) => {
    const data = req.body;
    // console.log(data)
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }

    if (!req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Missing required fields: email or password' });
    }
    let Myresult = await User.findOne({ email: req.body.email });
        if (Myresult && Myresult.password==req.body.password) {
            const token = JWT.sign({ Myresult }, SECRETKEY, { expiresIn: '1h' });
            console.log(token);
            res.json({ Myresult, token });
        }
        else {
            return res.json({ error: 'Invalid Credential' });
        }
    
})

app.post("/add-product", fetchUser, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    console.log("Result", result);
    console.log(req.user);
    console.log(req.user._id);
    console.log(result._id);
    //  if (result.userId.toString() !== req.user.id) {
    //         return res.status(401).send('Not Allowed');
    // }
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
    return res.json({ result, formattedCreatedAt, formattedUpdatedAt });
})

app.get("/getProducts", fetchUser, async (req, res) => {
    console.log("------->",req.user.Myresult);
    const product = await Product.find({ userId: req.user.Myresult._id });
    if (product.length > 0) {
        res.send(product);
    } else {
        res.json({ message: 'No Products Found' })
    }
})

app.delete("/product/:id", fetchUser, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get("/product/:id", fetchUser, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.json({ result })
    }
    else {
        res.json({ message: "No Record Found" });
    }

})
app.put("/update/:id", fetchUser, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.json({ result });
})

app.get("/search/:key", fetchUser, async (req, res) => {
    console.log(req.user.Myresult._id);
    const userId = req.user.Myresult._id;
    let result = await Product.find({
        userId: userId,
        "$or": [
            { name: { $regex: req.params.key, $options: 'i' } },
            { price: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } },
            { company: { $regex: req.params.key, $options: 'i' } },
            { colour: { $regex: req.params.key, $options: 'i' } }
        ]
    });
    res.send(result);
})

const PORT = process.env.PORT || 3000;

app.listen(8000, () => {
    console.log("Connected to the Server", PORT)
});











