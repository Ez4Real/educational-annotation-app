import './index.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { signUpUserWithEmailAndPassword } from '../../../config/auth'
import { UserService } from '../../../services/DatabaseService.ts'
import { UserData } from './index.type.ts'
import { SubmitAction } from '../BaseAuth/index.types.ts'
import BaseAuth from '../BaseAuth/index.tsx'

const Signup: React.FC = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [role, setRole] = useState<string>('student')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')


  const handleUserSignUp: SubmitAction = async (
    email: string,
    password: string,
    userInfo?: UserData
  ) => {
    const userCredential = await signUpUserWithEmailAndPassword(email, password)
    const { uid, email: userEmail } = userCredential.user;

    const data = {
      'uid': uid,
      'email': userEmail,
      'createdAt': Timestamp.now(),
      ...userInfo
    }
    
    await UserService.create(data)
  }

  return (
    <BaseAuth
      title="Get started"
      actionType="signup"
      submitButtonText="Sign up"
      submitAction={
        (email: string, password: string, userInfo?: UserData) =>
        handleUserSignUp(email, password, userInfo)
      }
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
      }
      expandableSignupEl={
        <>
          <div className="role-selection-container">
            <button
              className={`btn w-50 std-btn ${role === 'student' && 'selected'}`}
              onClick={() => setRole('student')}
            >
              Student
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