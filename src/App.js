// import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom';

import { AuthProvider } from './Contexts/AuthContext';
import Login from './Components/Auth/Login/index.tsx';
import Signup from './Components/Auth/SignUp/index.tsx';
import Main from './Components/Main/index';

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Main />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '*',
      element: <Main />
    }
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
