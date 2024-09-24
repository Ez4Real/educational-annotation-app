import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { UserService } from '../services/DatabaseService.ts'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(true);
      if (user) {
        fetchUser(user.uid);
      } else {
        setUserData(null); 
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUser = async (uid) => {
    try {
      const userObject = await UserService.getOneByUid(uid);
      setUserData(userObject);
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    userData,
    setUserData,
    loading,
    fetchUser, 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}