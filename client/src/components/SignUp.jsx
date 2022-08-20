import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let initial = {
    name: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initial);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let result = await fetch("https://beyond-it.herokuapp.com/user/signup", {
        method: "Post",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      if (!result.message) {
        setError("");
        localStorage.setItem("user", JSON.stringify(result.new_user));
        if (result) {
          navigate("/");
        }
      } else if (result.message) {
        setError(result.message);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <h2>{error}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={handleChange}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={handleChange}
        />
        <input type="submit" value="Sign Up" className="signup-button" />
      </form>
    </div>
  );
};

export default SignUp;
