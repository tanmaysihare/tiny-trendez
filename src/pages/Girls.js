import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Girls({ addToCart }) {
  const [girlsProducts, setGirlsProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the data');
        }
        return response.json();
      })
      .then(data => setGirlsProducts(data.products.filter(product => product.category === 'girls')))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ padding: 2, backgroundColor: '#2196f3' }}
      justifyContent="center"
    >
      {girlsProducts.map(product => (
        <Grid 
          item 
          xs={6} // Full width on extra-small screens
          sm={6}  // Two columns on small screens
          md={4}  // Three columns on medium screens
          key={product.id}
        >
          <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardMedia
              component="img"
              height="180"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="secondary">
                MRP: ₹{product.price} <br />
                After {product.discount}Discount Sale Price: ₹{(product.price * product.discounted_price).toFixed(2)}
              </Typography>
              <Button 
                component={Link} 
                to={`/product/${product.id}`} 
                variant="contained" 
                color="primary"
                sx={{ mt: 1 }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Girls;
