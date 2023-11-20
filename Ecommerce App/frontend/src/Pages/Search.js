import React from "react";
import { useSearch } from "../context/search";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title="Search results">
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {values?.results < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results?.map((p) => (
              <div className="card m-2" style={{ width: "16.8dvw" }}>
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

export default Search;
