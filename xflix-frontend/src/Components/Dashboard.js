import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import "./Dashboard.css";
import Header from "./Header";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Dashboard({ videos }) {
  return (
    <>
      <Box sx={{ flexGrow: 1, mx: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          alignItems="stretch"
          direction="row"
          justifyContent="center"
        >
          {!videos ? (
            <></>
          ) : (
            videos.map((video, idx) => (
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                key={video._id}
                sx={{ backgroundColor: "transparent" }}
              >
                <Item
                  sx={{
                    p: 0,
                    mt: 1,
                    backgroundColor: "transparent",
                    boxShadow: 0,
                  }}
                >
                  <DashboardCard video={video} />
                </Item>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
