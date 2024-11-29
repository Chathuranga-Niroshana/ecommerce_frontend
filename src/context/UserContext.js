import { createContext, useContext, useEffect, useState } from "react";

export const userDb = [];

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
    const [totalCartItems, setTotalCartItems] = useState(0)



    // Register function with validation
    const register = (userData) => {
        const { email, password, name } = userData;

        if (!email || !password || !name) {
            alert("All fields are required!");
            return;
        }
        if (userDb.some((user) => user.email === email)) {
            alert("Email already exists!");
            return;
        }

        const newUser = { id: Date.now(), ...userData, cart: [] };
        userDb.push(newUser);
        alert("Registration successful!");
    };

    // Login function with token
    const login = ({ email, password }) => {
        if (!email || !password) {
            alert("Email and password are required!");
            return;
        }

        const user = userDb.find((u) => u.email === email && u.password === password);
        if (user) {
            setUser(user);
            localStorage.setItem("token", user);
            setIsLoggedIn(true)
            alert("Login successful!");
        } else {
            alert("Invalid email or password!");
        }
    };


    const syncCartToLocalStorage = (updatedCart) => {
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };


    const addToCart = (product) => {
        if (!isLoggedIn) {
            alert("Please log in to add items to the cart.");
            return;
        }

        const existingItem = cart.find((item) => item.id === product.id);
        let updatedCart;
        if (existingItem) {
            updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        syncCartToLocalStorage(updatedCart);
        alert(`${product.name} added to cart!`);
    };

    const removeFromCart = (productId) => {
        if (!isLoggedIn) {
            return;
        }

        const updatedCart = cart
            .map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0);

        syncCartToLocalStorage(updatedCart);
        alert("Item removed from cart.");
    };

    useEffect(() => {
        const numberOfCartItems = () => {
            setTotalCartItems(cart.length);
        };
        numberOfCartItems();
    }, [cart]);

    const getCart = () => {
        if (!isLoggedIn) {
            return [];
        }
        return cart;
    };

    const clearCart = () => {
        if (!isLoggedIn) {
            alert("Please log in to clear the cart.");
            return;
        }
        syncCartToLocalStorage([]);
        alert("Cart cleared.");
    };

    const logout = () => {
        setUser(null);
        setCart([]);
        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");
        alert("Logged out successfully!");
    };

    const getTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };
    useEffect(() => {
        const isUserLoggedIn = () => {
            localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false)
        };
        isUserLoggedIn()
    }, [cart, user])

    return (
        <UserContext.Provider
            value={{
                user,
                cart,
                register,
                login,
                logout,
                addToCart,
                removeFromCart,
                getCart,
                clearCart,
                getTotal,
                isLoggedIn,
                totalCartItems,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
