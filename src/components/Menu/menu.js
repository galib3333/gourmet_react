import { React, useEffect, useState } from 'react';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { useCart } from "react-use-cart";
import "./menu.css";
import axios from "axios";
const Menu = ({ showHeader = true, showFooter = true, }) => {
    const [Breakfast, setBreakfast] = useState([]);
    const [Lunch, setLunch] = useState([]);
    const [Dinner, setDinner] = useState([]);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${global.config.apiUrl}menu`);
                if (response.data.status === 1) {
                    const data = response.data.data;

                    // Filter data into Breakfast, Lunch, and Dinner
                    const breakfastItems = data.filter((item) => item.cname.includes('Breakfast'));
                    const lunchItems = data.filter((item) => item.cname.includes('Lunch'));
                    const dinnerItems = data.filter((item) => item.cname.includes('Dinner'));

                    // Set the filtered items in state
                    setBreakfast(breakfastItems);
                    setLunch(lunchItems);
                    setDinner(dinnerItems);
                }
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {showHeader && (
                <Header />
            )}

            <div className="container-xxl bg-white p-0">
                {showHeader && (
                    <div className="container-xxl position-relative p-0">
                        <div className="container-xxl py-5 bg-dark hero-header mb-5">
                            <div className="container text-center my-5 pt-5 pb-4">
                                <h1 className="display-3 text-white mb-3 animated slideInDown">Food Menu</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center text-uppercase">
                                        <li className="breadcrumb-item"><a href="./">Home</a></li>
                                        <li className="breadcrumb-item"><a href="./">Pages</a></li>
                                        <li className="breadcrumb-item text-white active" aria-current="page">Menu</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
                {/* <!-- Navbar & Hero End --> */}
                {/* <!-- Menu Start --> */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
                            <h1 className="mb-5">Most Popular Items</h1>
                        </div>
                        <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.1s">
                            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                                <li className="nav-item">
                                    <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
                                        <i className="fa fa-coffee fa-2x text-primary"></i>
                                        <div className="ps-3">
                                            <small className="text-body">Popular</small>
                                            <h6 className="mt-n1 mb-0">Breakfast</h6>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
                                        <i className="fa fa-hamburger fa-2x text-primary"></i>
                                        <div className="ps-3">
                                            <small className="text-body">Special</small>
                                            <h6 className="mt-n1 mb-0">Launch</h6>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
                                        <i className="fa fa-utensils fa-2x text-primary"></i>
                                        <div className="ps-3">
                                            <small className="text-body">Lovely</small>
                                            <h6 className="mt-n1 mb-0">Dinner</h6>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        {Breakfast && Breakfast.length > 0 ? (
                                            Breakfast.map((menuItem) => (
                                        <div className="col-lg-6" key={menuItem.id}>
                                            <div className="d-flex align-items-center">

                                            {console.log('Coupon Code:', menuItem.coupon_code)}
                                        {console.log('Discount Percentage:', menuItem.discount_percentage)}

                                                <img className="flex-shrink-0 img-fluid rounded" src={global.config.apiUrl + menuItem.imageSrc} alt="" style={{ width: '80px' }} />
                                                <div className="w-100 d-flex flex-column text-start ps-4">
                                                    <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                        <span>
                                                            {menuItem.name}
                                                            <i className="fas fa-shopping-cart mx-4 btn-primary rounded" onClick={() => addItem(menuItem)} style={{ cursor: 'pointer' }}></i><br />
                                                            {menuItem.code && menuItem.discount_percentage ? (
                                                                <span className="text-success ms-2" id='couponText'>
                                                                    Coupon: {menuItem.code} ({menuItem.discount_percentage}% off)
                                                                </span>
                                                            ) : null}
                                                        </span>
                                                        <span className="text-primary">${menuItem.price}</span>
                                                    </h5>
                                                    <small className="fst-italic">{menuItem.description}</small>
                                                </div>
                                            </div>
                                        </div>
                                        ))
                                        ) : (
                                        <p>No breakfast items available</p>
                                        )}
                                    </div>
                                </div>
                                <div id="tab-2" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        {Lunch && Lunch.length > 0 ? (
                                            Lunch.map((menuItem) => (
                                                <div className="col-lg-6" key={menuItem.id}>
                                                    <div className="d-flex align-items-center">
                                                        <img className="flex-shrink-0 img-fluid rounded" src={global.config.apiUrl + menuItem.imageSrc} alt="" style={{ width: '80px' }} />
                                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                                <span>
                                                                    {menuItem.name}
                                                                    <i className="fas fa-shopping-cart mx-4 btn-primary rounded" onClick={() => addItem(menuItem)} style={{ cursor: 'pointer' }}></i><br />
                                                                    {menuItem.code && menuItem.discount_percentage ? (
                                                                        <span className="text-success ms-2" id='couponText'>
                                                                            Coupon: {menuItem.code} ({menuItem.discount_percentage}% off)
                                                                        </span>
                                                                    ) : null}
                                                                </span>
                                                                <span className="text-primary">${menuItem.price}</span>
                                                            </h5>
                                                            <small className="fst-italic">{menuItem.description}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Lunch items available</p>
                                        )}
                                    </div>
                                </div>
                                <div id="tab-3" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        {Dinner && Dinner.length > 0 ? (
                                            Dinner.map((menuItem) => (
                                                <div className="col-lg-6" key={menuItem.id}>
                                                    <div className="d-flex align-items-center">
                                                        <img className="flex-shrink-0 img-fluid rounded" src={global.config.apiUrl + menuItem.imageSrc} alt="" style={{ width: '80px' }} />
                                                        <div className="w-100 d-flex flex-column text-start ps-4">
                                                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                                                <span>
                                                                    {menuItem.name}
                                                                    <i className="fas fa-shopping-cart mx-4 btn-primary rounded" onClick={() => addItem(menuItem)} style={{ cursor: 'pointer' }}></i><br />
                                                                    {menuItem.code && menuItem.discount_percentage ? (
                                                                        <span className="text-success ms-2" id='couponText'>
                                                                            Coupon: {menuItem.code} ({menuItem.discount_percentage}% off)
                                                                        </span>
                                                                    ) : null}
                                                                </span>
                                                                <span className="text-primary">${menuItem.price}</span>
                                                            </h5>
                                                            <small className="fst-italic">{menuItem.description}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No Dinner items available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Menu End --> */}
                {showFooter && (
                    <Footer />
                )}
            </div>
            {/* <!-- Back to Top --> */}
            <a href="/menu" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
        </div>
    );
};

export default Menu;
