import { Box, Typography, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function Welcome() {
  return (
    <Stack justifyContent="Center" alignItems="center" flexGrow={1}>
      <Typography variant="h2">Welcome</Typography>
    </Stack>
  );
}

export default Welcome;
