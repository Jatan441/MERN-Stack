import React from "react";
import Layout from "../Components/Layouts/Layout";
import ContactImg from "../img/contact.jpg";
const ContactPage = () => {
  return (
    <Layout title={"Contact-us"}>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 mt-3 text-center">
            <img src={ContactImg} alt="contact" width={"100%"} />
          </div>
          <div className="col-md-4 mt-5 d-flex flex-column gap-3">
            <div className="btn btn-dark">Contact Us</div>
            <p>If any query, feel free to connect us any time</p>
            <p>📧 jatanchoudhary441@gmail.com</p>
            <p>📞 9630167090</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
