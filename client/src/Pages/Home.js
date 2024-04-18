import React from "react";
import { Box } from "@mui/system";
import SlideBar from "../components/SideBar";
import Welcome from "../components/Welcome";
import { Route, Routes } from "react-router-dom";
import ChatScreen from "../components/ChatScreen";
import Login from "./Login";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/signin" element={<Login />} /> 
      <Route path="/:id/:name" element={<ChatScreen />} />
    </Routes>
  );
};

function Home({ setisloggedin }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"Center"}
      alignItems={"center"}
      sx={{ flexGrow: 1 }}
    >
      <SlideBar setisloggedin={setisloggedin} />
      <AllRoutes setisloggedin={setisloggedin} />
    </Box>
  );
}

export default Home;
