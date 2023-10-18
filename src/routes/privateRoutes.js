import { Outlet } from "react-router-dom";
import Shop from "../pages/shop/Shop";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ProductDetails from "../pages/productDetails/ProductDetails";
import CheckoutPage from '../pages/checkout/Checkout'
import Order from "../pages/orders/Order";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function routes() {
    const authState = useSelector(state.auth)
    const Layout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        );
    };

    const privateRoutes = [
        {
            path: "/orders",
            element: <Layout />,
            children: [
                {
                    path: "/orders/checkout",
                    element: <CheckoutPage />
                },
                {
                    path: "/orders/my-orders",
                    element: <Order />
                },
            ],
        },

    ];

    return (authState.userDetails && authState.userDetails._id) ? privateRoutes : {}

}