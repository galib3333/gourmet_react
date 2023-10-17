import { useState, React, useEffect } from "react";
import Header from '../Header/header'
import Footer from '../Footer/footer'
import axios from "axios";

const Booking = ({ showHeader = true, showFooter = true, showHero = true }) => {
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
            setFormSubmitted(true);
        });
    }
    // const clearData = () => {
    //     setInputs(values => ({ ...values, "id": "", "name": "", "email": "", "datetime": "", "no_of_people": "", "special_request": "" }))
    // }

    const [formSubmitted, setFormSubmitted] = useState(false);
    return (
        <div>
            <div className="container-xxl bg-white p-0">
                {/* <!-- Navbar & Hero Start --> */}
                <div className="container-xxl position-relative p-0">
                    {showHeader && (
                        <Header />
                    )}
                    {showHero && (
                        <div className="container-xxl py-5 bg-dark hero-header mb-5">

                            <div className="container text-center my-5 pt-5 pb-4">
                                <h1 className="display-3 text-white mb-3 animated slideInDown">Booking</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center text-uppercase">
                                        <li className="breadcrumb-item"><a href=".">Home</a></li>
                                        <li className="breadcrumb-item"><a href=".">Pages</a></li>
                                        <li className="breadcrumb-item text-white active" aria-current="page">Booking</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>

                {/* <!-- Navbar & Hero End --> */}


                {/* <!-- Reservation Start --> */}
                <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="row g-0">
                        <div className="col-md-6">
                            <div className="video">
                                <button type="button" className="btn-play" data-bs-toggle="modal" data-src="https://www.youtube.com/embed/xPPLbEFbCAo?si=YIYZOiWBSDQsUQXd" title="YouTube video player" data-bs-target="#videoModal">
                                    <span></span>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 bg-dark d-flex align-items-center">
                            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
                                <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
                                <h1 className="text-white mb-4">Book A Table Online</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" value={inputs.name} onChange={handleChange} />
                                                <input value={inputs.id} type="hidden" name="id" />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Your Email" />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date" id="date3" data-target-input="nearest">
                                                <input type="datetime-local" className="form-control datetimepicker-input" id="datetime" placeholder="Date & Time"
                                                    name="datetime"
                                                    value={inputs.datetime}
                                                    onChange={handleChange} />
                                                <label htmlFor="datetime">Date & Time</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <select className="form-select" id="select1" name="no_of_people" value={inputs.no_of_people} onChange={handleChange}>
                                                    <option value="1">People 1</option>
                                                    <option value="2">People 2</option>
                                                    <option value="3">People 3</option>
                                                    <option value="4">People 4</option>
                                                </select>
                                                <label htmlFor="select1">No Of People</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Special Request" id="message" style={{ height: '100px' }} name="special_request" value={inputs.special_request} onChange={handleChange}></textarea>
                                                <label htmlFor="message">Special Request</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Book Now</button>
                                        </div>
                                    </div>
                                </form>
                                {formSubmitted && (
                                    <div className="alert alert-success mt-3 text-center rounded">
                                        Form submitted successfully!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Youtube Video</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* <!-- 16:9 aspect ratio --> */}
                                <div className="ratio ratio-16x9">
                                    <iframe className="embed-responsive-item" src="" id="video" allowFullScreen allowscriptaccess="always"
                                        allow="autoplay" title='video'></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Reservation Start --> */}
                {showFooter && (
                    <Footer />
                )}
                {/* <!-- Back to Top --> */}
                <a href="/booking" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
            </div>

        </div>
    )
}
export default Booking
