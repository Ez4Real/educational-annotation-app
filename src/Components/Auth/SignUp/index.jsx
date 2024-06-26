import './index.css' 
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../Contexts/AuthContext'
import { signUpUserWithEmailAndPassword, signInWithGoogle } from '../../../config/auth'

const Signup = () => {
  // const { userLoggedIn } = useAuth()
  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [isSigningUp, setIsSigningUp] = useState(false)
  const [error, setError] = useState('')
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    // !!!
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError('Passwords do not match')
      return
    }

    setIsSigningUp(true)
    setError('')
    try {
      await signUpUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      navigate('/', { replace: true })
    } catch (err) {
      console.log(err);
      console.log(err.code);
      console.log(err.message);
      setError(err.message)
      setIsSigningUp(false)
    }
  }

  // if (userLoggedIn) {
  //   return <Navigate to={'/'} replace />
  // }

  return (
    <>
      <div>
        <span>Sign up</span>
        { error && <p>{ error }</p> }
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </div>
          <div>
            <label>Confirm password</label>
            <input type="password" ref={confirmPasswordRef} required />
          </div>
          <button type="submit" disabled={isSigningUp} >Sign up</button>
        </form>
      </div>
    </>
  )
}

export default Signup