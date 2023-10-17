import { React } from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import { useCart } from "react-use-cart";
import { Link } from 'react-router-dom';
const Cart = () => {
    const { isEmpty, cartTotal, items, updateItemQuantity, removeItem, } = useCart(); /* to use cart */
    
    // console.log(items)
    if (isEmpty) {
        return (
            <div className="container-xxl bg-white p-0">
                {/* <!-- Navbar & Hero Start --> */}
                <div className="container-xxl position-relative p-0">
                    <Header />
                    <div className="container-xxl py-5 bg-dark hero-header mb-5">
                        <div className="container text-center my-5 pt-5 pb-4">
                            <h1 className="display-3 text-white mb-3 animated slideInDown">Takeout</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                                    <li className="breadcrumb-item"><a href="./">Pages</a></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Contact</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <p className='text-dark mx-5'>Your cart is empty</p>
                <Footer />
            </div>
        );
    }
    return (
        <div className="container-xxl bg-white p-0">

            {/* <!-- Navbar & Hero Start --> */}
            <div className="container-xxl position-relative p-0">
                <Header />
                <div className="container-xxl py-5 bg-dark hero-header mb-5">
                    <div className="container text-center my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Takeout</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item"><a href="./">Home</a></li>
                                <li className="breadcrumb-item"><a href="./">Pages</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Contact</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row mb-5">
                        <form className="col-md-12" method="post">
                            <div className="site-blocks-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail"><h6>Image</h6></th>
                                            <th className="product-name"><h6>Product</h6></th>
                                            <th className="product-price"><h6>Price</h6></th>
                                            <th className="product-quantity"><h6 className='px-4'>Quantity</h6></th>
                                            <th className="product-total"><h6>Total</h6></th>
                                            <th className="product-remove"><h6>Remove</h6></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id}>
                                                <td className="product-thumbnail">
                                                    <img src={item.imageSrc} alt="{item.name}" className="img-fluid rounded" />
                                                </td>
                                                <td className="product-name">
                                                    <h2 className="h5 text-black mt-4">{item.name}</h2>
                                                </td>
                                                <td >
                                                    <h6 className='mt-4'>${item.price}</h6>
                                                </td>
                                                <td>
                                                    <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: '120px' }}>
                                                        <div className="input-group-prepend">
                                                            <button className="btn decrease mt-3" type="button" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>&minus;</button>
                                                        </div>
                                                        <input type="text" className="form-control text-center quantity-amount mt-3" value={item.quantity} placeholder=""
                                                            aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                        <div className="input-group-append">
                                                            <button className="btn increase mt-3" type="button" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}> + </button>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>
                                                    <h6 className='mt-4'>${(item.price * item.quantity).toFixed(2)}</h6>
                                                </td>
                                                <button className="btn btn-black btn-sm mt-4 px-4" onClick={() => removeItem(item.id)}>X</button>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mb-5">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    {/* <button className="btn btn-secondary py-3 px-3 fw-bold" id='cartButton'>Update Cart</button> */}
                                    <a href="/menu"><button className="btn btn-secondary py-3 px-3 fw-bold">Continue Shopping</button></a>
                                </div>
                                {/* <div className="col-md-6">
                                    
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-6 pl-5">
                            <div className="row justify-content-end">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-12 text-right border-bottom mb-5">
                                            <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <span className="text-black">Total</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">${cartTotal.toFixed(2)}</strong>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <Link to="/checkout">
                                                <button className="btn btn-secondary py-3 px-3 fw-bold">Proceed To Checkout</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    )
}

export default Cart
