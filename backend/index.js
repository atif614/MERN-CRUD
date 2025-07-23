const express = require("express");
const app = express();

app.get("/",(Req,res)=>{
    res.json("an api")
    console.log("First api");
})

app.listen(5000);