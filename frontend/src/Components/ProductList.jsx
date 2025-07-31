import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProductList = () => {
    const [data, setData] = useState([]);
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

    useEffect(() => {
        getData();
        if (location.state && location.state?.message) {
            toast.success(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    async function getData() {
        let result = await fetch("http://localhost:5000/getProducts", {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        console.log(result)
        setData(result);

    }
    async function deleteProduct(id) {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });

        if (result.status == 200) {
            getData();
        }
    }
    async function SearchHandler(event) {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
            });
            result = await result.json();
            console.log(result);
            if (result) {
                setData(result);
            }
        }
        else {
            getData();
        }

    }
    console.log(data)
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <ToastContainer />
            <div className="pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative mt-3 ml-5">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokelinecap-="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="table-search" className="block pt-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" onChange={SearchHandler} />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th> */}
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Company
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Colour
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ? data.map((product, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {product.name}
                                    </th>
                                    <td className="px-6 py-4">{product.company}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">{product.colour}</td>
                                    <td className="px-6 py-4">{product.price}</td>
                                    <td className="px-6 py-4">
                                        {/* <a
                                            onClick={()=>deleteProduct(product._id)}
                                            className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Delete */}
                                        {/* <a> */}
                                        <button type="button" onClick={() => deleteProduct(product._id)} className="btn btn-success">Delete</button>
                                        <Link to={"/update/" + product._id}> <button type="button" className="ml-4 btn btn-secondary">Update</button></Link>
                                        {/* </a> */}
                                    </td>
                                </tr>
                            );
                        })  :  <>No Products to Display</>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;