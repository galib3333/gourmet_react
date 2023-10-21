import { useState, React } from "react";
import './dashboard.css';
import { Link } from "react-router-dom";
import MenuItems from './Layouts/menuItems';
import Reservation from "./Layouts/reservation";
import Coupon from "./Layouts/coupon";
import Order from "./Layouts/order";

function Dashboard() {
    const userLogged = JSON.parse(localStorage.getItem("userdata"));
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isReservationVisible, setIsReservationVisible] = useState(false);
    const [isCouponVisible, setIsCouponVisible] = useState(false);
    const [isOrderVisible, setIsOrderVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const toggleReservation = () => {
        setIsReservationVisible(!isReservationVisible);
    };
    const toggleCoupon = () => {
        setIsCouponVisible(!isCouponVisible);
    };
    const toggleOrder = () => {
        setIsOrderVisible(!isOrderVisible);
    };

    return (

        <div className="body2">
            <div className="app">
                <header className="app-header">
                    <div className="app-header-logo">
                        <div className="logo">
                            <Link to="/" className="navbar-brand p-0">
                                <h1 className="text-primary m-0"><i className="fa fa-utensils  me-3"></i>Gourmet<span style={{ color: 'white' }}>Grove</span></h1>
                            </Link>

                        </div>
                    </div>
                    <div className="app-header-actions ms-5 ps-5 justify-content-end float-end">
                        <button className="user-profile" id="user">
                            <span>{userLogged.name}</span>
                            <span>
                                <img src={`${global.config.apiUrl}${userLogged.image}`} alt="" />
                            </span>
                        </button>
                        {/* <div className="app-header-actions-buttons">
                            <button className="icon-button large">
                                <i className="ph-magnifying-glass"></i>
                            </button>
                            <button className="icon-button large">
                                <i className="ph-bell"></i>
                            </button>
                        </div> */}
                    </div>
                    <div className="app-header-mobile">
                        <button className="icon-button large">
                            <i className="ph-list"></i>
                        </button>
                    </div>

                </header>
                <div className="app-body">
                    <div className="app-body-navigation">
                        <nav className="navigation">
                            <a href="/">
                                <i className="ph-browsers"></i>
                                <span>Main Site</span>
                            </a>
                            <a href="#menu" onClick={toggleMenu}>
                                <i className="ph-check-square"></i>
                                <span>Menu</span>
                            </a>
                            <a href="#reservation" onClick={toggleReservation}>
                                <i className="ph-swap"></i>
                                <span>Reservation</span>
                            </a>
                            <a href="#coupon" onClick={toggleCoupon}>
                                <i className="ph-file-text"></i>
                                <span>Coupons</span>
                            </a>
                            <a href="#order" onClick={toggleOrder}>
                                <i className="ph-globe" ></i>
                                <span>Order</span>
                            </a>
                            <a href="./">
                                <i className="ph-clipboard-text"></i>
                                <span>Exchange</span>
                            </a>
                        </nav>

                    </div>
                    <div className="app-body-main-content">
                        <section className="service-section">
                            {/* <h2>Service</h2> */}
                            <div className="service-section-header">
                                <div className="search-field">
                                    <i className="ph-magnifying-glass"></i>
                                    <input type="text" className="text-white" placeholder="Search" />
                                </div>
                                <div className="dropdown-field">
                                    <select>
                                        <option>Home</option>
                                        <option>Work</option>
                                    </select>
                                    <i className="ph-caret-down"></i>
                                </div>
                                <button className="flat-button">
                                    Search
                                </button>
                            </div>
                            <div className="mobile-only">
                                <button className="flat-button">
                                    Toggle search
                                </button>
                            </div>
                        </section>
                        {/* Conditional rendering based on isMenuVisible */}
                        {isMenuVisible && (
                            <MenuItems />
                        )}
                        {isReservationVisible && (
                            <Reservation />
                        )}
                        {isCouponVisible && (
                            <Coupon />
                        )}
                        {isOrderVisible && (
                            <Order />
                        )}
                    </div>
                </div>
                
            </div>
            <footer className="footer">
                    <div>
                        Gourmet ©<br />
                        All Rights Reserved 2023
                    </div>
                </footer>
        </div>

    )
}

export default Dashboard;