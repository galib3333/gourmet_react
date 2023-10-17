import { useState, useEffect, React } from "react";
import axios from "axios";
import '../dashboard.css';

function Reservation() {
  const [reservation, setReservation] = useState([]);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    datetime: '',
    no_of_people: '',
    special_request: '',
  });
  useEffect(() => {
    getDatas();
  }, []);
  function getDatas() {
    axios.get('http://localhost/restApis/reservation/index_reserv.php').then(function (response) {
      setReservation(response.data.data);
    });
  }
  const deleteItems = (id) => {
    axios.delete(`http://localhost/restApis/reservation/delete_reserv.php?id=${id}`).then(function () {
      getDatas();
    });
  }
  const clearData = () => {
    setInputs(values => ({ ...values, "id": "", "name": "", "email": "", "datetime": "", "no_of_people": "", "special_request": "" }))
  }
  /* for update */

  function getReservation(id) {
    axios.get(`http://localhost/restApis/reservation/single_reserv.php?id=${id}`).then(function (response) {
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
    axios.post('http://localhost/restApis/reservation/create_reserv.php', inputs).then(function (response) {
      console.log(response.data)
      getDatas();

    });
  }

  return (
    <section className="container2">
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h4 className="modal-title text-white">Reservation Data</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearData}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-sm-6 w-50">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="name">Full Name</label>
                      <input value={inputs.name} type="text" className="form-control border-secondary" name="name" onChange={handleChange} />
                      <input value={inputs.id} type="hidden" name="id" />
                    </div>
                  </div>
                  <div className="col-sm-5 my-2">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="email">Email</label>
                      <input type="email" className="form-control border-secondary" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Your Email" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="datetime"> Date & Time</label>
                      <input type="datetime-local" className="form-control datetimepicker-input border-secondary" id="datetime" placeholder="Date & Time"
                        name="datetime"
                        value={inputs.datetime}
                        onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="select1">No Of People</label>
                      <select className="form-select border-secondary" id="select1" name="no_of_people" value={inputs.no_of_people} onChange={handleChange}>
                        <option value="1">People 1</option>
                        <option value="2">People 2</option>
                        <option value="3">People 3</option>
                        <option value="4">People 4</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="mb-3">
                      <label className="form-label text-white" htmlFor="message">Special Request</label>
                      <textarea className="form-control border-secondary" placeholder="Special Request" id="message" style={{ height: '100px' }} name="special_request" value={inputs.special_request} onChange={handleChange}></textarea>
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
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                  <th>No Of People</th>
                  <th>Special Request</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservation ? (
                  reservation.map((reservation, key) => (
                    <tr key={key}>
                      <td>{reservation.id}</td>
                      <td>{reservation.name}</td>
                      <td>{reservation.email}</td>
                      <td>{reservation.datetime}</td>
                      <td>{reservation.no_of_people}</td>
                      <td>{reservation.special_request}</td>
                      <td>
                        <button className="btn btn-primary me-2  ms-2 mt-1" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => getReservation(reservation.id)}>Edit</button>

                        <button className="btn btn-danger bg-danger w-60 me-2  ms-2 mt-1" onClick={() => deleteItems(reservation.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No reservation available.</td>
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

export default Reservation;
