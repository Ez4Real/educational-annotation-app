import './index.css';
import { signInUserWithEmailAndPassword } from '../../../config/auth'
import BaseAuth from '../BaseAuth'

const Login = () => {

  return (
    <BaseAuth
      title="Log in"
      actionType="login"
      submitAction={signInUserWithEmailAndPassword}
    />
  );
};

export default Login;



// import './index.css' 
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// // import { useAuth } from '../../../Contexts/AuthContext'
// import { signInUserWithEmailAndPassword, signInWithGoogle } from '../../../config/auth'
// import { getAuthErrorMessage } from '../../../utils/errorHandler.ts'

// const Login = () => {
//   // const { userLoggedIn } = useAuth()
//   const navigate = useNavigate()

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const [isSigningIn, setIsSigningIn] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     setIsSigningIn(true)
//     setError('')
//     try {
//       await signInUserWithEmailAndPassword(email, password)
//       navigate('/', { replace: true })
//     } catch (err) {
//       setError(getAuthErrorMessage(err.code))
//     } finally {
//       setIsSigningIn(false)
//     }
//   }

//   // const onGoogleSignIn = async (e) => {
//   //   e.preventDefault()
//   //   setIsSigningIn(true)
//   //   setError('')
//   //   try {
//   //     await signInWithGoogle()
//   //   } catch (err) {
//   //     setError(err.message)
//   //     setIsSigningIn(false)
//   //   }
//   // }

//   // if (userLoggedIn) {
//   //   return <Navigate to={'/'} replace />
//   // }

//   return (
//     <>
//       <div className="login-container">
//         <div className="login-form-container">
//           <span>Log In</span>
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
//             <button
//               type="submit"
//               disabled={isSigningIn}
//             >Log in</button>
//             {/* <button onClick={onGoogleSignIn} disabled={isSigningIn}>Sign in with Google</button> */}
//           </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Login