import React from "react";
import CartItem from "../../components/CartItem";
import { Box, Typography, Button } from "@mui/material";
import { useUser } from '../../context/UserContext';


const Cart = () => {
    const { getCart, getTotal, clearCart } = useUser();
    const cartItems = getCart();

    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                    <Box sx={{ textAlign: "right", marginTop: "20px" }}>
                        <Typography variant="h6">Total: ${getTotal()}</Typography>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: "10px" }}
                            onClick={clearCart}
                        >
                            Clear Cart
                        </Button>
                    </Box>
                </>
            ) : (
                <Typography variant="h6">Your cart is empty!</Typography>
            )}
        </Box>
    );
};

export default Cart;
