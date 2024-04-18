import { Box, Typography } from "@mui/material";
import React from "react";

const MessageCart = ({ text, date,direction }) => {
 
  return (
    <Box display={"flex"} justifyContent={direction}>
        <Box>
            
      <Typography variant="subtitle2" backgrounddColor="white" padding={"5px"} fontSize={"large"}>
        {text} 
      </Typography>
      <Typography variant="caption">{new Date(date).toLocaleDateString}</Typography>
        </Box>
    </Box>
  );
};

export default MessageCart;
