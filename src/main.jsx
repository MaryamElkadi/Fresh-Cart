import { createRoot } from 'react-dom/client'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.jsx'
import "react-image-gallery/styles/css/image-gallery.css";
import { register } from 'swiper/element/bundle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/user.context'
import CartProvider from './context/Cart.context'
import { RouterProvider } from 'react-router-dom'

register();

const myClient = new QueryClient()
const router = App();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={myClient}>
    <UserProvider>
      <CartProvider>
        <RouterProvider 
          router={router} 
          basename="/Fresh-Cart" 
        />
        <ReactQueryDevtools />
        <Toaster />
      </CartProvider>
    </UserProvider>
  </QueryClientProvider>
)