import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/productDetails/ProductDetails";
import CheckoutPage from '../pages/checkout/Checkout'
import Order from "../pages/orders/Order";

export default function routes() {
    const userToken = localStorage.getItem('authToken')

    const Layout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        )
    }

    const publicRoutes = [
        {
            path: "/",
            element: <>
                <Navbar />
                <Home />
                <Footer />
            </>
        },
        {
            path: "/shop",
            element: <Layout />,
            children: [
                {
                    path: "/shop/list",
                    element: <Shop />,
                },
                {
                    path: "/shop/product-detail/:productId",
                    element: <ProductDetails />,
                }
            ],
        },
        // { path: "*", element: <Navigate to="/" replace /> }
    ];

    return publicRoutes
}