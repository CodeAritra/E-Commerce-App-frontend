import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/product/product-search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/product-search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex me-3 mt-1 " role="search" onSubmit={handlesubmit}>
        <input
          className="form-control me-2 fw-bold"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-warning fw-bold" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
