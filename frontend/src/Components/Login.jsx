import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLoader,setShowLoader] = useState(false);

  const navigate = useNavigate();
   const auth = localStorage.getItem("user");
  
      useEffect(() => {
          console.log("Inside")
          if (auth) {
              navigate("/");
          }
          // eslint-disable-next-line
      }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    console.log(showLoader)
    console.log({ email, password });

 setTimeout(async() => {
   if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    else {
      let result = await fetch("http://localhost:5000/login", {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      result = await result.json();
      console.log(result);
      // console.log(result.user.name)
      // if (result.user.name) {
      //     localStorage.setItem("user",JSON.stringify(result));
      //     navigate("/");
      // }
      if (result.user && result.user.name) {
        // alert("Login successful!");
        localStorage.setItem("user",JSON.stringify(result));
        setShowLoader(false);
        navigate("/"); 
      } else {
         setShowLoader(false);
        setError("Invalid email or password.");
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {showLoader &&  <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>}
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Start a 14-day free trial
          </a>
        </p>
      </div>
    </div>
  );
}
