import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function LoginPage() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
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
        setShowLoader(false)
        if (auth) {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const handleRegister = (e) => {
        e.preventDefault();
        setShowLoader(true);

        setTimeout(async () => {
            if (!email || !password) {
                setError("Please enter both email and password.");
                return;
            }
            else {
                let result = await fetch("http://localhost:5000/register", {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(result);
                let response = await result.json();
                console.log(response.error);
                console.log(result.status);
                if (response.result && response.result.name) {
                    console.log("Inside if")
                    localStorage.setItem("user", JSON.stringify(response));
                    setShowLoader(false);
                    // navigate("/");
                    navigate("/", { state: { message: "Login Successful" } });
                } else if (result.status == 400) {
                    console.log("Inside Else")
                    setShowLoader(false);
                    notify(response.error, "error");
                }
            }
        }, 5000);
    };

    return (
        <div className="flex items-center justify-center mt-14 bg-white overflow-hidden">
            <div className="w-full max-w-sm px-6">
                <div className="flex flex-col items-center">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-10 w-auto"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <form onSubmit={handleRegister} className="mt-6 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                        />
                    </div>

                    {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                    <ToastContainer position="top-right" autoClose={5000} />

                    <button
                        type="submit"
                        className="w-full mt-4 flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        {showLoader && <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                         Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
