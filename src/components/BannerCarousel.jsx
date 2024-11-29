import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProducts } from '../context/ProductContext';

const BannerCarousel = () => {

    const { banners } = useProducts()

    if (!banners) {
        return (
            <></>
        )
    }

    return (
        <Carousel
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={3000}
            showStatus={false}
            dynamicHeight
        >
            {banners.map((banner) => (
                <img className=' rounded-3xl max-h-80' key={banner.id} src={banner.image} alt="banner" />
            ))}
        </Carousel>
    )
}

export default BannerCarousel