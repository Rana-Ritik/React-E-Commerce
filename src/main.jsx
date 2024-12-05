import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ThemeContext, { ThemeContextProvider } from './Themecontext.jsx'
import { UserContextProvider } from './UserContext.jsx'
import { WishlistContextProvider } from './WishlistContext.jsx'
import { CartContextProvider } from './CartContext.jsx'

// import 'dotenv/config'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeContextProvider>
  <UserContextProvider>
  <BrowserRouter>
   <WishlistContextProvider>
   <CartContextProvider>
      <App></App>
    </CartContextProvider>
   </WishlistContextProvider>
    </BrowserRouter>
  </UserContextProvider>
   </ThemeContextProvider>
  </StrictMode>,
)
