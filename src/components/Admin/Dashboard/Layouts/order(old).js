import { React, useState, useEffect } from "react";
import axios from "axios";
import '../dashboard.css';

function Order() {
  const [orders, setOrders] = useState([]);
  const [inputs, setInputs] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    status: '',
  });

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    axios.get(`${global.config.apiUrl}order`).then(function (response) {
      setOrders(response.data.data);
    });
  }

  const deleteOrder = (id) => {
    axios.delete(`${global.config.apiUrl}order/delete/${id}`).then(function () {
      getOrders();
    });
  }

  const clearData = () => {
    setInputs({
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      sub_total: '',
      discount: '',
      total: '',
      status: '',
    });
  }

  function getOrder(d) {
    const decodedItems = JSON.parse(atob(d.items));
    setInputs({
      first_name: d.first_name,
      last_name: d.last_name,
      email: d.email,
      address: d.address,
      items: decodedItems,
      sub_total: d.sub_total,
      discount: d.discount,
      total: d.total,
      status: d.status,
    });
  }
  

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Encode the items as base64 before sending to the server
    const encodedItems = btoa(JSON.stringify(inputs.items));

    // Update the items in the input state
    setInputs({ ...inputs, items: encodedItems });

    axios.post(`${global.config.apiUrl}order/create`, inputs).then(function (response) {
      console.log(response.data);
      getOrders();
      if (response.data.status === 1) {
      }
    });
  }


  return (
    <section className="container2">
      <div className="row">
        <div className="col-12">
          <div className="filter-options">
            {/* <button onClick={clearData} id="modelbutton" type="button" className="btn btn-primary btn-sm float-end mb-2" data-bs-toggle="modal" data-bs-target="#myModal">
              Add Order
            </button> */}
          </div>
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h4 className="modal-title text-white">Order Data</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearData}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Form input fields for order details */}
                {/* Add form fields for first_name, last_name, email, address, items, sub_total, discount, total, and status */}
                <div className="row">
                  <div className="col-sm-6 w-50">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="first_name">First Name</label>
                      <input value={inputs.first_name} type="text" className="form-control border-secondary" name="first_name" onChange={handleChange} placeholder="First Name" />
                      <input value={inputs.id} type="hidden" name="id" />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="last_name">Last Name</label>
                      <input value={inputs.last_name} type="text" className="form-control border-secondary" name="last_name" onChange={handleChange} placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="email">Email</label>
                      <input value={inputs.email} type="text" className="form-control border-secondary" name="email" onChange={handleChange} placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="address">Address</label>
                      <input value={inputs.address} type="text" className="form-control border-secondary" name="address" onChange={handleChange} placeholder="Address" />
                    </div>
                  </div>
                  
                  
                  
                  <div className="col-sm-5 ">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="status">Order Status</label>
                      <input type="text" className="form-control border-secondary" name="status" value={inputs.status} onChange={handleChange} placeholder="Order Status" />
                    </div>
                  </div>

                </div>
                <div className="row">
                  <div className="col-sm-2">
                    <button type="submit" className="btn btn-primary" id="modelbutton">Submit</button>
                  </div>
                  <div className="col-sm-3">
                    <button type="button" className="btn btn-danger ms-2" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="menu-table">
            <table className="menu">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Menu Items</th>
                  <th>Sub Total</th>
                  <th>Total Discount</th>
                  <th>Total Price</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders ? (
                  orders.map((order, key) => (
                    <tr key={key}>
                      <td>{order.order_id}</td>
                      <td>{order.first_name}</td>
                      <td>{order.last_name}</td>
                      <td>{order.email}</td>
                      <td>{order.address}</td>
                      <td>
                        {Array.isArray(order.items) ? (
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>{item.name} - {item.price}</li>
                            ))}
                          </ul>
                        ) : (
                          "No items available"
                        )}
                      </td>
                      <td>{order.sub_total}</td>
                      <td>{order.discount}</td>
                      <td>{order.total}</td>
                      <td>
                        <select name="status" className="form-control border-secondary bg-success text-white" style={{ width: '122px' }} onChange={handleChange}>
                          <option value="Pending">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td>
                        <button className="btn btn-primary me-2  ms-2 mt-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => getOrder(order)}>Edit</button>
                        <button className="btn btn-danger bg-danger w-60 me-2  ms-2 mt-1" onClick={() => deleteOrder(order.order_id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No orders available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Order;
