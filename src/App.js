import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { pink } from '@mui/material/colors';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: pink[300],
    },

  },
});

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          {/* Logo on the left */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="https://i.imgur.com/MthySZa.png"
                alt="logo"
                width="40"
                height="40"
                style={{  marginRight: '10px' }}
              />
            </Link>
          <Typography variant="h6" component="div"  sx={{ flexGrow: 1 }}>
            
            Tiny Trendez
          </Typography>

          {/* Home Button */}
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            color="inherit"
          >
            Home
          </Button>

          {/* Cart Button */}
          <IconButton
            component={Link}
            to="/cart"
            edge="end"
            color="inherit"
            aria-label="cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route exact path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
