import { React, useEffect, useState } from 'react';
import { fetchServices } from '../../api/services'
import Header from '../Header/header'
import Footer from '../Footer/footer.js'

const Service = () => {
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchServices();
                setServiceData(data);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

  return (
    <>
        <div className="container-xxl bg-white p-0">
        {/* <!-- Navbar & Hero Start --> */}
        <div className="container-xxl position-relative p-0">
            <Header/>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container text-center my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Services</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb justify-content-center text-uppercase">
                            <li className="breadcrumb-item"><a href=".">Home</a></li>
                            <li className="breadcrumb-item"><a href=".">Pages</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">Service</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
        {/* <!-- Navbar & Hero End --> */}


        {/* <!-- Service Start --> */}
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Our Services</h5>
                    <h1 className="mb-5">Explore Our Services</h1>
                </div>
                <div className="row g-4 ">
                {serviceData.map((service) => (
                    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="service-item rounded pt-3 h-100">
                            <div className="p-4">
                                <i className={`${service.icon} text-primary mb-4`}></i>
                                <h5>{service.name}</h5>
                                <p className='text-justify'>{service.description}</p>
                            </div>
                        </div>
                    </div>
                      ))}
                </div>
            </div>
        </div>
        {/* <!-- Service End --> */}

        <Footer/>

        {/* <!-- Back to Top --> */}
        <a href="/service" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>

    </>
  )
}

export default Service