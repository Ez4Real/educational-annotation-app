import './index.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthErrorMessage } from '../../../utils/errorHandler.ts'
import { BaseAuthProps } from './index.types.ts'

const BaseAuth: React.FC<BaseAuthProps> = ({
  actionType, title, switchAuthEl, submitAction,
  confirmPasswordValue, confirmPasswordFormGroup,
  submitButtonText, expandableSignupEl
}) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isSigning, setIsSigning] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSigning(true)
    setError('')

    if (actionType === 'signup' && password !== confirmPasswordValue) {
        setError('Passwords do not match')
        setIsSigning(false)
        return
    }
    
    try {
      await submitAction(email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err.code))
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <>
      <div className='auth-page-container'>
        <div className={`${actionType}-container auth-card-container`}>
          <div className={`${actionType}-form-container auth-form-container `}>
            <div className='auth-card-header'>
              <h1 className='ls-tight h3'>{title}</h1>
              <div className='text-muted'>{switchAuthEl}</div>
            </div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className='row'>
                {expandableSignupEl}
                <div className="form-group">
                  <label className='form-label'>Email</label>
                  <input
                    className='form-control'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={`form-group ${actionType === 'signup' ? 'w-50' : ''}`}>
                  <label className='form-label'>Password</label>
                  <input
                    className='form-control'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {confirmPasswordFormGroup}
                <div className="form-group">
                  <button
                    className='btn submit-btn'
                    type="submit"
                    disabled={isSigning}
                  >
                    { submitButtonText }
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default BaseAuth