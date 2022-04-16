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


const App = () => {

  return (

    <>
      {/* Routes */}

      <Router>
        <Routes>
          
          <Route path="/" element={<Explore/>}/>
          <Route path="/offers" element={<Offers/>}/>

          {/* Private Route */}
          <Route path="/profile" element={<PrivateRoute />}>
            {/* Outlet will use this child route */}
            <Route path="/profile" element={<Profile/>}/>
          </Route>

          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>

        </Routes>

      {/* NavBar */}

      <Navbar />

      </Router>

      <ToastContainer />
      
    </>
  );
}

export default App;
