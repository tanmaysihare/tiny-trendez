import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Cart = ({ cart, setCart, removeFromCart, updateCartQuantity }) => {

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateCartQuantity(productId, newQuantity);
    }
  };
const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.discounted_price * item.quantity), 0).toFixed(2);
  };
  const generateWhatsAppMessage = () => {
    let message = "I'm interested in the following products:\n\n";
    cart.forEach(item => {
      message += `Product: ${item.name}\nItem Code: ${item.item_code}\nId No: ${item.id}\nSize: ${item.size}\nQuantity: ${item.quantity}\nPrice: ₹${item.price}\nTotal: ₹${((item.price * item.discounted_price) * item.quantity).toFixed(2)}\n\n`;
    });
    message += `Grand Total: ₹${calculateGrandTotal()}\n\n`;
    message += "Please confirm my order.";
    return message;
  };

  const whatsappLink = `https://wa.me/7000917851?text=${encodeURIComponent(generateWhatsAppMessage())}`;

  

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        {cart.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Price: ₹{item.price * item.discounted_price}</Typography>
                <Typography variant="body1">
                  Quantity: 
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    min="1"
                    style={{ width: '50px', marginLeft: '10px' }}
                  />
                </Typography>
                <Typography variant="body1">Total: ₹{((item.price * item.discounted_price) * item.quantity).toFixed(2)}</Typography>
              </Box>
              <IconButton onClick={() => removeFromCart(item.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          Subtotal: ₹{calculateGrandTotal()}
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="contained" color="secondary" sx={{ textAlign: 'center', mr: 1, borderRadius: '10px' }} component={Link} to="/">
          Continue Shopping
        </Button>
        <Button
          variant="contained"
          color="success"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<WhatsAppIcon />}
          sx={{ textAlign: 'center', borderRadius: '10px' }}
        >
          Order on WhatsApp
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
