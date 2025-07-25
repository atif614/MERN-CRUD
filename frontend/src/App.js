import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';

function App() {
  return (
    <div>
      {/* <h1>E-commerce</h1> */}
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent/>}>
            <Route path="/" element={<h1>Product Listing</h1>} />
            <Route path="/add" element={<h1>Add Product Listing</h1>} />
            <Route path="/update" element={<h1>Prwe oduct Listing</h1>} />
            <Route path="/logout" element={<h1>Psroduct Listing</h1>} />
            <Route path="/profile" element={<h1>Prweoduct Listing</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
