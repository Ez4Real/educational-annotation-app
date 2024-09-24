import './index.css';
import React from 'react';
import BaseAuth from '../../Components/Auth/BaseAuth/index.tsx';
import { Link } from 'react-router-dom';
import { signInUserWithEmailAndPassword } from '../../config/auth.ts';

const Login: React.FC = () => {
  return (
    <BaseAuth
      title="Sign in to your account"
      actionType="login"
      submitButtonText="Sign in"
      submitAction={signInUserWithEmailAndPassword}
      switchAuthEl={
        <>
          Don't have an account?{' '}
          <Link to="/signup">
            <span className="fw-semibold">Sign up</span>
          </Link>{' '}
          now.
        </>
      }
    />
  );
};

export default Login;