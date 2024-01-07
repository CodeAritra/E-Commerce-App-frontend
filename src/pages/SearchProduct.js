import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";

const SearchProduct = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search Products"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.lenght < 1
              ? "No Products Found"
              : `Found ${values?.results?.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                {/* <img
                    src={`/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  /> */}
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">{p.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchProduct;
