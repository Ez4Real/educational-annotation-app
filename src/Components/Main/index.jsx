import './index.css'
import { useAuth } from '../../Contexts/AuthContext'
import { signOutUser } from '../../config/auth.ts'
import { Navigate } from 'react-router-dom'

const Main = () => {
  // const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleLogout = async (e) => {
    e.preventDefault()

    try {
      await signOutUser()
    } catch (err) {
      console.error('Error logging out:', err)
    }
  }

  if (!currentUser) {
    return <Navigate to={'/login'} replace={true} />
  }

  return (
    <div>
      <h2>Welcome {currentUser && currentUser.email}</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Main