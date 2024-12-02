import { createSlice } from "@reduxjs/toolkit"

const LOCAL_STORAGE_CART_KEY = "cartItems"

const initialState = {
    isLoggedIn: !!localStorage.getItem("token"),
    cart: JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [],
    alert: null,
}

const updateLocalStorage = (cart) => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart))
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = null
        },
        addToCart: (state, action) => {
            const product = action.payload
            if (!state.isLoggedIn) {
                state.alert = { type: "error", message: "You must be logged in to add products to your cart" }
                return
            }
            const existingItem = state.cart.find((item) => item.id === product.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.cart.push({ ...product, quantity: 1 })
            }

            updateLocalStorage(state.cart)
            state.alert = { type: "success", message: `${product.name} added to cart!` }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload
            state.cart = state.cart
                .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0)

            updateLocalStorage(state.cart)
            state.alert = { type: "success", message: `Item removed from cart!` }
        },
        clearCart: (state) => {
            state.cart = []
            localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
            state.alert = { type: "success", message: `All items removed from cart!` }
        },
    },
})

export const { clearAlert, addToCart, removeFromCart, clearCart } = cartSlice.actions

export const selectCart = (state) => state.cart.cart
export const selectTotal = (state) =>
    state.cart.cart.reduce((total, item) => total + item.price * item.quantity, 0)
export const selectTotalCartItems = (state) =>
    state.cart.cart.reduce((total, item) => total + item.quantity, 0)

export default cartSlice.reducer
