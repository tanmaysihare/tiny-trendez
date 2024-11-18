import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
function Boys({ addToCart }) {
  const [boysProducts, setBoysProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the data');
        }
        return response.json();
      })
      .then(data => setBoysProducts(data.products.filter(product => product.category === 'boys')))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid 
    container 
    spacing={2} 
    sx={{ padding: 2, backgroundColor: '#2196f3' }}
    justifyContent="center"
  >
    {boysProducts.map(product => (
      <Grid 
        item 
        xs={6} // Full width on extra-small screens
        sm={6}  // Two columns on small screens
        md={4}  // Three columns on medium screens
        key={product.id}
      >
          <Helmet>
        <title>Tiny Trendez-Home Page | Boys Ware | Girls fancy dresses | Kids Wear</title>
        <meta name="description" content="Discover our wide range of quality kids wear, boys fancy Kurta sets,t-shirt sets,shirt sets" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Kids wear",
            "description": "Discover our wide range of quality kids wear, boys fancy Kurta sets,t-shirt sets,shirt sets .",
            "brand": "Tiny Trends",
            "offers": {
              "@type": "Offer",
              "price": "70% off",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
          `}
        </script>
      </Helmet>
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
            <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                Sale Price: ₹{(product.price * product.discounted_price).toFixed(2)}/-
              </Typography>
              <Typography variant="body2" color="secondary" sx={{ fontWeight: 'bold' }}>
                MRP: ₹{product.price} /-
              </Typography>
              <Typography variant="body1" color="secondary">
               {product.discount} OFF
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

export default Boys;
