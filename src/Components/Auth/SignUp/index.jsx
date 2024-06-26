import './index.css' 
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../../../Contexts/AuthContext'
import { signUpUserWithEmailAndPassword, signInWithGoogle } from '../../../config/auth'
import { getAuthErrorMessage } from '../../../utils/errorHandler.ts'

const Signup = () => {
  // const { userLoggedIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSigningUp, setIsSigningUp] = useState(false)
  const [error, setError] = useState('')
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSigningUp(true)
    setError('')
    try {
      await signUpUserWithEmailAndPassword(email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err.code))
    } finally {
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSigningUp}
          >Sign up</button>
        </form>
      </div>
    </>
  )
}

export default Signup