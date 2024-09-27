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
    <Grid container spacing={2} style={{ marginTop: 1, padding: 20, backgroundColor: '#2196f3' }}>
      {girlsProducts.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia
              component="img"
              height="380"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ m: 1 }}>
                MRP: ₹{product.price} <br />
                After 70% Off: ₹{(product.price * 0.3).toFixed(2)}
              </Typography>
              <Button component={Link} to={`/product/${product.id}`} variant="contained">
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
