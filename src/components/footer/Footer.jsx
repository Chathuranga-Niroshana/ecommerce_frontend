import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#1a1a1a', color: '#fff', py: 5 }}>
            <Container maxWidth="lg">
                {/* Footer Logo and Description */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                fontFamily: 'Roboto, sans-serif',
                                letterSpacing: 2,
                            }}
                        >
                            CNJ
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2, color: '#bdbdbd' }}>
                            Your one-stop shop for premium products. Explore a world of quality, innovation, and style.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Quick Links
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#bdbdbd', mb: 1 }}>
                            About Us
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#bdbdbd', mb: 1 }}>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#bdbdbd', mb: 1 }}>
                            FAQs
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#bdbdbd', mb: 1 }}>
                            Privacy Policy
                        </Typography>
                    </Grid>

                    {/* Social Media */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton sx={{ color: '#fff' }} aria-label="Facebook">
                                <Facebook />
                            </IconButton>
                            <IconButton sx={{ color: '#fff' }} aria-label="Twitter">
                                <Twitter />
                            </IconButton>
                            <IconButton sx={{ color: '#fff' }} aria-label="Instagram">
                                <Instagram />
                            </IconButton>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 2, color: '#bdbdbd' }}>
                            Stay connected with us on social media for the latest updates and offers.
                        </Typography>
                    </Grid>
                </Grid>

                {/* Footer Bottom */}
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 4,
                        borderTop: '1px solid #333',
                        pt: 2,
                        color: '#bdbdbd',
                    }}
                >
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} CNJ. All Rights Reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
