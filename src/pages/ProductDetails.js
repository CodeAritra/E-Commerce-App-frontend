import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Productdetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category);
      console.log(data?.product._id, data?.product.category)
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          {/* <img
            src={`/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          /> */}
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-warning ms-1 ">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4 className="ms-2">Similar Products</h4>
       
         <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}> 
              {/* <img
                src={`/api/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              /> */}
               <div className="card-body">
                <div className="card-name-price">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text"> $ {p.price}</p>
                </div>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <div className="card-name-price">
                <button
                  className="btn btn-warning ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          </div>
          ))}
        </div> 
      </div>
    </Layout>
  );
};

export default ProductDetails;
