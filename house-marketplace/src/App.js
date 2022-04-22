import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";


const App = () => {

  return (

    <>
      {/* Routes */}

      <Router>
        <Routes>
          
          <Route path="/" element={<Explore/>}/>
          <Route path="/offers" element={<Offers/>}/>
          <Route path="/category/:categoryName" element={<Category/>}/>

          {/* Private Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            {/* Outlet will use this child route */}
            <Route path="/profile" element={<Profile/>}/>
          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/create-listing" element={<CreateListing />}/>
          <Route path="/edit-listing/:listingId" element={<EditListing />}/>
          <Route path="/category/:categoryName/:listingId" element={<Listing />} />
          <Route path="/contact/:landlordId" element={<Contact />} />

        </Routes>

      {/* NavBar */}

      <Navbar />

      </Router>

      <ToastContainer />
      
    </>
  );
}

export default App;
