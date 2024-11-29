import React, { useEffect, useState } from 'react';
import bannerImg from '../../assets/images/mobilePhone.png';
import computerImg from '../../assets/images/computer.png'
import { Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const { newProducts, popularProducts } = useProducts();
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayedNewProducts = newProducts?.slice(0, 4);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate()

    // width
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    // popular products buttons
    {
        const nextItem = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % popularProducts?.length);
        };
        const prevItem = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + popularProducts?.length) % popularProducts?.length);
        };

        const displayedItems = popularProducts?.length
            ? [
                popularProducts[currentIndex % popularProducts.length],
                popularProducts[(currentIndex + 1) % popularProducts.length],
                popularProducts[(currentIndex + 2) % popularProducts.length],
                popularProducts[(currentIndex + 3) % popularProducts.length],
            ]
            : [];

        // navigation
        const navigateToShop = () => {
            navigate('/shop')
        }

        const containerVariants = {
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    delayChildren: 1,
                    staggerChildren: 0.15,
                },
            },
        };
        const itemVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        };

        return (
            <div className="w-full mb-20  text-white">
                {/* Hero Section */}
                <div className="flex w-full md:mb-0 mb-10 md:flex-row flex-col justify-between px-8 md:px-20 pt-12">
                    {/* Banner Image */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <img
                            src={bannerImg}
                            alt="banner"
                            className="w-2/3 md:w- rounded-lg shadow-lg"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 flex flex-col md:gap-6 "
                    >
                        <h1 className="text-4xl md:text-8xl font-bold leading-loose">
                            Upgrade Your
                        </h1>
                        <h1 className="text-4xl mt-0 md:mt-4 md:text-8xl font-bold leading-loose">
                            Tech Life
                        </h1>
                        <p className="text-lg text-neutral-400 md:mb-20">
                            Explore the latest mobile phones and computers with unbeatable prices and quality.
                        </p>
                        <Button
                            sx={{ ml: 'auto' }}
                            variant="contained"
                            size="large"
                            className=" bg-gradient-to-r from-blue-500 to-red-700 hover:from-pink-900 hover:to-purple-800 text-white px-8 py-3 text-lg  rounded-full shadow-md transition-transform transform hover:scale-105"
                            onClick={navigateToShop}
                        >
                            Shop Now
                        </Button>
                    </motion.div>
                </div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gray-800 py-12 px-8 md:px-20 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Why Shop With Us?
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="flex flex-col cursor-pointer items-center p-6 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                            <h3 className="text-xl font-bold mb-2">Latest Products</h3>
                            <p className="text-gray-400">Stay updated with cutting-edge technology.</p>
                        </div>
                        <div className="flex flex-col cursor-pointer items-center p-6 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                            <h3 className="text-xl font-bold mb-2">Affordable Prices</h3>
                            <p className="text-gray-400">Get the best deals on top brands.</p>
                        </div>
                        <div className="flex flex-col cursor-pointer items-center p-6 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                            <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                            <p className="text-gray-400">Quick delivery right to your doorstep.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Popular Products Section */}
                <div className=' flex flex-col justify-center items-center   mt-10'>
                    <div className="flex flex-col justify-center items-center  py-5 rounded-md ">
                        <h1 className="text-3xl font-bold text-neutral-300 mb-6">Our Popular Products</h1>
                        <p className='text-sm text-neutral-400 text-center px-5 md:px-56 font-normal mb-10'>
                            Discover our top-selling products that our customers love. From innovative gadgets to everyday essentials,
                            each item is carefully selected to offer the best in quality and value. Browse through our collection
                            and find the perfect products to meet your needs.
                        </p>
                        <div className='flex items-center justify-center'>
                            <button className='bg-white p-4 rounded-full shadow-2xl -mr-4 z-50' onClick={prevItem}>
                                <ArrowBackIosNewIcon className='text-black' />
                            </button>
                            <div className={`grid grid-cols-1 ${!isMobile ? 'md:grid-cols-4' : ''} grid-rows-1 gap-2`}>
                                {displayedItems
                                    ?.slice(0, isMobile ? 1 : 4)
                                    .map((product) => (
                                        <Grid key={product.id}>
                                            <ProductCard product={product} />
                                        </Grid>
                                    ))}
                            </div>
                            <button className='bg-white p-4 rounded-full shadow-2xl -ml-4 z-50' onClick={nextItem}>
                                <ArrowForwardIosIcon className='text-black' />
                            </button>
                        </div>
                    </div>
                </div>



                {/* About Us Section */}
                <div className="flex w-full flex-col  items-center md:flex-row justify-between px-8 md:px-20 pt-12">
                    {/* Banner Image */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 flex flex-col gap-6 "
                    >
                        <h1 className="text-4xl md:text-8xl font-bold leading-loose">
                            About Us
                        </h1>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            We are a leading e-commerce platform offering the latest and most reliable tech products.
                            Our mission is to bring cutting-edge technology to your doorstep with exceptional customer service.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="md:w-1/2 flex justify-center"
                    >
                        <img
                            src={computerImg}
                            alt="banner"
                            className="w-2/3 md:w- rounded-lg shadow-lg"
                        />
                    </motion.div>
                </div>


                {/* New Products Section */}
                <div className="mt-10">
                    <div className="p-6 flex flex-col ">
                        <h1 className="text-3xl font-bold text-neutral-600 mb-6">New Products</h1>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {displayedNewProducts?.map((product, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                        <Button
                            sx={{
                                width: { xs: '100%', md: '250px' }, // Small width for mobile, larger for desktop
                                alignSelf: 'center',
                                mt: 3,
                                py: { xs: 2, md: 3 },
                                fontSize: { xs: 16, md: 24 },
                                mx: 'auto',
                            }}
                            variant="outlined"
                            color="error"
                            onClick={navigateToShop}
                        >
                            Explore more
                        </Button>
                    </div>
                </div>

                {/* Banner */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full flex justify-center"
                >
                    <img
                        src="https://promotions.newegg.com/B2B/NEpro/23-1422/696x250.jpg"
                        alt="banner"
                        className="w-full rounded-lg shadow-lg"
                    />
                </motion.div>

            </div>
        );
    };
}
export default Home