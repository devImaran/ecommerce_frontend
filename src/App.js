
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PublicRoute from './routes/publicRoutes'
import PrivateRoute from './routes/privateRoutes'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userDetails } from './redux/Auth/Actions';

function App() {
  const dispatch = useDispatch()
  const authToken = localStorage.getItem('authToken');

  const router = createBrowserRouter([
    authToken ? PrivateRoute() : {},
    ...PublicRoute(),
  ]);

  useEffect(()=>{ 
    const authToken = localStorage.getItem('authToken');
    if (authToken){
      dispatch(userDetails())
    }
  },[])


  return <RouterProvider router={router} />
}

export default App;
