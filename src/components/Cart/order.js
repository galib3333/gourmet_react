import { React } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import "./checkout.css";
import { Link } from 'react-router-dom';

const Order = () => {

  return (
    <div className="container-xxl bg-white p-0">
      {/* Navbar & Hero */}
      <div className="container-xxl position-relative p-0">
        <Header />
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">Order</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item"><a href="./">Home</a></li>
                <li className="breadcrumb-item"><a href="./">Pages</a></li>
                <li className="breadcrumb-item text-white active" aria-current="page">Order</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Order Confirmation Content */}
      <div className="container-xxl py-1">
        <div className="container text-center">
          <div className="mb-5">
            <img src="assets/img/order.jpg" className="orderImg img-fluid" alt="Order Confirmation" />
            <h5>Thank You For Ordering</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et lobortis lacus.</p>
            <div className="mb-5">
            <Link to="/view-order" className="btn btn-primary mx-2">View Order</Link>
            <Link to="/menu" className="btn btn-secondary mx-2">Continue Shopping</Link>
          </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
