import './index.css' 
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../Contexts/AuthContext'
import { signInUserWithEmailAndPassword, signInWithGoogle } from '../../../config/auth'

const Login = () => {
  // const { userLoggedIn } = useAuth()
  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()

  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError('')
    try {
      await signInUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
      setIsSigningIn(false)
    }
  }

  const onGoogleSignIn = async (e) => {
    e.preventDefault()
    setIsSigningIn(true)
    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message)
      setIsSigningIn(false)
    }
  }

  // if (userLoggedIn) {
  //   return <Navigate to={'/'} replace />
  // }

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <span>Log In</span>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" ref={passwordRef} required />
            </div>
            <button type="submit" disabled={isSigningIn}>Log in</button>
            <button onClick={onGoogleSignIn} disabled={isSigningIn}>Sign in with Google</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login