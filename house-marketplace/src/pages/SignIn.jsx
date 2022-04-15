import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const {email, password} = formData
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
            <div className="signInBar">
              <p className="signInText">
                Sign In
              </p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width='34px' height='34px'/>
              </button>
            </div>

        </form>

        {/*TODO Google OAuth */}

        {/* SignUp Link */}
        <Link to='/sign-up' className="registerLink">Sign Up Instead</Link>
        
      </div>
    </>
  )
}
export default SignIn