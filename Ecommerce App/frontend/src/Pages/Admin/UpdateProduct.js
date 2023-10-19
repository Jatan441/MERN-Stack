/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState(false);
  const [category, setCategory] = useState();
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setPhoto(data.product.photo);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("price", price);
      photo && productData.append("photo", photo);
        console.log(productData);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        { productData }
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting updating product");
    }
  };

  //   delete product
  //   const handleDelete = async () => {
  //     try {
  //       let answer = prompt("Are you sure want to delete this product");
  //       if (!answer) return;
  //       const { data } = await axios.delete(
  //         `${process.env.REACT_APP_API}/api/v1/category/delete-product/${id}`
  //       );
  //       if (data.success) {
  //         toast.success(data.message);
  //         navigate("/dashboard/admin/products");
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Something went wrong in deleting product");
  //     }
  //   };
  return (
    <Layout title="Admin Dashboard - Create Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <form onSubmit={handleUpdate}>
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  value={category?.name}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3 w-100 ">
                  <label
                    htmlFor="upload image"
                    className="btn btn-outline-secondary col-md-12"
                  >
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product Photo"
                        height="200px"
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                        alt="Product Photo"
                        height="200px"
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="w-100  form-control"
                    rows="3"
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    placeholder="Enter quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Select
                    className="form-select mb-3"
                    bordered={false}
                    placeholder="Select shipping "
                    size="large"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value={false}>No</Option>
                    <Option value={true}>Yes</Option>
                  </Select>
                </div>
                <div className="mb-3 ">
                  <button className=" btn btn-primary m-1">
                    UPDATE PRODUCT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
