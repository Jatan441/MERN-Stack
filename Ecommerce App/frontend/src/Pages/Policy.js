import React from "react";
import Layout from "../Components/Layouts/Layout";
import PrivacyImg from "../img/privacy.png";
const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 mt-3 text-center">
            <img src={PrivacyImg} alt="privacy" width={"100%"} />
          </div>
          <div className="col-md-4 mt-5 d-flex flex-column gap-3">
            <div className="btn btn-dark">Privacy Policy</div>
            <p>📧 jatanchoudhary441@gmail.com</p>
            <p>📞 9630167090</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
