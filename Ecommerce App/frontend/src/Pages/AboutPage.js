import React from "react";
import Layout from "../Components/Layouts/Layout";
import AboutImg from "../img/about.jpeg"
const AboutPage = () => {
  return (
    <Layout title={"About"}>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 mt-3 text-center">
            <img src={AboutImg} alt="about" width={"100%"} />
          </div>
          <div className="col-md-4 mt-5 d-flex flex-column gap-3">
            <div className="btn btn-dark">About Us</div>
            <p>📧 jatanchoudhary441@gmail.com</p>
            <p>📞 9630167090</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
