import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Dashboard from "./Dashboard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DashboardCard from "./DashboardCard";
import axios from "axios";
import Videoplayerview from "./Videoplayerview";
import CircularProgress from "@mui/material/CircularProgress";
import { config } from "../App";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Videopage() {
  const params = useParams();
  const [vid, setVid] = useState();
  const [allVideoList, setAllVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getAllVideos();
    getseletedvidoeo(params.id);
  }, [params.id]);

  const getAllVideos = async () => {
    let response;
    try {
      setisLoading(true);
      response = await axios.get(
        `${config.endpoint}?genres=All`
      );
      setAllVideoList(response.data.videos);
      setisLoading(false);
    } catch (e) {
      setisLoading(false);
      console.log(e);
    }
  };

  const getseletedvidoeo = async (id) => {
    // console.log("Id from getseletedvidoeo", id);
    let response;
    try {
      setisLoading(true);
      response = await axios.get(

        `${config.endpoint}/${id}`
      );
      setVid(response.data);
      setisLoading(false);
    } catch (e) {
      setisLoading(false);
      console.log(e);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "4rem",
          backgroundColor: "rgb(32, 32, 32)",
          display: "block",
        }}
      >
        <Box
          sx={{
            display: "flex",
            px: "1rem",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Link to="/">
            <Box sx={{ mt: "1.3rem" }}>
              <img src="../Logosvg.svg" alt="Logosvg" />
            </Box>
          </Link>
        </Box>
      </Box>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "500px",
            justifyContent: "center",
            alignItems: "center",
          }}
          color="inherit"
        >
          <CircularProgress />
        </Box>
      ) : !vid ? (
        <></>
      ) : (
        <Videoplayerview video={vid} />
      )}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            height: "500px",
            justifyContent: "center",
            alignItems: "center",
          }}
          color="inherit"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, mx: 10, mt: 10 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            alignItems="stretch"
            direction="row"
            justifyContent="center"
          >
            {!allVideoList ? (
              <></>
            ) : (
              allVideoList.map((vid, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  key={vid._id}
                  sx={{ backgroundColor: "transparent" }}
                >
                  <Item
                    sx={{
                      p: 0,
                      backgroundColor: "transparent",
                      boxShadow: 0,
                    }}
                  >
                    {!vid ? <></> : <DashboardCard video={vid} />}
                  </Item>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Videopage;
