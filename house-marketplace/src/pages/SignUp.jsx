import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password:''
  })

  const {name, email, password} = formData
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    })) 
  }

  return (
    <> 
      <div className="pageContainer">

        <header>
          <p className="pageHeader">
            Welcome Back
          </p>
        </header>

        {/* Form */}
        <form>

            {/* Name */}
            <input type="text" id="name" className="nameInput"
            value={name} placeholder='Name' onChange={onChange}/>

            {/* Email */}
            <input type="email" id="email" className="emailInput"
            value={email} placeholder='Email' onChange={onChange}/>

            {/* Password */}
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} 
              className='passwordInput' placeholder="Password"
              id='password' value={password} onChange={onChange}/>

              <img src={visibilityIcon} alt="show password"
              className="showPassword" 
              onClick={() => setShowPassword((prevState) => !prevState)}/>
            </div>

            {/* Forgot Password */}
            <Link to='/forgot-password' className="forgotPasswordLink">
              Forgot Password
            </Link>

            {/* Sign In Button or Arrow */}
            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffffff" width='34px' height='34px'/>
              </button>
            </div>

        </form>

        {/*TODO Google OAuth */}

        {/* SignUp Link */}
        <Link to='/sign-in' className="registerLink">Sign In Instead</Link>
        
      </div>
    </>
  )
}
export default SignUp