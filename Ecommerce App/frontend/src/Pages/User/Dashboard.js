import React from "react";
import Layout from "../../Components/Layouts/Layout";
import UserMenu from "../../Components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Dashboard - Ecommerce App">
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9 mt-3">
            <div className="card  p-3">
              <h4>User Name : {auth?.user?.name}</h4>
              <h4>User Email : {auth?.user?.email}</h4>
              <h4>User Contact : {auth?.user?.phone}</h4>
              <h4>User Address : {auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
