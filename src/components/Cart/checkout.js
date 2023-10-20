import { React, useState } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useCart } from "react-use-cart";
import { checkCoupon } from '../../api/check_coupon';
import "./checkout.css";
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartTotal, items } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscounts, setCouponDiscounts] = useState({});
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [usedCoupons, setUsedCoupons] = useState([]);

  const applyCoupon = async () => {
    console.log("Coupon code to apply:", couponCode);

    try {
      if (usedCoupons.includes(couponCode)) {
        alert(`Coupon ${couponCode} has already been applied.`);
        return;
      }

      const data = await checkCoupon(couponCode);

      if (data && data.discount_percentage) {
        const updatedCouponDiscounts = { ...couponDiscounts };
        updatedCouponDiscounts[couponCode] = 0;

        items.forEach((item) => {
          if (item.code && item.code === couponCode) {
            const itemDiscount = (item.price * item.quantity * data.discount_percentage) / 100;

            console.log(`Item: ${item.name}, Coupon: ${item.code}`);
            console.log(`Item Discount: $${itemDiscount.toFixed(2)}`);

            updatedCouponDiscounts[couponCode] += itemDiscount;
            console.log(`Coupon ${couponCode} Total Discount: $${updatedCouponDiscounts[couponCode].toFixed(2)}`);
          }
        });

        const newTotalDiscount = Object.values(updatedCouponDiscounts).reduce((acc, discount) => acc + discount, 0);

        console.log('Coupon Discounts:', updatedCouponDiscounts);
        console.log('Total Discount Applied:', `$${newTotalDiscount.toFixed(2)}`);

        // Update usedCoupons array
        setUsedCoupons([...usedCoupons, couponCode]);

        console.log("Used coupons after applying:", usedCoupons);

        setCouponDiscounts(updatedCouponDiscounts);
        setTotalDiscount(newTotalDiscount);
      } else {
        console.log('Coupon is not valid or does not provide a discount.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const discountedTotal = cartTotal - totalDiscount;

  return (
    <div className="container-xxl bg-white p-0">
      {/* Navbar & Hero */}
      <div className="container-xxl position-relative p-0">
        <Header />
        <div className="container-xxl py-5 bg-dark hero-header mb-5">
          <div className="container text-center my-5 pt-5 pb-4">
            <h1 className="display-3 text-white mb-3 animated slideInDown">Checkout</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item"><a href="./">Home</a></li>
                <li className="breadcrumb-item"><a href="./">Pages</a></li>
                <li className="breadcrumb-item text-white active" aria-current="page">Checkout</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container-xxl py-1">
        <div className="container">
          {/* Your checkout content goes here */}
          {/* Order Summary */}
          <div className="row">
            <div className="col-md-5">
              <h2 className="text-black mb-4">Order Summary</h2>
              <table className="table">
                <thead>
                  <tr className='text-center'>
                    <th className='text-start'>Product</th>
                    <th>Quantity</th>
                    <th>Coupons</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through cart items to display each item */}
                  {items.map((item) => (
                    <tr className='text-center' key={item.id}>
                      <td className='text-start'>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.code}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Checkout Form */}
            <div className="col-md-5 offset-md-2 mt-1">
              <h2 className="text-black mb-4">Billing Information</h2>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" required />
                </div>
                {/* Add more input fields for address, city, postal code, etc. */}
              </form>
            </div>

            <div className="col-md-4">
              <label className="text-black h4" htmlFor="coupon">Coupon</label>
              <p>Enter your coupon code if you have one.</p>

              <div className="col-md-8 mb-3 mb-md-0">
                <form onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}>
                  <input className="form-control py-3" type="text" placeholder="Enter your coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />

                  <div onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}>
                    <button className="btn btn-secondary my-2 py-2 px-3 " type='submit'>Apply Coupon</button>
                  </div>
                </form>
              </div>
            </div>
            {/* {Object.keys(couponDiscounts).length > 0 && (
              <div className="col-md-2 mt-5">
                Discount Applied:
                {Object.keys(couponDiscounts).map((couponCode) => (
                  <div key={couponCode}>
                    {usedCoupons.includes(couponCode) ? (
                      `Coupon ${couponCode} has already been applied.`
                    ) : (
                      `Coupon ${couponCode}: $${couponDiscounts[couponCode].toFixed(2)}`
                    )}
                  </div>
                ))}
              </div>
            )} */}

            {Object.keys(couponDiscounts).length > 0 && (
              <div className="col-md-2" id='couponMsg'>
                Discount Applied:
                {Object.keys(couponDiscounts).map((couponCode) => (
                  <div key={couponCode}>
                    Coupon {couponCode}: ${couponDiscounts[couponCode].toFixed(2)}
                  </div>
                ))}
              </div>
            )}
            <div className="col-md-3 offset-md-9 ">
              <div className="row">
                <div className="col-md-6">
                  <span className="text-black">Sub Total</span>
                </div>
                <div className="col-md-6 text-right">
                  <strong className="text-black">${cartTotal.toFixed(2)}</strong>
                </div>
                <div className="col-md-6">
                  <span className="text-black">Total Discount</span>
                </div>
                <div className="col-md-6 text-right">
                  <strong className="text-black">${totalDiscount.toFixed(2)}</strong>
                </div>
                <div className="col-md-6">
                  <span className="text-black">Total</span>
                </div>
                <div className="col-md-6 text-right">
                  <strong className="text-black">${discountedTotal.toFixed(2)}</strong>
                </div>
              </div>
              <Link to="/order">
              <button className="btn btn-secondary py-3 mt-4 ms-2">Place Order</button>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
