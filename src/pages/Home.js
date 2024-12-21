import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the data');
        }
        return response.json();
      })
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Tiny Trendez-Home Page | Boys Ware | Girls fancy dresses | Kids Wear</title>
        <meta name="description" content="Discover our wide range of quality kids wear, boys fancy Kurta sets,t-shirt sets,shirt sets and girls fancy dresses." />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Kids wear",
            "description": "Discover our wide range of quality kids wear, boys fancy Kurta sets,t-shirt sets,shirt sets and girls fancy dresses.",
            "brand": "Tiny Trendez",
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
      <Box
        sx={{
          height: '50vh',
          backgroundColor: 'primary.main',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: 2
        }}
      >
        <Box >
          <Typography variant="h2" component="h1" gutterBottom >
            Welcome to Tiny Trendez
          </Typography>
          <Typography variant="h5" component="p" gutterBottom >
            Discover our wide range of quality kids wear
          </Typography>
        
        </Box>
      </Box>
      <Grid 
        container 
        spacing={2} 
        sx={{ padding: 2, backgroundColor: 'secondary.main' }}
        justifyContent="center"
      >
        {products.map(product => (
          <Grid 
            item 
            xs={12} // Full width on extra-small screens
            sm={6}  // Two columns on small screens
            md={4}  // Three columns on medium screens
            key={product.id}
          >
            <Card 
              sx={{ 
                maxWidth: 345, 
                margin: 'auto', 
                boxShadow: 3, 
                transition: 'transform 0.3s', 
                border: '1px solid #e0e0e0',
                '&:hover': { transform: 'scale(1.05)' },
                '@media (max-width: 600px)': {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 1
                }
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={product.imageUrl}
                alt={product.name}
                sx={{
                  width: '100%', 
                  height: 'auto',
                  '@media (max-width: 600px)': {
                    width: '40%',
                    height: 'auto'
                  }
                }}
              />
              <CardContent
                sx={{
                  '@media (max-width: 600px)': {
                    width: '60%',
                    padding: 1
                  }
                }}
              >
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
    </>
  );
}

export default Home;
