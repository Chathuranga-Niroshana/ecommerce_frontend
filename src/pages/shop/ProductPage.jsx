import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, Breadcrumbs, Link, Rating, TextField } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../app/features/cartSlice';

const ProductPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const product = location.state.product;

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(product.reviews || []);

    const handleAddReview = () => {
        if (review.trim() && rating > 0) {
            const newReview = { review, rating, date: new Date().toLocaleString() };
            setReviews([...reviews, newReview]);
            setReview('');
            setRating(0);
        }
    };

    return (
        <div className="container px-10" style={{ color: '#E0E0E0', minHeight: '100vh' }}>
            {/* Breadcrumbs Section */}
            <Box sx={{ my: 2 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#BDBDBD' }}>
                    <Link color="inherit" href="/" sx={{ color: '#BDBDBD' }}>
                        <HomeIcon />
                    </Link>
                    <Link color="inherit" href="/shop" sx={{ color: '#BDBDBD' }}>
                        Shop
                    </Link>
                    <Typography sx={{ color: '#BDBDBD' }}>{product.name}</Typography>
                </Breadcrumbs>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <div className="flex md:flex-row gap-3 flex-col">
                        <div className="md:w-2/3 flex items-center">
                            <img
                                src={product.image_url[0]}
                                alt=""
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div className="md:w-1/3 flex md:flex-col md:gap-0 gap-3 flex-row justify-between">
                            {product.image_url.slice(1, 5).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-28 h-28 rounded-md"
                                />
                            ))}
                        </div>
                    </div>
                </Grid>

                {/* Right Section: Product Details */}
                <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                    <Card sx={{ backgroundColor: '#33333333', color: '#E0E0E0' }}>
                        <CardContent>
                            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ my: 2, color: '#fff0ff' }}>
                                {product.description}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Typography sx={{ mb: 1, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                                <strong>Display:</strong> {product.specifications.display}
                            </Typography>
                            <Typography sx={{ mb: 1, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                                <strong>Processor:</strong> {product.specifications.processor}
                            </Typography>
                            <Typography sx={{ mb: 1, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                                <strong>Storage:</strong> {product.specifications.storage}
                            </Typography>
                            <Typography sx={{ mb: 1, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                                <strong>RAM:</strong> {product.specifications.ram}
                            </Typography>
                            <Typography sx={{ mb: 1, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                                <strong>Battery:</strong> {product.specifications.battery}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Rating
                                    name="product-rating"
                                    value={product.ratings}
                                    readOnly
                                    size="large"
                                />
                                <Typography sx={{ color: '#E0E0E0' }} variant="body2" color="textSecondary">
                                    {product.reviews.length} Reviews
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => dispatch(addToCart(product))}
                                sx={{ py: 2, bgcolor: 'ButtonFace' }}
                                variant="outlined"
                                color="error"
                                fullWidth
                            >
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Product Features */}
            <Box sx={{ mb: 4, display: 'flex', gap: 10 }}>
                <Typography sx={{ mb: 2, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                    Warranty: {product.warranty}
                </Typography>
                <Typography sx={{ mb: 2, color: '#FFFFFF' }} variant="body2" color="textSecondary">
                    Shipping Details: {product.shipping_details.delivery_time} - ${product.shipping_details.shipping_cost} shipping cost
                </Typography>
            </Box>

            {/* Reviews Section */}
            <Box sx={{ my: 6 }}>
                <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#FFFFFF' }}>
                    Reviews
                </Typography>
                <Grid container spacing={3}>
                    {reviews.map((rev, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card sx={{ backgroundColor: '#ffffff', color: '#E0E0E0' }}>
                                <CardContent>
                                    <Rating name="product-rating" value={rev.rating} readOnly />
                                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                        {rev.review}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                                        {rev.date}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ my: 4, backgroundColor: '#42424233', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF' }}>
                    Add Your Review
                </Typography>
                <Box component="form">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Rating
                                name="user-rating"
                                value={rating}
                                onChange={(e, newValue) => setRating(newValue)}
                                size="large"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Write a review"
                                multiline
                                rows={4}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                variant="outlined"
                                sx={{ backgroundColor: '#DDD33333' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleAddReview}>
                                Submit Review
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
};

export default ProductPage;
