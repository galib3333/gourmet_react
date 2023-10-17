import { React, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import { useCart } from "react-use-cart"; /* to use cart */
import { logout } from "../Admin/Auth/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const [isSignedIn, setIsSignedIn] = useState(() => {
        const userLogged = localStorage.getItem("access_token");
        return userLogged || false;
    });

    const signout = () => {
        setIsSignedIn(false);
        logout();
        navigate('/');
    }
    const location = useLocation();

    // Function to determine if a link is active
    const isLinkActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };
    const { totalUniqueItems } = useCart();

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-4 py-3 py-lg-0">
                <Link to="/" className="navbar-brand p-0">
                    <h1 className="text-primary m-0"><i className="fa fa-utensils me-3"></i>Gourmet<span style={{ color: 'white' }}>Grove</span></h1>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto py-0 pe-4">
                        <Link to="/" className={`nav-item nav-link ${isLinkActive('/')}`}>Home</Link>
                        <Link to="/about" className={`nav-item nav-link ${isLinkActive('/about')}`}>About</Link>
                        <Link to="/service" className={`nav-item nav-link ${isLinkActive('/service')}`}>Service</Link>
                        <Link to="/menu" className={`nav-item nav-link ${isLinkActive('/menu')}`}>Menu</Link>
                        <div className="nav-item dropdown">
                            <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
                            <div className="dropdown-menu m-0">
                                <Link to="/booking" className={`dropdown-item ${isLinkActive('/booking')}`}>Booking</Link>
                                <Link to="/team" className={`dropdown-item ${isLinkActive('/team')}`}>Our Team</Link>
                                <Link to="/testimonial" className={`dropdown-item ${isLinkActive('/testimonial')}`}>Testimonial</Link>
                            </div>
                        </div>
                        <Link to="/contact" className={`nav-item nav-link ${isLinkActive('/contact')}`}>Contact</Link>
                    </div>
                    <Link to="/booking" className="btn btn-primary py-2 px-4">Book A Table</Link>
                    
                    {isSignedIn ? (
                        <a className="fa-lg text-white ms-3" href="/dashboard">
                            <i className="fas fa-tachometer-alt"></i>
                        </a>
                    ) : null}

                    <Link className="nav-link cartIcon" to="/cart"><img src="../assets/img/cart.svg" alt='' />
                        <span className="cart-item-count">{totalUniqueItems}</span>
                    </Link>
                    <div>
                        {isSignedIn ? (
                            <div className="header__right__auth">
                                <button className="btn btn-link ms-1" type="button" onClick={signout}>
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <div className="header__right__auth ms-3">
                                <button className='btn btn-secondery'> 
                                <a href="./login">
                                    Sign in
                                </a> <br />
                                <a href="./login">
                                    Register
                                </a>
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
            {/* Navbar */}
        </div>
    );
};

export default Header;
