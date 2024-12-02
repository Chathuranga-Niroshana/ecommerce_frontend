import React, { createContext, useContext, useEffect, useState } from "react";
import { productList } from "../assets/productList";
import { bannerData } from "../assets/bannerData";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [allProducts, setAllProducts] = useState(productList);
    const [newProducts, setNewProducts] = useState();
    const [popularProducts, setPopularProducts] = useState();
    const [banners, setBanners] = useState(bannerData)

    useEffect(() => {
        const filteredNewProducts = productList.filter(product => product.year === 2024);
        const filteredPopularProducts = productList.filter(product => product.ratings >= 4.6)
        setNewProducts(filteredNewProducts);
        setPopularProducts(filteredPopularProducts)
    }, [])

    return (
        <ProductContext.Provider value={{ allProducts, newProducts, popularProducts, banners }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};
