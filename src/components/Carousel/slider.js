import { React, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css'; // Your custom slider styles
import { fetchTestimonials } from '../../api/testi';

const TestimonialsCarousel = () => {
    const [testimonialsData, setTestimonialsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTestimonials();
                setTestimonialsData(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: true,
        touchMove: true,
        loop: true,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: null, 
        nextArrow: null
    };

    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="text-center">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
                    <h1 className="mb-5">Our Clients Say!!!</h1>
                </div>
                <Slider {...settings} className="slider">
                    {testimonialsData.map((testimonials, index) => (
                        <div key={testimonials.id}>
                            <div
                                className={`testimonial-item bg-transparent border rounded p-4 ${
                                    index === 0 ? 'slick-current' : ''
                                }`}
                            >
                                <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                                <p>{testimonials.quote}</p>
                                <div className="d-flex align-items-center">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-circle"
                                        src={testimonials.imageSrc}
                                        style={{ width: '50px', height: '50px' }}
                                        alt={testimonials.name}
                                    />
                                    <div className="ps-3">
                                        <h5 className="mb-1">{testimonials.name}</h5>
                                        <small>{testimonials.profession}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
