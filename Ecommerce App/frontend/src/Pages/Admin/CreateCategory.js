import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  // states for update
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // handle update form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/category/create-category`,
      { name }
    );
    if (data.success) {
      getAllCategory();
      toast.success(data.message);
    } else {
      toast.error(data.message);
      getAllCategory();
    }
    try {
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // handle delete  form
  const deleteHandleSubmit = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const hadleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        getAllCategory();
        toast.success(data.message);
        setSelected(null);
        setVisible(false);
      } else {
        toast.error(data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };
  return (
    <Layout title="Admin Dashboard - Create Category">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead className="w-75">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actons</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {categories?.map((c) => (
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td
                          className="btn btn-primary m-1"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </td>
                        <td
                          className="btn btn-danger m-1"
                          onClick={() => deleteHandleSubmit(c._id)}
                        >
                          Delete
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={hadleUpdateSubmit}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
