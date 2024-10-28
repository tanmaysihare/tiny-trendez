import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Boys from './pages/Boys';
import Girls from './pages/Girls';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
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
      secondary: pink[600],
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
                style={{  marginBottom: '10px',marginRight: '10px', paddingBottom: '10px',paddingTop: '10px',borderRadius: '30%', alignContent: 'center', justifyContent: 'center' }} 
              />
            </Link>
            <Typography
  variant="h6"  // Default variant
  component="div"
  sx={{
    flexGrow: 1,
    fontSize: {
      xs: '1rem',  // Extra-small screens (mobile)
      sm: '1.25rem',  // Small screens (tablet)
      md: '1.5rem',  // Medium screens (small laptop)
      lg: '2rem',  // Large screens (desktop)
    },
  }}
>
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

          {/* Boys Button */}
          <Button
            component={Link}
            to="/boys"
            startIcon={<BoyIcon />}
            color="inherit"
          >
            Boys
          </Button>

          {/* Girls Button */}
          <Button
            component={Link}
            to="/girls"
            startIcon={<GirlIcon />}
            color="inherit"
          >
            Girls
          </Button>

          {/* Cart Button */}
          {/* <IconButton
            component={Link}
            to="/cart"
            edge="end"
            color="inherit"
            aria-label="cart"
          >
            <ShoppingCartIcon /> 
          </IconButton>*/}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route exact path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/boys" element={<Boys addToCart={addToCart} />} />
        <Route path="/girls" element={<Girls addToCart={addToCart} />} />
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
