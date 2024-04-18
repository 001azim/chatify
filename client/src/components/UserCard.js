import React from "react";
import { Stack, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";


function UserCard({ item: { id, first_name, last_name } }) {
  
  const navigate = useNavigate();
  
  return (
    <Stack
      direction="row"
      marginTop="10px"
      className="onmove"
      spacing="10px"
    onClick={()=>{navigate(`/${id}/${first_name}`)}} >
      <Avatar src={`https://api.dicebear.com/8.x/personas/svg`} />
      <Typography>
        {first_name} {last_name}
      </Typography>
    </Stack>   
  );
}

export default UserCard;
