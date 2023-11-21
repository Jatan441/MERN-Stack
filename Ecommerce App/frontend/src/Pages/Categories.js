import React from "react";
import Layout from "../Components/Layouts/Layout";
import useCategory from "../Components/hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row p-5 d-flex flex-wrap align-self-center">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 text-center">
              <Link
                to={`/category/${c.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="btn btn-dark d-flex justify-content-center align-items-center"
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                >
                  {c.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
