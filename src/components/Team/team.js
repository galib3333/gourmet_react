import React, { useEffect, useState } from 'react';
import { fetchTeam } from '../../api/team';
import Header from '../Header/header'
import Footer from '../Footer/footer'

const Team = () => {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTeam();
                setTeamData(data);
                
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div class="container-xxl bg-white p-0">
                {/* <!-- Navbar & Hero Start --> */}
                <Header />
                <div class="container-xxl py-5 bg-dark hero-header mb-5">
                    <div class="container text-center my-5 pt-5 pb-4">
                        <h1 class="display-3 text-white mb-3 animated slideInDown">Our Team</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center text-uppercase">
                                <li class="breadcrumb-item"><a href="./">Home</a></li>
                                <li class="breadcrumb-item"><a href="./">Pages</a></li>
                                <li class="breadcrumb-item text-white active" aria-current="page">Team</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <!-- Navbar & Hero End --> */}
            {/* <!-- Team Start --> */}
            <div class="container-xxl pt-5 pb-3">
                <div class="container">
                    <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 class="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
                        <h1 class="mb-5">Our Master Chefs</h1>
                    </div>
                    <div class="row g-4">
                    {teamData.map((teamMember) => (
                        <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div class="team-item text-center rounded overflow-hidden">
                                <div class="rounded-circle overflow-hidden m-4">
                                    <img class="img-fluid" src={teamMember.imageSrc} alt="{teamMember.name}"/>
                                </div>
                                <h5 class="mb-0">{teamMember.name}</h5>
                                <small>{teamMember.designation}</small>
                                <div class="d-flex justify-content-center mt-3">
                                    <a class="btn btn-square btn-primary mx-1" href="."><i class="fab fa-facebook-f"></i></a>
                                    <a class="btn btn-square btn-primary mx-1" href="."><i class="fab fa-twitter"></i></a>
                                    <a class="btn btn-square btn-primary mx-1" href="."><i class="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                     ))}
                    </div>
                </div>
            </div>
            {/* <!-- Team End --> */}

            <Footer />
            {/* <!-- Back to Top --> */}
            <a href="/team" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
        </div>
        
  );
};
export default Team