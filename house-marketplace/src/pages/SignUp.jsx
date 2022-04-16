import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import {db} from '../firebase.config' 
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

  const onSubmit = async (e) => {
    e.preventDefault()

    try{
      const auth = getAuth()
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name
      })

      // Making a data object to store it to DB
      const formDataCopy = {...formData}
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

    
      navigate('/')

    }
    catch(error){
      toast.error('Something went wrong with registration')
    }


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
        <form onSubmit={onSubmit}>

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