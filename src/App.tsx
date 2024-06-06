import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import KnowYourClient from "./pages/KnowYourClient";
import { ContextProvider } from "./contexts/LoginContext";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateProduct from "./pages/CreateProduct";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Verify from "./pages/Verify";
import ProductDetails from "./pages/ProductDetails";
import SingleProduct from "./components/SingleProduct";
import { useUserIp } from "./store/user-store";
import Legal from "./pages/Legal";

function App() {
  const {setIpAddress} = useUserIp.getState()

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setIpAddress(myIPAddress);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, [setIpAddress]);


  return (
    <Router >
      <div className="font-lato">
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/kyc" element={<KnowYourClient />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/home/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard/product/:id" element={<SingleProduct />} />
          </Routes>
        </ContextProvider>
      </div>
    </Router>
    
  );
}

export default App;
