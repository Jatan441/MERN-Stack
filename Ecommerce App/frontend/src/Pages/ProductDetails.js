import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // get products
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container m-2">
        <div className=" row mt-2">
          <div className="col-md-6">
            <div>
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            </div>
          </div>

          <div className="col-md-6 ">
            <h6 className="text-center">Product Details</h6>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : {product.price}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <button
              className="btn btn-secondary ms-1"
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Item added to cart");
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
        <hr />
        <div className="row " style={{ width: "100%" }}>
          <h4>Similar Products</h4>
          <div className="d-flex flex-wrap flex-row">
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{ width: "230px" }}>
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.className}
                  height={"200px"}
                  width={"200px"}
                />
                <div className="card-body bg-body-secondary">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">$ {p.price}</p>
                  </div>
                  <p className="card-text">
                    {p.description.length < 60
                      ? p.description
                      : `${p.description.substring(0, 60)}...`}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-outline-warning ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item added to cart");
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                      }}
                      title="Add to cart"
                    >
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
