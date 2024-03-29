import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Admin Dashboard">
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="card p-3">
              <h4>Admin Name : {auth?.user?.name}</h4>
              <h4>Admin Email : {auth?.user?.email}</h4>
              <h4>Admin Contact : {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
