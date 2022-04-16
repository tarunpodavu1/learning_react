import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }


  return (
    <div className="pageContainer">
      
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>
      
      {/* Form */}
      <main>
        <form onSubmit={onSubmit}>

          {/* Email for reset password mail */}
          <input type="email" className="emailInput" placeholder="Email" 
          id='email' value={email} onChange={onChange}/>

          {/* A SignIn link if we don't have to do this */}
          <Link className="forgotPasswordLink" to='/sign-in'>
            Sign In 
          </Link>

          {/* Button for sending reset password mail */}
          <div className="signInBar">
            <div className="signinText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#fffff" width='34px' height='34px'/> 
            </button>
          </div>

       </form>
      </main>

    </div>
  )
}
export default ForgotPassword