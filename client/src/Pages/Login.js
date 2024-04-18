import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import * as Yup from "yup";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import ReactDOM from "react-dom";

function Login({ setisloggedin }) {
  const [loginDetails, setLoginDetails] = useState({});
  const navigate = useNavigate();

  const [signinUser, { data, loading, error: err2 }] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("jwt", data.signinUser.token);
      setisloggedin(true);
    },
  });
  const [error, setError] = useState({});

  if (loading) {
    <Box>
      <CircularProgress />
      <Typography>loading....</Typography>
    </Box>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSchema.validate(loginDetails, { abortEarly: false });
      let response = await signinUser({ variables: { login: loginDetails } });
      console.log(response);
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

  const userSchema = Yup.object().shape({
    email: string().required("email is required"),
    password: string().required("password is required"),
    // .matches(/[A-Z]/, "Must have number and special characters"),
  });

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {err2 && <Alert severity="error"> {err2.message}</Alert>}
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-semibold mb-6">Enter your details</h3>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500"
        />
        <p>
          {error.email && (
            <div className="text-red-500 mb-4">{error.email}</div>
          )}
        </p>
        <br></br>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-64 focus:outline-none focus:border-blue-500"
        />
        <p>
          {error.password && (
            <div className="text-red-500 mb-4">{error.password}</div>
          )}
        </p>
        <br></br>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-6 py-2 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Login
        </button>
        <br></br>
        <span>Not a user yet ?</span>{" "}
        <Link to="/signup" className="text-blue-500 underline cursor-pointer">
          Signup
        </Link>
      </form>
    </div>
  );
}

export default Login;
