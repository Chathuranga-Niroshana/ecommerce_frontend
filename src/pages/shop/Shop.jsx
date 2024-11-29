import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import BannerCarousel from "../../components/BannerCarousel";
import { useProducts } from "../../context/ProductContext";
import { Slider, Select, MenuItem } from "@mui/material";
import ProductCard from "../../components/ProductCard";
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
        <div className="flex w-full flex-col items-center">
            <SearchBar />
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden">
                <BannerCarousel />
            </div>

            {/* Filters Section */}
            <div className="flex flex-col w-full px-10 mt-10">
                <h2 className="text-2xl text-neutral-600 font-bold mb-4">Filter Products</h2>
                <div className="flex justify-around gap-4">
                    <div className="flex flex-col gap-4 w-1/5">
                        <label className="text-neutral-400 font-semibold">Category</label>
                        <Select
                            sx={{ backgroundColor: 'transparent', border: 1, borderColor: '#FFFFFF33', color: '#FFFFFF33' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-purple-100  "
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="mobile phone">Mobile Phones</MenuItem>
                            <MenuItem value="computers">Computers</MenuItem>
                            <MenuItem value="accessories">Accessories</MenuItem>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-4 w-1/2">
                        <label className="text-neutral-400 font-semibold">Price Range</label>
                        <Slider
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            min={0}
                            max={2500}
                            valueLabelDisplay="auto"
                            className="text-purple-600"
                        />
                    </div>

                    <div className="flex flex-col gap-4 w-1/5">
                        <label className="text-neutral-400 font-semibold">Sort By</label>
                        <Select
                            sx={{ backgroundColor: 'transparent', border: 1, borderColor: '#FFFFFF33', color: '#FFFFFF33' }}
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-purple-100"
                        >
                            <MenuItem value="">Default</MenuItem>
                            <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                            <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                        </Select>
                    </div>
                </div>
                <button
                    onClick={handleFilter}
                    className="mt-4 mb-10 px-4 w-fit ml-auto py-2  border border-red-700 text-white font-bold rounded-md hover:border-purple-700"
                >
                    Apply Filters
                </button>
            </div>

            {/* Products List */}
            <div className=" grid grid-cols-6 px-10 mb-20 gap-5 mt-8">
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
