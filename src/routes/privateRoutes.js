import CheckoutPage from '../pages/checkout/Checkout'
import Order from "../pages/orders/Order";
import RootLayout from "../layout/RootLayout";

export default function PrivateRoutes(){
    return {
        path: "orders",
        element: <RootLayout />,
        children: [
            {
                path: "checkout",
                element: <CheckoutPage />
            },
            {
                path: "my-orders",
                element: <Order />
            },
        ]
    }
}