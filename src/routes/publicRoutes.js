import { Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import ProductDetails from "../pages/productDetails/ProductDetails";
import RootLayout from "../layout/RootLayout";

export default function routes() {

    return  [
        {
            path: "/",
            element: <RootLayout/>,
            children:[
                {
                    index: true,
                    element:  <Home />
                }
            ]
        },
        {
            path: "/shop",
            element: <RootLayout />,
            children: [
                {
                    path: "list",
                    element: <Shop />,
                },
                {
                    path: "product-detail/:productId",
                    element: <ProductDetails />,
                }
            ],
        },
        { path: "*", element: <Navigate to="/" replace /> }
    ];
}