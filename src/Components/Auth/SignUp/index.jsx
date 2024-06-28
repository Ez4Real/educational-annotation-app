import './index.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUpUserWithEmailAndPassword } from '../../../config/auth'
import BaseAuth from '../BaseAuth'

import { db } from '../../../config/firebase'
import { doc, setDoc } from "firebase/firestore"
import { getTimestampFromString } from '../../../utils/formatters.ts'

const Signup = () => {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('student')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')


  const saveUserToDatabase = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        firstName: firstName,
        lastName: lastName,
        createdAt: getTimestampFromString(user.metadata.createdAt)
      })
    } catch (error) {
      console.error("Error saving user to Firestore: ", error)
    }
  }

  const handleUserSignup = async (email, password) => {
    const userCredential = await signUpUserWithEmailAndPassword(email, password)
    await saveUserToDatabase(userCredential.user)
  }

  return (
    <BaseAuth
      title="Get started"
      actionType="signup"
      submitButtonText="Sign up"
      submitAction={handleUserSignup}
      switchAuthEl={
        <>
          Already have an account?
          <Link to="/login">
            <span className='fw-semibold'> Sign in</span>
          </Link> to your account.
        </>
      }
      confirmPasswordValue={confirmPassword}
      confirmPasswordFormGroup={
      <>
        <div className="form-group w-50">
          <label className='form-label'>Confirm password</label>
          <input
            className="form-control"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </>
      }
      expandableSignupEl={
        <>
          <div className="role-selection-container">
            <button
              className={`btn w-50 std-btn ${role === 'student' && 'selected'}`}
              onClick={() => setRole('student')}
            >
              Learner
            </button>
            <button
              className={`btn w-50 tch-btn ${role === 'teacher' && 'selected'}`}
              onClick={() => setRole('teacher')}
            >
              Teacher
            </button>
          </div>
            <div className="form-group w-50">
              <label className='form-label'>First name</label>
              <input
                className="form-control"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group w-50">
              <label className='form-label'>Last name</label>
              <input
                className="form-control"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
        </>
      }
    />
  )
}

export default Signup


// import './index.css' 
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// // import { useAuth } from '../../../Contexts/AuthContext'
// import { signUpUserWithEmailAndPassword, signInWithGoogle } from '../../../config/auth'
// import { getAuthErrorMessage } from '../../../utils/errorHandler.ts'

// const Signup = () => {
//   // const { userLoggedIn } = useAuth()
//   const navigate = useNavigate()

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')

//   const [isSigningUp, setIsSigningUp] = useState(false)
//   const [error, setError] = useState('')
  
  
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSigningUp(true)
//     setError('')
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }
    
//     try {
//       await signUpUserWithEmailAndPassword(email, password)
//       navigate('/', { replace: true })
//     } catch (err) {
//       setError(getAuthErrorMessage(err.code))
//     } finally {
//       setIsSigningUp(false)
//     }
//   }

//   // if (userLoggedIn) {
//   //   return <Navigate to={'/'} replace />
//   // }

//   return (
//     <>
//       <div className="signup-container">
//         <div className="signup-form-container">
//           <span>Sign up</span>
//           {error && <p className="error">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Confirm password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isSigningUp}
//             >Sign up</button>
//             {/* <button onClick={onGoogleSignIn} disabled={isSigningIn}>Sign in with Google</button> */}
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Signup