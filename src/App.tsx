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
import NewLandingPage from "./pages/NewLandingPage";
import SuccessPage from "./components/SuccessPage";
import FinalLandingPage from "./pages/FiinalLandingPage";
import FinalHeroSection from "./pages/FinalHeroSection";
import MarketPlacePage from "./pages/MarketPlacePage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQsPage from "./pages/FAQsPage";
import FinalLoginPage from "./pages/FinalLoginPage";
import FinalOtpPage from "./pages/FinalOtpPage";
import CreatePassword from "./pages/CreatePassword";
import CompleteProfile from "./pages/CompleteProfile";
import MerchantDashboard from "./components/MerchantDashboard";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import OuterApp from "./components/OuterApp";
import ProductComponent from "./pages/ProductComponent";
import Product from "./pages/Product";

function App() {
  const {setIpAddress} = useUserIp.getState()

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const myIPAddress = data.ip;
        setIpAddress(myIPAddress);
        console.log("my ip: ", myIPAddress)
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
            <Route path="/" element={<FinalLandingPage />} />
            <Route path="/payment/success" element={<SuccessPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/marketplace" element={<MarketPlacePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/vendor" element={<FinalLandingPage />} />
            <Route path="/rider" element={<FinalLandingPage />} />
            <Route path="/login" element={<FinalLoginPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/kyc" element={<KnowYourClient />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<CreatePassword />} />
            <Route path="/app" element={<OuterApp />}>
            <Route path="/app/dashboard" element={<MerchantDashboard />}>
              <Route index path="/app/dashboard/profile" element={<Profile />} />
              <Route index path="/app/dashboard/wallet" element={<Wallet />} />
              <Route index path="/app/dashboard/setting" element={<Settings />} />
            </Route>
            <Route path="/app/product" element={<Product />}>
            </Route>
            </Route>
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
