import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
function WinterCollection({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        // Filter products for the winter collection
        const winterProducts = data.products.filter(product => product.category === 'winter');
        setProducts(winterProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <Grid 
    container 
    spacing={2} 
    sx={{ padding: 2, backgroundColor: '#2196f3' }}
    justifyContent="center"
    >
      <Helmet>
        <title>Tiny Trendez-Winter Collection | Boys Ware | Girls fancy dresses | Kids Wear</title>
        <meta name="description" content="Discover our wide range of quality kids winter wear." />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Kids winter wear",
            "description": "Discover our wide range of quality kids winter wear.",
            "brand": "Tiny Trendez",
            "offers": {
              "@type": "Offer",
              "price": "80% off",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
          `}
        </script>
      </Helmet>
      {products.map(product => (
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
          <Typography variant="body2" color="secondary" sx={{ fontWeight: 'bold' }}>
          Id No :- {product.id} / Size:- {product.size}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
            Sale Price: ₹{(product.price * product.discounted_price).toFixed(2)}/-
          </Typography>
          <Typography variant="body2" color="secondary" sx={{ fontWeight: 'bold' }}>
            MRP: ₹{product.price}/- Flat {product.discount} OFF
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

export default WinterCollection;
