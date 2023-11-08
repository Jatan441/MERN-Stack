import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  return (
    <Layout>
      <div className="container row mt-2" style={{ width: "100%" }}>
        <div className="col-md-6">
          {" "}
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product.category.name}</h6>
          {/* <h6>Shipping : {product.shipping}</h6> */}
          <button className="btn btn-secondary ms-1">Add to cart</button>
        </div>
      </div>
      <div className="row" style={{ width: "100%" }}>
        Similar Products
      </div>
    </Layout>
  );
};

export default ProductDetails;
