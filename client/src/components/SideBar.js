import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { GET_ALL_USERS } from "../graphql/query";
import UserCard from "./UserCard";
import { Stack } from "@mui/system";
import { useQuery } from "@apollo/client";

function SlideBar({ setisloggedin }) {
  const { loading, data, error } = useQuery(GET_ALL_USERS);
  if (loading) {
    <Box>
      <Typography variant="h6">loading chats...</Typography>
    </Box>;
  }

  if (data) {
    console.log(data.getusers);
  }
  if (error) {
    console.log(error.message);
  }

  const logout = (setisloggedin) => {
    localStorage.removeItem("jwt");
    setisloggedin(false);
  };
  return (
    <Box
      backgroundColor={"#f7f7f7"}
      height="100vh"
      maxWidth="250px"
      padding={"10px"}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography varient="h6">Chat</Typography>

        <LogoutIcon
          onClick={() => {
            logout(setisloggedin);
          }}
        />
      </Stack>

      <Divider />

      {data
        ? data.getusers.map((item) => {
            return <UserCard item={item} />;
          })
        : null}
    </Box>
  );
}

export default SlideBar;
