import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  //get all categories
  const getallcategories = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ");
    }
  };

  useEffect(() => {
    getallcategories();
  }, []);

  //update product
  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/product/update-product/${params.slug}`,
        {
          name,
          description,
          category,
          price,
          quantity,
        }
      );
      if (data?.success) {
        toast.success("Product updated Successfully");

        navigate("/dashboard/admin/product");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in updating product");
    }
  };

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(`/api/product/delete-product/${id}`);
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Dashboard - Update Products"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Products</h1>
              <div className="m-1 w-75">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                >
                  <option selected>Select a category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setShipping(e.target.value);
                    }}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary  ms-2"
                    onClick={handleupdate}
                  >
                    UPDATE PRODUCT
                  </button>
                  <button
                    className="btn btn-danger  ms-2"
                    onClick={handleDelete}
                  >
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateProduct;
