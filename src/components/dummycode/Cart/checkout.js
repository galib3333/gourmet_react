import { React, useState, useEffect } from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useCart } from "react-use-cart";
import { checkCoupon } from '../../api/check_coupon';


const Checkout = () => {
  const { cartTotal, items, metadata } = useCart(); /* to use cart */
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (metadata.discount) {
      setDiscount(metadata.discount);
    }
  }, [metadata.discount]);
  const discountedTotal = cartTotal - discount;

  const applyCoupon = async () => {
    console.log(couponCode)
    try {
      const data = await checkCoupon(couponCode);

      if (data && data.discount_percentage) {
        const couponDiscounts = {};

        items.forEach((item) => {
          if (item.coupon_code) {
            if (!couponDiscounts[item.coupon_code]) {
              couponDiscounts[item.coupon_code] = 0;
            }
            const itemDiscount =
              (item.price * item.quantity * data.discount_percentage) / 100;

            console.log(`Item: ${item.name}, Coupon: ${item.coupon_code}`);
            console.log(`Item Discount: $${itemDiscount.toFixed(2)}`);

            couponDiscounts[item.coupon_code] += itemDiscount;
            console.log(`Coupon ${item.coupon_code} Total Discount: $${couponDiscounts[item.coupon_code].toFixed(2)}`);
          }
        });

        const totalDiscount = Object.values(couponDiscounts).reduce(
          (acc, discount) => acc + discount,
          0
        );

        console.log('Coupon Discounts:', couponDiscounts);
        console.log('Total Discount Applied:', `$${totalDiscount.toFixed(2)}`);

        setDiscount(totalDiscount);
      } else {
        console.log('Coupon is not valid or does not provide a discount.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
      <div className="container-xxl py-5">
        <div className="container">
          {/* Your checkout content goes here */}
          {/* Order Summary */}
          <div className="row">
            <div className="col-md-4">
              <h2 className="text-black mb-4">Order Summary</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through cart items to display each item */}
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Checkout Form */}
            <div className="col-md-5 offset-md-2 mt-5">
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

            {/* <div className="col-md-4">
              <label className="text-black h4" htmlFor="coupon">Coupon</label>
              <p>Enter your coupon code if you have one.</p>

              <div className="col-md-8 mb-3 mb-md-0">
                <form onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}>
                  <input className="form-control py-3" type="text" placeholder="Enter your coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />


                  <div onSubmit={(e) => { e.preventDefault(); applyCoupon(); }}>
                    <button className="btn btn-secondary my-2 py-1 px-3 fw-bold" type='submit'>Apply Coupon</button>
                  </div>
                </form>
              </div>
            </div> */}
            <div className="col-md-2 mt-4">
              {discount > 0 && (
                <div className="applied-discount mt-5">
                  Discount Applied: {"$" + discount.toFixed(2)}
                </div>
              )}
            </div>
            <div className="col-md-3 offset-md-9 ">
              <div className="row">
                <div className="col-md-6">
                  <span className="text-black">Sub Total</span>
                </div>
                <div className="col-md-6 text-right">
                  <strong className="text-black">${cartTotal.toFixed(2)}</strong>
                </div>
                <div className="col-md-6">
                  <span className="text-black">Discount</span>
                </div>
                <div className="col-md-6 text-right">
                  <strong className="text-black">${discount.toFixed(2)}</strong>
                </div>
                <div className="col-md-6">
                  <span className="text-black">Total</span>
                </div>
                <div className="col-md-6 text-right">
                  <strong className="text-black">${discountedTotal.toFixed(2)}</strong>
                </div>
              </div>
              <button className="btn btn-secondary py-3 px-3 fw-bold mt-4 ms-5">Place Order</button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
