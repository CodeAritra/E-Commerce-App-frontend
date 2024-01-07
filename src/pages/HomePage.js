import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setcart] = useCart();

  const navigate = useNavigate();

  //get all categories
  const getallcategories = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallcategories();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //filter by cat
  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/product/product-filter", {
        checked,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //get total
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/product/product-count");
      setTotal(data?.total);
      console.log(total);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* banner image */}
      {/* <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* banner image */}
      <div className="row ms-2 mb-4 home-page">
        <div className="col-md-2 mt-5 filters">
          <h4 className="text-center">Filter by Category</h4>
          {/* radio button */}
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <div class="mb-3 form-check ">
                <input
                  type="checkbox"
                  class="form-check-input"
                  key={c._id}
                  onChange={(e) => handlefilter(e.target.checked, c._id)}
                />
                <label>{c.name}</label>
              </div>
            ))}
          </div>
          {/* filter price */}
          <h4 className="text-center">Filter by Price</h4>
          {/* radio button */}
          <div className="d-flex flex-column">
            {Prices.map((p) => (
              <div class="mb-3 form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={p.array}
                  key={p._id}
                  onChange={(e) => console.log(setRadio(e.target.value, p._id))}
                />

                <label>{p.name}</label>
              </div>
            ))}
          </div>

          {/* //reset filters */}
          <div className="d-flex flex-column">
            <button
              className="btn btn-warning"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9 mt-4">
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap mt-5 ms-5">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                {/* <img
                    src={`/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  /> */}
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text card-price">{p.price}</p>
                  </div>
                  <p className="card-text">{p.description}</p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-warning ms-1"
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setcart([...cart, p]);
                        toast.success("Added to cart");
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More..."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
