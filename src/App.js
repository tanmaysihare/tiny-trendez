import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Boys from './pages/Boys';
import Girls from './pages/Girls';
import WinterCollection from './pages/WinterCollection';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BottomNavigation, BottomNavigationAction, IconButton, Badge } from '@mui/material';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
import HomeIcon from '@mui/icons-material/Home';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src="https://i.imgur.com/MthySZa.png"
              alt="logo"
              width="40"
              height="40"
              style={{  marginBottom: '10px', paddingBottom: '10px',paddingTop: '10px',borderRadius: '30%', alignContent: 'center', justifyContent: 'center' }} 
            />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: {
                xs: '2rem',
                sm: '1.25rem',
                md: '1.5rem',
                lg: '2rem',
              },
              textAlign: 'center',
              textJustifyContent: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              marginBottom: '10px',
              fontFamily: 'cursive,Brush Script MT',
            }}
          >
            Tiny Trendez
          </Typography>
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            aria-label="cart"
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route exact path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/boys" element={<Boys addToCart={addToCart} />} />
        <Route path="/girls" element={<Girls addToCart={addToCart} />} />
        <Route path="/winter-collection" element={<WinterCollection addToCart={addToCart} />} />
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
      <BottomNavigation showLabels sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Boys"
          icon={<BoyIcon />}
          component={Link}
          to="/boys"
        />
        <BottomNavigationAction
          label="Girls"
          icon={<GirlIcon />}
          component={Link}
          to="/girls"
        />
        <BottomNavigationAction
          label="Winter"
          icon={<AcUnitIcon />}
          component={Link}
          to="/winter-collection"
        />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default App;
