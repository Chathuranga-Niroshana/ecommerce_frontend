import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useUser } from "../context/UserContext";

const CartItem = ({ item }) => {
    const { addToCart, removeFromCart } = useUser();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
            }}
        >
            {/* Item Details */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img
                    src={item.image_url[0]}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <Box>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        ${item.price} each
                    </Typography>
                </Box>
            </Box>

            {/* Quantity Management */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <IconButton onClick={() => removeFromCart(item.id)}>
                    <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => addToCart(item)}>
                    <Add />
                </IconButton>
            </Box>

            {/* Total Price */}
            <Typography>${item.price * item.quantity}</Typography>
        </Box>
    );
};

export default CartItem;
