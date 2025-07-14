import Layout from './components/Layout/Layout'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Authintcation/Login/Login'
import Register from './pages/Authintcation/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
import ForgetPassword from './pages/Authintcation/ForgetPassword/ForgetPassword'
import VerifyCode from './pages/Authintcation/verifyCode/verifyCode'
import ResetPassword from './pages/Authintcation/ResetPassword/ResetPassword'
import Products from './pages/Products/Products'
import Categories from './pages/Categories/Categories'
import CategoryProducts from './pages/CategoryProducts/CategoryProducts'
import Brands from './pages/Brands/Brands'
import BrandProducts from './pages/BrandProducts/BrandProducts'
import Favorites from './pages/Favorites/Favorites'
function App() {
  const routes = createBrowserRouter([
    {
      path: '/', 
      element: <ProtectedRoute><Layout /></ProtectedRoute>, 
      children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <Products/> },
        { path: 'categories', element: <Categories/> },
        { path: 'category/:categoryId', element: <CategoryProducts/> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'allorders', element: <Orders /> },
        { path: 'checkout', element: <Checkout /> },
        {path: 'brands',element: <Brands />},
        {path:'favorites', element: <Favorites/>},
        {path: 'brand/:brandId',element: <BrandProducts />},
        { path: '*', element: <NotFound /> },
      
      ]
    },
    {
      path: 'auth', 
      element: <Layout />, 
      children: [
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verifyCode', element: <VerifyCode /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: 'signup', element: <Register /> },
      ]
    }
  ])

  return routes;
}

export default App