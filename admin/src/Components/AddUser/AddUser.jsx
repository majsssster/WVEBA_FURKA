import React, { useState } from "react";
import "./AddUser.css";

const AddUser = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const addUser = async () => {
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();

      if (data.success) {
        alert("User Added Successfully!");
      } else {
        alert("Failed to Add User. Please check the server response for details.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Meno používateľa</p>
        <input
          value={userDetails.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Zadajte meno"
        />
        <p>Email</p>
        <input
          value={userDetails.email}
          onChange={handleChange}
          type="email" 
          name="email"
          placeholder="Zadajte emailovú adresu"
        />
        <p>Heslo</p>
        <input
          value={userDetails.password}
          onChange={handleChange}
          type="password" 
          name="password"
          placeholder="Zadajte heslo"
        />
      </div>
      <div>
        <button onClick={addUser} className="addproduct-btn">
          Pridaj do zoznamu
        </button>
      </div>
    </div>
  );
};

export default AddUser;
