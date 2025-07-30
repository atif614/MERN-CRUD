const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./users/users");
const Product = require("./products/product");
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }

    if (!req.body.name || !req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Missing required fields: name or email' });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res
            .status(400)
            .json({
                error: 'Sorry a user with this email already exists',
            });
    }
    user = new User(req.body);
    console.log(user)
    let result = await user.save();
    console.log(result)
    delete result.password;
    res.json({ result });
})

app.post("/login", async (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Request body is empty' });
    }

    if (!req.body.password || !req.body.email) {
        return res.status(400).json({ error: 'Missing required fields: email or password' });
    }
    let user = await User.findOne(req.body);
    if (user) {
        res.json({ user, });
    }
    else {
        return res.json({ error: 'Invalid Credential' });
    }
})

app.post("/add-product", async (req, res) => {
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
    return res.json({ result, formattedCreatedAt, formattedUpdatedAt });
})

app.get("/getProducts", async (req, res) => {
    const product = await Product.find();
    if (product.length > 0) {
        res.send(product)
    } else {
        res.json({ message: 'No Products Found' })
    }
})

app.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.json({ result })
    }
    else {
        res.json({ message: "No Record Found" });
    }

})
app.put("/update/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.json({ result });
})

app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { colour: { $regex: req.params.key } }
        ]
    });
    res.send({ result });
})

app.listen(5000);











