import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/features/cartSlice";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    width: { xs: "100%", sm: "auto" },
                    marginBottom: { xs: "10px", sm: "0" },
                }}
            >
                <img
                    src={item.image_url[0]}
                    alt={item.name}
                    style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                    }}
                />
                <Box>
                    <Typography variant="subtitle1" noWrap>
                        {item.name}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontSize: { xs: "12px", sm: "14px" },
                            color: '#efefef'
                        }}
                    >
                        ${item.price.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: { xs: "space-between", sm: "flex-start" },
                }}
            >
                <IconButton
                    onClick={() => dispatch(removeFromCart(item.id))}
                    size="small"
                >
                    <Remove sx={{ color: '#dedede' }} />
                </IconButton>
                <Typography
                    sx={{
                        fontSize: { xs: "14px", sm: "16px" },
                        textAlign: "center",
                    }}
                >
                    {item.quantity}
                </Typography>
                <IconButton
                    onClick={() => dispatch(addToCart(item))}
                    size="small"
                >
                    <Add sx={{ color: '#dedede' }} />
                </IconButton>
            </Box>

            <Typography
                sx={{
                    fontSize: { xs: "14px", sm: "16px" },
                    textAlign: "right",
                    width: { xs: "100%", sm: "auto" },
                    marginTop: { xs: "10px", sm: "0" },
                }}
            >
                ${(item.price * item.quantity).toFixed(2)}
            </Typography>
        </Box>
    );
};

export default CartItem;
