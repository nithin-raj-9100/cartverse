import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthRoute from "./pages/AuthRoute";
import App from "./App";

export const routes = [
  {
    path: "/",
    element: <App />,
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
        ],
      },
    ],
  },
];
