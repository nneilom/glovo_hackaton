import { Box, Grid } from "@mui/material";
import React from "react";
import Read from "./Read";

const ReadPage = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Read />
      </Grid>
    </Box>
  );
};

export default ReadPage;
