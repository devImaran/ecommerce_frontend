import { Outlet } from "react-router-dom";
import Shop from "../pages/shop/Shop";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Dashboard from "../pages/dashboard/Dashboard";
import Sidebar from "../components/sidebar/Sidebar";
import Product from "../pages/product/Product";
import DashboardPageLayout from "../layout/dashboard/Dashboard";
import Category from "../pages/category/Category";

export default function routes() {
    const Layout = () => {
        return (
            <>
                <Navbar />
                <Outlet />
                <Footer />
            </>
        );
    };

    const DashboardLayout = () => {
        return (
            <DashboardPageLayout sidebar={<Sidebar />}>
                <Outlet />
            </DashboardPageLayout>
        );
    }

    return (
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/shop/:dress_category",
                    element: <Shop />,
                },
            ],
        },
        {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
                {
                    path: '/dashboard/add-products',
                    element: <Product />,
                },
                {
                    path: '/dashboard/add-category',
                    element: <Category />,
                }
            ]
        }
    )

}