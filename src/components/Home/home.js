import { React, useEffect, useState } from 'react';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Carousel from '../Carousel/slider';
import { Link } from 'react-router-dom';
import Menu from '../Menu/menu'
import { fetchHomeTeam } from '../../api/team';
import About from '../About/about';
import Booking from '../Booking/booking';
import { fetchHomeService } from '../../api/services';
const Home = () => {

    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHomeTeam();
                setTeamData(data);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchHomeService();
                setServiceData(data);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-xxl bg-white p-0">
            {/* <!-- Navbar & Hero Start --> */}
            <div className="container-xxl position-relative p-0">
                <Header />
                <div className="container-xxl py-5 bg-dark hero-header mb-5">
                    <div className="container my-5 py-5">
                        <div className="row align-items-center g-5">
                            <div className="col-lg-6 text-center text-lg-start">
                                <h1 className="display-3 text-white animated slideInLeft">Enjoy Our<br />Delicious Meal</h1>
                                <p className="text-white animated slideInLeft mb-4 pb-2">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <Link to="/booking" className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft" >Book A Table</Link>
                            </div>
                            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                                <img className="img-fluid" src="assets/img/hero.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Navbar & Hero End --> */}

                {/* <!-- Service Start --> */}
                <div className="container-xxl py-1">
                    <div className="container">
                        <div className="row g-4">
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

                {/* <!-- About Start --> */}
                <About showHeader={false} showFooter={false} showTeam={false} showHero={false} />

                {/* <!-- About End --> */}
                <Menu showHeader={false} showFooter={false} />

                {/* <!-- Reservation Start --> */}
                <Booking showHeader={false} showFooter={false} showHero={false} />
                {/* <!-- Reservation Start --> */}

                {/* <!-- Team Start --> */}
                <div className="container-xxl pt-5 pb-3">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
                            <h1 className="mb-5">Our Master Chefs</h1>
                        </div>
                        <div className="row g-4">
                            {teamData.map((teamMember) => (
                                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="team-item text-center rounded overflow-hidden">
                                        <div className="rounded-circle overflow-hidden m-4">
                                            <img className="img-fluid" src={teamMember.imageSrc} alt="{teamMember.name}" />
                                        </div>
                                        <h5 className="mb-0">{teamMember.name}</h5>
                                        <small>{teamMember.designation}</small>
                                        <div className="d-flex justify-content-center mt-3">
                                            <a className="btn btn-square btn-primary mx-1" href="./"><i className="fab fa-facebook-f"></i></a>
                                            <a className="btn btn-square btn-primary mx-1" href="./"><i className="fab fa-twitter"></i></a>
                                            <a className="btn btn-square btn-primary mx-1" href="./"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <!-- Team End --> */}
                {/* <!-- Testimonial Start --> */}

                <Carousel />

                {/* <!-- Testimonial End --> */}
                <Footer />
                {/* <!-- Back to Top --> */}
                <a href="./" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
            </div>
        </div>
    )
}

export default Home