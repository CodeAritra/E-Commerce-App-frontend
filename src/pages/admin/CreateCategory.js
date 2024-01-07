import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import Modal from "../../components/layout/Modal";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedname, setUpdatedname] = useState("");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  //handle form
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getallcategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //update cat name
  const handleupdatename = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/category/update-category/${selected.slug}`,
        { name: updatedname }
      );
      if (data.success) {
        toast.success(`${updatedname} is updated`);
        setSelected(null);
        setUpdatedname("");
        getallcategories();
        setVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

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

  //delete category
  const handleDelete = async (slug) => {
    try {
      const { data } = await axios.delete(
        `/api/category/delete-category/${slug}`
      );
      if (data?.success) {
        toast.success(`category is deleted`);

        getallcategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  useEffect(() => {
    getallcategories();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handlesubmit={handlesubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedname(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c.slug);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            visible={visible}
            body={
              <CategoryForm
                value={updatedname}
                setValue={setUpdatedname}
                handlesubmit={handleupdatename}
              />
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
