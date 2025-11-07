import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Home/Home.jsx';
import AllProducts from './AllProducts/AllProducts.jsx';
import RootLayout from './Layouts/RootLayout.jsx';
import Resister from './Register/Resister.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Login from './Login/Login.jsx';
import MyProducts from './MyProducts/MyProducts.jsx';
import MyBids from './MyBids/MyBids.jsx';
import ProductDetails from './CardDetails/ProductDetails.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import CreateAProduct from './createAProduct/CreateAProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/allProducts',
        Component: AllProducts
      },
      {
        path: '/register',
        Component: Resister
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/myProducts',
        element: <PrivateRoute>
          <MyProducts></MyProducts>
        </PrivateRoute>
      },
      {
        path: '/myBids',
        element: <PrivateRoute>
          <MyBids></MyBids>
        </PrivateRoute>
      },
      {
        path: '/productsDetails/:id',
        loader: ({ params }) => fetch(`https://smart-deals-server-blue.vercel.app/products/${params.id}`),
        element: <PrivateRoute>
          <ProductDetails></ProductDetails>
        </PrivateRoute>
      },
      {
        path: '/createAProduct',
        element: <PrivateRoute>
          <CreateAProduct></CreateAProduct>
        </PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
