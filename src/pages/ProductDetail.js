import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography, Container, Button, Box, Grid, Paper, Divider } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { Helmet } from 'react-helmet-async';
import 'react-medium-image-zoom/dist/styles.css';
import Zoom from 'react-medium-image-zoom';
// Initialize Swiper modules
SwiperCore.use([Navigation, Pagination]);

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => {
        const productData = data.products.find(p => p.id === parseInt(id));
        setProduct(productData);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4  }}>
      <Helmet>
        <title>Tiny Trendez-Product detail | Boys Ware | Girls fancy dresses | Kids Wear</title>
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
              "price": "80% off",
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            }
          }
          `}
        </script>
      </Helmet>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* Swiper Carousel for images */}
          <Swiper navigation pagination={{ clickable: true }} style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
            {product.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <Zoom>
                  <img src={url} alt={`${product.name} ${index}`} style={{ width: '100%', height: '100%', objectPosition: 'center', objectFit: 'contain' }} />
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item xs={12} md={6} >
          <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px',backgroundColor: '#f5f5f5' }}>
            <Typography variant="h3" color="primary" gutterBottom>{product.name}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" color="secondary" gutterBottom>
              Sale Price: ₹{(product.price * product.discounted_price).toFixed(2)}/- <br />
              MRP: ₹{product.price}/- {product.discount} OFF
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              Id No:- {product.id}<br/> Size: {product.size}<br/> Color: {product.color}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {product.description.split('\n\n').map((paragraph, index) => (
                <Typography key={index} variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                  {paragraph}
                </Typography>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetail;
