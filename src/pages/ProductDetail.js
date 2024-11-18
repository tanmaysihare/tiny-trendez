import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Helmet } from 'react-helmet-async';
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

  const whatsappLink = `https://wa.me/7000917851?text=I'm%20interested%20in%20${product.name}%20(${product.size}).%20MRP:%20₹${product.price}%20Sale%20Price:%20₹${product.discounted_price}`;

  return (
    <Container sx={{ mt: 2 }}>
        <Helmet>
        <title>Tiny Trendez-Product detail  | Boys Ware | Girls fancy dresses | Kids Wear</title>
        <meta name="description" content="Discover our wide range of quality kids wear, boys fancy Kurta sets,t-shirt sets,shirt sets and girls fancy dresses." />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "Kids wear",
            "description": "Discover our wide range of quality kids wear, boys fancy Kurta sets,t-shirt sets,shirt sets and girls fancy dresses.",
            "brand": "Tiny Trends",
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
      {/* Swiper Carousel for images */}
      <Swiper navigation pagination={{ clickable: true }} style={{ width: '100%', height: '400px' }}>
        {product.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`${product.name} ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Typography variant="h3" color="primary">{product.name}</Typography>
      <Typography variant="h6" color="secondary">
        Sale Price: ₹{(product.price * product.discounted_price).toFixed(2)}/- <br />
        MRP: ₹{product.price}/- {product.discount} OFF ,
        
      </Typography>
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>Size {product.size}<br/> Color: {product.color}</Typography>
      <div>
      {product.description.split('\n\n').map((paragraph, index) => (
          <Typography key={index} variant="body1"  color="secondary.secondary" sx={{ mb: 4, mt: 2,textTransform: 'uppercase' }}>
            {paragraph}
          </Typography>
        ))}
      </div>
      {/* <Typography variant="h5" color="secondary.secondary" sx={{ mb: 4, mt: 2,textTransform: 'uppercase' }}>{product.description}</Typography> */}
      <Button
        variant="contained"
        color="success"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mt: 2,mb: 4 }}
      > <WhatsAppIcon sx={{ mr: 2 }} />
        Order on WhatsApp
       
      </Button>
    </Container>
  );
}

export default ProductDetail;
