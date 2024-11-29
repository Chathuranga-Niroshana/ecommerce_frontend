import React from 'react';
import { Rating, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 cursor-pointer text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => navigate(`/shop/${product.id}`, { state: { product } })}
        >
            {/* Product Image */}
            <Box
                component="img"
                src={product.image_url[0]}
                alt={product.name}
                className="w-full h- object-cover rounded-lg mb-4"
            />
            {/* Product Details */}
            <Box>
                <Typography variant="h6" className="truncate font-bold mb-2">
                    {product.name}
                </Typography>
                <Box className="flex items-center gap-2 mb-2">
                    <Rating value={product.ratings} readOnly size="small" />
                    <Typography variant="body2" className="text-gray-400">
                        ({product.ratings})
                    </Typography>
                </Box>
                <Typography variant="h6" className="font-bold text-blue-400">
                    ${product.price}
                </Typography>
            </Box>
        </motion.div>
    );
};

export default ProductCard;
