import React from "react";
import "./Product.css";

const Product = ()=>{
    return(
        <div className="product">
           <h1>Add Product</h1>
           <input type="text" placeholder="Enter Product Name" />
           {/* <input type="text" placeholder="Enter PRoduct Price" />
           <input type="text" placeholder="Enter PRoduct Cateogory" />
           <input type="text" placeholder="Enter PRoduct Company" /> */}
           <button type="button"> Add Product</button>
        </div>
    )
}

export default Product;