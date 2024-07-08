import './index.css'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext.js'
import { signOutUser } from '../../config/auth.ts'
import { UserService } from '../../services/DatabaseService.ts'
import CircularLoader from '../Loading/index.tsx'
import TeacherPart from '../TeacherPart/index.jsx'
import StudentPart from '../StudentPart/index.jsx'

const Main = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userObject = await UserService.getOneByUid(currentUser.uid);
        setUserData(userObject);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [currentUser]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await signOutUser();
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  if (!currentUser) {
    return <Navigate to='/login' replace={true} />;
  }

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div>
      <span>Welcome {currentUser && currentUser.email}</span>
      <div>U Are a {userData.role}</div>
      <button onClick={handleLogout}>Log Out</button>
      {userData.role === 'teacher' ? <TeacherPart /> : <StudentPart />}
    </div>
  );
};

export default Main;