import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useAuth();

  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/auth/orders");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
            <p>{JSON.stringify(orders,null,4)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
