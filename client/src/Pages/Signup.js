import React, { useState } from "react";
import * as Yup from "yup";
import { string } from "yup";
import "../App.css";
import { SIGN_UP } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState({});
  const [signUpDetails, setsignUpDetails] = useState({});

  const [signupUser, { data: signupdata, loading: l1, error: err1 }] = useMutation(SIGN_UP);

  const navigate = useNavigate();

  if (l1) {
    return (
      <Box
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        height={"100vh"}
      >
        <CircularProgress />
        <Typography variant="h6">Authenticating...</Typography>
      </Box>
    );
  }

  const userSchema = Yup.object().shape({
    first_name: string().required("first_name is required"),
    last_name: string().required("last_name is required"),
    email: string().required("email is required"),
    password: string()
      .required("password is required")
      .matches(/[A-Z]/, "Must have number and special characters"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // form validation
      await userSchema.validate(signUpDetails, { abortEarly: false });
      console.log(signUpDetails);
      // api call apollo client
      const response = await signupUser({
        variables: { userNew: signUpDetails },
      });
      console.log(response);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      if (error.inner) {
        const newError = {};
        error.inner.forEach((eachError) => {
          newError[eachError.path] = eachError.message;
        });
        setError(newError);
      }
    }
  };
  const handleChange = (e) => {
    setsignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {signupdata && (
        <Alert severity="success">
          {signupdata.signupUser.first_name}{signupdata.signupUser.last_name} Signed up successfully!
        </Alert>
      )} 
       {err1 && <Alert severity="error">{err1.message}</Alert>}
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-semibold mb-6">Enter your details</h3>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={signUpDetails.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500"
        />
        <p>
          {" "}
          {error.email && (
            <div className="text-red-500 mb-4">{error.email}</div>
          )}
        </p>
        <br></br>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={signUpDetails.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500"
        />
        <p>
          {error.password && (
            <div className="text-red-500 mb-4">{error.password}</div>
          )}
        </p>
        <br></br>{" "}
        <input
          type="text"
          placeholder="first_name"
          name="first_name"
          value={signUpDetails.first_name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500"
        />
        <p>
          {" "}
          {error.first_name && (
            <div className="text-red-500 mb-4">{error.first_name}</div>
          )}
        </p>
        <br></br>
        <input
          type="text"
          placeholder="last_name"
          name="last_name"
          value={signUpDetails.last_name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500"
        />
        <p>
          {" "}
          {error.last_name && (
            <div className="text-red-500 mb-4">{error.last_name}</div>
          )}
        </p>
        <br></br>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
