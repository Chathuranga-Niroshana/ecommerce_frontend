import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_TOKEN_KEY = "token"
const LOCAL_STORAGE_CART_KEY = "cartItems"

const userDb = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "123456" }
]
const initialState = {
    user: null,
    isLoggedIn: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
    alert: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAlert: (state) => {
            state.alert = null
        },
        register: (state, action) => {
            const { email, password, name } = action.payload

            if (!email || !password || !name) {
                state.alert = { type: "error", message: "Please fill all the fields." }
                return
            }

            if (userDb.some((user) => user.email === email)) {
                state.alert = { type: "error", message: "Email already exists. Try a different email." }
                return
            }

            userDb.push({ id: userDb.length + 1, email, password, name })
            state.alert = { type: "success", message: "User registered successfully!" }
        },
        login: (state, action) => {
            const { email, password } = action.payload

            if (!email || !password) {
                return
            }

            const user = userDb.find((u) => u.email === email)
            if (!user) {
                state.alert = { type: "error", message: "Invalid email." }
                return
            }

            if (user.password !== password) {
                state.alert = { type: "error", message: "Invalid password." }
                return
            }

            state.isLoggedIn = true
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(user))
            state.alert = { type: "success", message: "Logged in successfully." }
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.user = null
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
            localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
        },

    },
})

export const getUser = (state) => state.auth.user;

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;

export const { clearAlert, register, login, logout } = authSlice.actions

export default authSlice.reducer;
