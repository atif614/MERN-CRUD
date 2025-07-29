import { useEffect, useState } from "react";
import "./AddProduct.css";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [colour, setColour] = useState("");
    const [company, setCompany] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [toaster, setToaster] = useState(false);
    const location = useLocation();
    const notify = (message, type = "default") => {
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "info":
                toast.info(message);
                break;
            default:
                toast(message);
        }
    };
    console.log(location)
    useEffect(()=>{
       console.log(location)
    },[])
    // const notify = () => toast("Wow so easy!");
    const addProduct = (e) => {
        e.preventDefault();
        setShowLoader(true);
        getData();
        console.log({ name, price, category, company })
    }
    const getData = async () => {
        setTimeout(async () => {
            let userId = JSON.parse(localStorage.getItem('user'));
            userId = userId.user._id;
            console.log(userId)
            let result = await fetch("http://localhost:5000/add-product", {
                method: 'POST',
                body: JSON.stringify({ name, price, category, colour, company }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            result = await result.json();
            console.log(result);
            if (result) {
                setShowLoader(false);
                setToaster(true);
            }
        }, 3000);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <form onSubmit={addProduct} className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add Product</h2>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
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
                            name="colour"
                            id="colour"
                            className="input block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={(e) => setColour(e.target.value)}
                            required
                        />
                        <label
                            htmlFor="colour"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Colour
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="company"
                            id="company"
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

export default AddProduct;
