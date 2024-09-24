import './App.css';
import { Navigate, useRoutes } from 'react-router-dom';

import { AuthProvider } from './Contexts/AuthContext';
import Login from './Pages/Login/index.tsx';
import Signup from './Pages/SignUp/index.tsx';
import TeacherPage from './Pages/TeacherPage/index.jsx';
import StudentPage from './Pages/StudentPage/index.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import RoleBasedRedirect from './Routes/RoleBasedRoute.jsx';
import TeacherGrades from './Pages/StudentsGrades/index.jsx';

const App = () => {
  const routes = [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/',
      element: <RoleBasedRedirect />,
    },
    {
      path: '/t',
      element: <ProtectedRoute allowedRoles={['teacher']} />,
      children: [
        {index: true, element: (<TeacherPage />)},
        {path: 'gradebook', element: (<TeacherGrades />)},
      ],
    },
    {
      path: '/s',
      element: <ProtectedRoute allowedRoles={['student']} />,
      children: [
        {index: true, element: (<StudentPage />)},
      ],
    },
    
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]

  const routesElement = useRoutes(routes);

  return (
    <AuthProvider>
      <div className='container'>
        { routesElement }
      </div>
    </AuthProvider>
  );
};

export default App;