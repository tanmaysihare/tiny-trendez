import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';

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
    <Container sx={{ mt: 2 }} >
      <Typography variant="h3" color='primary'>{product.name}</Typography>
      <Typography variant="h6" color='secondary'>Mrp: {product.price} /- , color : {product.color}</Typography>
      <Typography variant='h6' color='secondary'>for {product.size}</Typography>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%' }} />
      <Typography variant='h4' color='secondary' sx={{ mb: 4 }}>{product.description}</Typography>
     {/*<Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => addToCart(product)}>Add to cart</Button>*/}
    </Container>
  );
}

export default ProductDetail;
