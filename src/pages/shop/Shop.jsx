import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import BannerCarousel from "../../components/BannerCarousel";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/ProductCard";
import ProductFilter from "../../components/ProductFilter";
import { useLocation } from "react-router-dom";

const Shop = () => {
    const { allProducts } = useProducts();
    const location = useLocation();

    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 2500]);
    const [sort, setSort] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("query") || "";
        setSearchQuery(query);

        if (query) {
            const results = allProducts.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts(allProducts);
        }
    }, [location.search, allProducts]);

    const handleFilter = () => {
        let products = [...allProducts];

        if (searchQuery) {
            products = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (category) {
            products = products.filter((prod) => prod.category === category);
        }
        products = products.filter(
            (prod) => prod.price >= priceRange[0] && prod.price <= priceRange[1]
        );
        if (sort === "priceLowHigh") {
            products.sort((a, b) => a.price - b.price);
        } else if (sort === "priceHighLow") {
            products.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(products);
    };

    if (!allProducts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex w-full flex-col items-center px-2">
            {/* search bar */}
            <SearchBar />

            {/* Banner section */}
            <div className="w-full rounded-md px-2 md:rounded-3xl max-w-5xl overflow-hidden">
                <BannerCarousel />
            </div>

            {/* Filter Section */}
            <ProductFilter
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sort={sort}
                setSort={setSort}
                handleFilter={handleFilter}
            />

            {/* Products List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4 py-10 max-w-7xl">
                {(filteredProducts.length > 0 ? filteredProducts : allProducts).map(
                    (product) => (
                        <ProductCard key={product.id} product={product} />
                    )
                )}
            </div>
        </div>
    );
};

export default Shop;
