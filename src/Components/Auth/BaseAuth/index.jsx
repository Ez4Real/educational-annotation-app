import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { signUpUserWithEmailAndPassword } from '../../../config/auth';
import { getAuthErrorMessage } from '../../../utils/errorHandler.ts';

const BaseAuth = ({ title, actionType, submitAction }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigning(true);
    setError('');

    if (actionType === 'signup' && password !== confirmPassword) {
        setError('Passwords do not match');
        return setIsSigning(false);
    }
    
    try {
      await submitAction(email, password);
      navigate('/', { replace: true })
    } catch (err) {
      setError(getAuthErrorMessage(err.code));
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <>
      <div className={`${actionType}-container`}>
        <div className={`${actionType}-form-container`}>
          <span>{title}</span>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {actionType === 'signup' && (
              <div className="form-group">
                <label>Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  />
              </div>
          )}
          <button type="submit" disabled={isSigning}>
            { title }
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default BaseAuth;