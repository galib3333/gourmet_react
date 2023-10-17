import { React, useEffect, useState } from 'react';
import { fetchHomeTeam } from '../../api/team';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import CounterUp from '../CounterUp/counterUp';

const About = ({ showHeader = true, showFooter = true, showTeam = true, showHero = true}) => {
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
                            <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center text-uppercase">
                                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                                    <li className="breadcrumb-item"><a href="./">Pages</a></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    )}
                </div>
                
                {/* <!-- Navbar & Hero End --> */}


                {/* <!-- About Start --> */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6">
                                <div className="row g-3">
                                    <div className="col-6 text-start">
                                        <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src="assets/img/about-1.jpg" alt='' />
                                    </div>
                                    <div className="col-6 text-start">
                                        <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="assets/img/about-2.jpg" style={{ marginTop: '25%' }} alt='' />
                                    </div>
                                    <div className="col-6 text-end">
                                        <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="assets/img/about-3.jpg" alt='' />
                                    </div>
                                    <div className="col-6 text-end">
                                        <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="assets/img/about-4.jpg" alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
                                <h1 className="mb-4">Welcome to <i className="fa fa-utensils text-primary me-2"></i>Gourmet</h1>
                                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>
                                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <div className="row g-4 mb-4">
                                    <div className="col-sm-6">
                                        <CounterUp start={0} end={15} duration={2} suffix="Years of" className="" />
                                        <div className="ps-4">
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <CounterUp start={0} end={50} duration={2} suffix="Popular" className="" />
                                        <div className="ps-4">
                                        </div>
                                    </div>
                                </div>
                                <a className="btn btn-primary py-3 px-5 mt-2" href="./">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- About End --> */}

                {showTeam && (
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
                                            <img className="img-fluid" src={teamMember.imageSrc} alt="" />
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
                )}
                {/* <!-- Team End --> */}
                
                {showFooter && (
                    <Footer />
                )}

                {/* <!-- Back to Top --> */}
                <a href="./about" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
            </div>
        </div>
    )
}

export default About