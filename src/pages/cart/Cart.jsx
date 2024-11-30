import React from "react";
import CartItem from "../../components/CartItem";
import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectTotal, clearCart } from "../../app/features/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const total = useSelector(selectTotal);

    return (
        <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto", minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            {cart.length > 0 ? (
                <>
                    {cart.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                    <Box sx={{ textAlign: "right", marginTop: "20px" }}>
                        <Typography variant="h6">Total: ${total}</Typography>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: "10px" }}
                            onClick={() => dispatch(clearCart())}
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
