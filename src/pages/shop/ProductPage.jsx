import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Breadcrumbs,
    Link,
    Rating,
    TextField,
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearAlert } from '../../app/features/cartSlice';
import { useSnackbar } from 'notistack';


const ProductPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const product = location.state.product;
    const { enqueueSnackbar } = useSnackbar();

    const [comment, setComment] = useState('');
    const [rate, setRate] = useState(0);
    const [reviews, setReviews] = useState(product.reviews || []);

    const handleAddReview = () => {
        if (comment.trim() && rate > 0) {
            const newReview = { comment, rate, date: new Date().toLocaleString() };
            setReviews([...reviews, newReview]);
            setComment('');
            setRate(0);
        }
    };

    const alert = useSelector((state) => state.cart.alert);

    useEffect(() => {
        if (alert) {
            enqueueSnackbar(alert.message, { variant: alert.type });
            dispatch(clearAlert());
        }
    }, [alert, enqueueSnackbar, dispatch]);

    const handleClick = () => {
        dispatch(addToCart(product))
    };




    return (
        <Box sx={{ px: { xs: 2, md: 10 }, py: 1, minHeight: '100vh', color: '#E0E0E0' }}>
            {/* Breadcrumbs Section */}
            <Box sx={{ mb: 2 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#BDBDBD' }}>
                    <Link href="/" sx={{ color: '#BDBDBD', display: 'flex', alignItems: 'center' }}>
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Home
                    </Link>
                    <Link href="/shop" sx={{ color: '#BDBDBD' }}>
                        Shop
                    </Link>
                    <Typography sx={{ color: '#BDBDBD' }}>{product.name}</Typography>
                </Breadcrumbs>
            </Box>

            <Grid container spacing={4}>
                {/* Left Section: Images */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                        <Box sx={{ flex: 2 }}>
                            <img
                                src={product.image_url[0]}
                                alt="Main Product"
                                className="w-full h-auto rounded-lg"
                            />
                        </Box>
                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: { xs: 'row', md: 'column' },
                                gap: 2,
                                overflowX: 'auto',
                            }}
                        >
                            {product.image_url.slice(1, 6).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: '75px',
                                        borderRadius: '8px',
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Grid>

                {/* Right Section: Product Details */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ bgcolor: '#333333', color: '#E0E0E0', p: 2 }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" sx={{ my: 2, color: '#FFFFFF99' }}>
                                {product.description}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#FF6347' }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            {['display', 'processor', 'storage', 'ram', 'battery'].map((spec) => (
                                <Typography
                                    key={spec}
                                    variant="body2"
                                    sx={{ color: '#FFFFFF', mb: 1 }}
                                >
                                    <strong>{`${spec.charAt(0).toUpperCase() + spec.slice(1)}:`}</strong>{' '}
                                    {product.specifications[spec]}
                                </Typography>
                            ))}
                            <Box sx={{ mb: 2 }}>
                                <Rating value={product.ratings} readOnly size="large" />
                                <Typography sx={{ color: '#E0E0E0', mt: 1 }} variant="body2">
                                    {product.reviews.length} Reviews
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => handleClick()}
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ py: 1.5 }}
                            >
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Product Features */}
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography sx={{ color: '#FFFFFF' }}>
                    <strong>Warranty:</strong> {product.warranty}
                </Typography>
                <Typography sx={{ color: '#FFFFFF' }}>
                    <strong>Shipping:</strong> {product.shipping_details.delivery_time} - $
                    {product.shipping_details.shipping_cost}
                </Typography>
            </Box>

            {/* Reviews Section */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                    Reviews
                </Typography>
                <Grid container spacing={3}>
                    {reviews.map((rev, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card sx={{ bgcolor: '#424242', color: '#FFFFFF' }}>
                                <CardContent>
                                    <Rating value={rev.rate} readOnly />
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {rev.comment}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#BDBDBD', mt: 1 }}>
                                        {rev.date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Add Review */}
            <Box sx={{ mt: 6, p: 3, bgcolor: '#42424233', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                    Add Your Review
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Rating
                            value={rate}
                            onChange={(e, newValue) => setRate(newValue)}
                            size="large"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Write a review"
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            variant="outlined"
                            sx={{ bgcolor: '#FFFFFF', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddReview}
                            fullWidth
                        >
                            Submit Review
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProductPage;
