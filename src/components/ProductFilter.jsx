import React from "react";
import { Slider, Select, MenuItem } from "@mui/material";

const ProductFilter = ({
    category,
    setCategory,
    priceRange,
    setPriceRange,
    sort,
    setSort,
    handleFilter,
}) => {
    return (
        <div className=" border border-pink-950  shadow-md rounded-lg p-6  w-full max-w-7xl mx-auto mt-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-700 mb-4">Filter Products</h2>
            <div className="flex flex-wrap md:flex-row flex-col justify-between gap-6">
                {/* Category Filter */}
                <div className="flex flex-col flex-grow sm:flex-grow-0 sm:w-1/4">
                    <label className="text-gray-600 font-semibold mb-2">Category</label>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-gray-100 rounded"
                        displayEmpty
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="mobile phone">Mobile Phones</MenuItem>
                        <MenuItem value="computers">Computers</MenuItem>
                        <MenuItem value="accessories">Accessories</MenuItem>
                    </Select>
                </div>

                {/* Price Range Filter */}
                <div className="flex flex-col flex-grow sm:flex-grow-0 sm:w-1/3">
                    <label className="text-gray-600 font-semibold mb-2">Price Range</label>
                    <Slider
                        value={priceRange}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                        min={0}
                        max={2500}
                        valueLabelDisplay="auto"
                        className="text-purple-600"
                    />
                </div>

                {/* Sort Filter */}
                <div className="flex flex-col flex-grow sm:flex-grow-0 sm:w-1/4">
                    <label className="text-gray-600 font-semibold mb-2">Sort By</label>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-gray-100 rounded"
                        displayEmpty
                    >
                        <MenuItem value="">Default</MenuItem>
                        <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                        <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                    </Select>
                </div>
            </div>
            <button
                onClick={handleFilter}
                className="mt-6 px-6 py-2 bg-purple-600 text-white font-bold rounded shadow-md hover:bg-purple-700 transition-colors"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default ProductFilter;
