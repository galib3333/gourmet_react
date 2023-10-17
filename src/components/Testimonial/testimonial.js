import React from 'react'
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Carousel from '../Carousel/slider'
const Testimonial = () => {
  return (
    <>
      <Header />
      <div class="container-xxl py-5 bg-dark hero-header mb-5">
                <div class="container text-center my-5 pt-5 pb-4">
                    <h1 class="display-3 text-white mb-3 animated slideInDown">Testimonial</h1>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb justify-content-center text-uppercase">
                            <li class="breadcrumb-item"><a href=".">Home</a></li>
                            <li class="breadcrumb-item"><a href=".">Pages</a></li>
                            <li class="breadcrumb-item text-white active" aria-current="page">Testimonial</li>
                        </ol>
                    </nav>
                </div>
            </div>
      <Carousel />
      <Footer />
      {/* <!-- Back to Top --> */}
      <a href="/testimonial" class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="bi bi-arrow-up"></i></a>
    </>
  )
}

export default Testimonial