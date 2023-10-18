import { Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";

export default function routes() {
    const userToken = localStorage.getItem('authToken')

    return [
        { path: "/login", element: userToken ? <Navigate to="/home" replace /> : <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/home", element: <Home /> },
        { path: "*", element: <Navigate to="/login" replace /> },
    ];
}