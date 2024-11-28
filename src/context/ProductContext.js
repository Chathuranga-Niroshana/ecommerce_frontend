import React, { createContext, useContext, useState } from "react";
import { productList } from "../assets/productList";


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [newProducts, setNewProducts] = useState(
        productList.filter((product) => product.year === new Date().getFullYear())
    );
    const [popularProducts, setPopularProducts] = useState(
        productList.filter((product) => product.ratings >= 4.5)
    );

    return (
        <ProductContext.Provider value={{ newProducts, popularProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};
