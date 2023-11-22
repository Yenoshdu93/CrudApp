import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateUser = () => {
  const { params } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [data, setData] = useState();

  useEffect(() => {
    const getEmployees = async () => {
      const result = await axios.get(`/employee/${params}`);
      const dataResult = await result.data;
      setFormData(dataResult);
    };
    getEmployees();
  }, []);

  const validateEmail = (email) => {
    // Basic email validation, you can use a more robust validation if needed
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear validation errors on input change
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate first name
    if (formData.firstName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "First name is required",
      }));
    }

    // Validate last name
    if (formData.lastName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Last name is required",
      }));
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email address",
      }));
    }

    // Use the latest state of errors for the check
    setErrors((prevErrors) => {
      // Check if there are any validation errors
      const hasErrors = Object.values(prevErrors).some((error) => error !== "");

      // If there are no errors, post data through Axios
      if (!hasErrors) {
        // Assuming you have a backend API endpoint to handle the POST request

        console.log("data updated");
        axios.post("/save", formData);
        navigate("/");
      }

      return prevErrors;
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">My Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <input
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        />
      </form>
    </div>
  );
};

export default UpdateUser;
