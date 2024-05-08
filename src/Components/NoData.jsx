import React from "react";
import { Box, Typography } from "@mui/material";

const NoData = () => {
  return (
    <Box textAlign="center" py={4}>
      <Typography variant="h6">No data available</Typography>
    </Box>
  );
};

export default NoData;
