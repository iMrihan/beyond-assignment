import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AdminPanel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();
  const getProducts = () => {
    axios
      .get("http://localhost:3005/user/admin-panel", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((error) => {
        alert("You cannot the access this resource this is only for admin");
        navigate("/");
      });
  };

  console.log(products);
  return (
    <div className="products-list">
      <h3>User-List</h3>

      <ul>
        <li>S.No</li>
        <li>Email</li>
        <li>Role</li>
      </ul>

      {products.length > 0 ? (
        products.map((el, index) => (
          <ul key={el._id}>
            <li>{index + 1}</li>
            <li>{el.email}</li>
            <li>{el.userType}</li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
}
