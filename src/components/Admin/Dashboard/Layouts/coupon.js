import { useState, useEffect, React } from "react";
import axios from "axios";
import '../dashboard.css';

function Coupon() {
  const [coupon, setCoupon] = useState([]);
  const [inputs, setInputs] = useState({
    code: '',
    discount_percentage: '',
    expiration_date: '',
  });
  useEffect(() => {
    getDatas();
  }, []);
  function getDatas() {
    axios.get('http://localhost/restApis/coupon/index_coupon.php').then(function (response) {
      setCoupon(response.data.data);
    });
  }
  const deleteItems = (id) => {
    axios.delete(`http://localhost/restApis/coupon/delete_coupon.php?id=${id}`).then(function () {
      getDatas();
    });
  }
  const clearData = () => {
    setInputs(values => ({ ...values, "id": "", "code": "", "discount_percentage": "", "expiration_date": "" }))
  }
  /* for update */

  function getCoupon(id) {
    axios.get(`http://localhost/restApis/coupon/single_coupon.php?id=${id}`).then(function (response) {
      setInputs(response.data);
      setInputs(values => ({ ...values, }))
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost/restApis/coupon/create_coupon.php', inputs).then(function (response) {
      console.log(response.data)
      getDatas();

    });
  }

  return (
    <section className="container2">
      <div className="row">
        <div className="col-12">
          <div className="filter-options">
            <p>Filter selected: more than 100 $</p>
            {/* <button className="icon-button" >
                  <i className="ph-funnel"></i>
              </button>
              <button className="icon-button">
                  <i className="ph-plus"></i>
              </button> */}
            <button onClick={clearData} id="modelbutton" type="button" className="btn btn-primary btn-sm float-end mb-2" data-bs-toggle="modal" data-bs-target="#myModal">
              Add Coupon
            </button>
          </div>
        </div>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h4 className="modal-title text-white">Coupon Data</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearData}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-sm-6 w-50">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="name">Code</label>
                      <input value={inputs.code} type="text" className="form-control border-secondary" name="code" onChange={handleChange} placeholder="Code" />
                      <input value={inputs.id} type="hidden" name="id" />
                    </div>
                  </div>
                  <div className="col-sm-5 ">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="email">Discount Percentage</label>
                      <input type="text" className="form-control border-secondary" id="discount_percentage" name="discount_percentage" value={inputs.discount_percentage} onChange={handleChange} placeholder="Discount Percentage" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="datetime"> Expiration Date</label>
                      <input type="date" className="form-control datetimepicker-input border-secondary" id="expiration_date" placeholder="Expiration Date"
                        name="expiration_date"
                        value={inputs.expiration_date}
                        onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
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
                  <th>Code</th>
                  <th>Discount Percentage</th>
                  <th>Expiration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupon ? (
                  coupon.map((coupon, key) => (
                    <tr key={key}>
                      <td>{coupon.id}</td>
                      <td>{coupon.code}</td>
                      <td>{coupon.discount_percentage}</td>
                      <td>{coupon.expiration_date}</td>
                      <td>
                        <button className="btn btn-primary me-2  ms-2 mt-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => getCoupon(coupon.id)}>Edit</button>

                        <button className="btn btn-danger bg-danger w-60 me-2  ms-2 mt-1" onClick={() => deleteItems(coupon.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No coupon available.</td>
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

export default Coupon;
