import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthRoute from "./pages/AuthRoute";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Search from "./pages/Search";
import CheckoutPage from "./pages/Checkout";
import CheckoutSuccess from "./pages/checkout-success";
import CheckoutFailure from "./pages/checkout-failure";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import AuthCallback from "./pages/auth/callback";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "products",
            element: <ProductListPage />,
          },
          {
            path: "product/:id",
            element: <ProductPage />,
          },
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "checkout/success",
            element: <CheckoutSuccess />,
          },
          {
            path: "checkout/failure",
            element: <CheckoutFailure />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "search/:category",
            element: <Search />,
          },
          {
            path: "login",
            element: (
              <AuthRoute requireAuth={false}>
                <Login />
              </AuthRoute>
            ),
          },
          {
            path: "signup",
            element: (
              <AuthRoute requireAuth={false}>
                <Signup />
              </AuthRoute>
            ),
          },
          {
            path: "login/*",
            element: (
              <AuthRoute requireAuth={false}>
                <Login />
              </AuthRoute>
            ),
          },
          {
            path: "auth/callback",
            element: <AuthCallback />,
          },
        ],
      },
    ],
  },
];
