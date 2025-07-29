import { useEffect, useState } from "react";
import "./Product.css";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [userId, setUserId] = useState("");
    const [company, setCompany] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [toaster,setToaster] = useState(false);
    const notify = () => toast("Wow so easy!");
    const params = useParams();

    useEffect(()=>{
      getProductData()
    },[]);


    const getProductData = async () => {
        console.log(params.id);
         let result = await fetch("http://localhost:5000/product/"+params.id);
         result = await result.json();
         console.log(result.result.name);
         setName(result.result.name);
         setPrice(result.result.price);
         setCategory(result.result.category);
         setCompany(result.result.company);
         setUserId(result.result.userId);
    }
    const UpdateTheProduct = (e) => {
        e.preventDefault();
        setShowLoader(true);
        getProductData();
        // getData();
        console.log({ name, price, category, userId, company })
    }
    

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <form onSubmit={UpdateTheProduct} className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Update Product</h2>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        className="input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label
                        htmlFor="name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Product Name
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={price}
                        className="input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <label
                        htmlFor="price"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Price
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={category}
                        className="input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <label
                        htmlFor="category"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Product Category
                    </label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="userId"
                            id="userId"
                            value={userId}
                            className="input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                        <label
                            htmlFor="userId"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            User Id
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="company"
                            id="company"
                            value={company}
                            className="input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                        <label
                            htmlFor="company"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Company Name
                        </label>
                    </div>
                </div>
                {/* <button onClick={notify}>Notify!</button> */}
                {/* <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    onClick={notify}
                >
                    Submit 
                     {showLoader && <div className="spinner-border ml-5" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                </button> */}

                <button
                    type="submit"
                    className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100"
                    onClick={notify}
                >
                    Submit
                    {showLoader && <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                        style={{ width: '1rem', height: '1rem' }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                </button>
                {
                    setToaster ?? <ToastContainer />
                }
            </form>
        </div>
    );
};

export default UpdateProduct;
