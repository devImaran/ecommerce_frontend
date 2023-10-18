
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import PrivateRoute from './routes/private_routes'
import PublicRoute from './routes/publicRoutes'
import PrivateRoute from './routes/privateRoutes'
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { userDetails } from './redux/Auth/Actions';

function App() {
  const dispatch = useDispatch()
  const authToken = localStorage.getItem('authToken');
  const authState = useSelector(state=>state.auth)
  
  // const router = createBrowserRouter(
  //   PublicRoute(),
  //    PrivateRoute()
  // //   [
  // //   (authToken && authState.userDetails && authState.userDetails) ? {...PrivateRoute()[0]} : {},
  // //   ...PrivateRoute(),
  // //   ...PublicRoute(),
  // // ]
  // );

  const router = createBrowserRouter([
    ...PrivateRoute(),
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
