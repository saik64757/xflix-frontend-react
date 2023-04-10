import React, { useEffect, useState } from "react";
import Header from "./Header";
import GenrePanel from "./Genre_Panel";
import Dashboard from "./Dashboard";
import axios from "axios";
import Box from "@mui/material/Box";
import { generateUtilityClass, textFieldClasses } from "@mui/material";
import { Link, Route, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { config } from "../App";

// https://47f9315c-7a9e-467c-9e9f-c09f960f9bb6.mock.pstmn.io

function Landingpage(props) {
  const [videos, setVideos] = useState();
  const [filteredvideos, setfilteredvideos] = useState();
  const [debounceTimeout, setdebounceTimeout] = useState(0);
  const [sortType, setsortType] = useState(["", "Release date"]);
  const [allGeneres, setallGeneres] = useState([
    "All",
    "Education",
    "Sports",
    "Comedy",
    "LifeStyle",
    "Movies",
  ]);
  const [selectedGenere, setselectedGenere] = useState(["All"]);
  const [allContentrating, setallContentrating] = useState([
    "All age group",
    "7+",
    "12+",
    "16+",
    "18+",
  ]);
  const [selectedContentrating, setselectedContentrating] = useState([
    "All age group",
  ]);
  const [isLoading, setisLoading] = useState(false);

  // initial datafetch starts here
const performApicall = async () => {
    // let url = `https://0cec8d3e-3ef8-4bcd-bf50-5f0816d927e4.mock.pstmn.io/v1/videos?genres=All`;
    // let url = `https://xflix-backend-dig2.onrender.com/v1/videos?genres=All`;
    let url = `${config.endpoint}?genres=All`;
    try {
      setisLoading(true);
      let data = await axios.get(url);
      setVideos(data.data.videos);
      setfilteredvideos(data.data.videos);
      props.setvids(data.data.videos);
      setisLoading(false);
      return data;
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  // initial datafetch ends here

  //OnSearch perform ALI call
  const performSerch = async (text) => {
    if (!text) {
      performApicall();
      return;
    }
    try {
      setisLoading(true);
      let response = await axios.get(
        // `https://0cec8d3e-3ef8-4bcd-bf50-5f0816d927e4.mock.pstmn.io/v1/videos?title=${text}`
        // `https://xflix-backend-dig2.onrender.com/v1/videos?title=${text}`
        `${config.endpoint}?title=${text}`
      );
      console.log("response from search", response.data);
      setVideos(response.data.videos);
      setfilteredvideos(response.data.videos);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };
  //OnSearch perform ALI call

  useEffect(() => {
    const onLoadHandler = async () => {
      let responsedata = await performApicall();
    };
    onLoadHandler();
  }, []);

  const debounceSearch = (text, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      performSerch(text);
    }, debounceTimeout);
    setdebounceTimeout(timeout);
  };

  function getFilteedvideosBygenere(allvideos, seletedgenere) {
    // console.log("allvideos",allvideos)
    // console.log("seletedgenere",seletedgenere)
    if (seletedgenere.includes("All")) return allvideos;
    let filteredVideos = [];

    filteredVideos = allvideos.filter(function (item) {
      for (let key in seletedgenere) {
        if (seletedgenere[key] === item.genre) return true;
      }
      return false;
    });
    return filteredVideos;
  }

  async function handleGenereChange(genre) {
    setfilteredvideos([]);
    let selecGeneres = [...selectedGenere];
    let uniqueFilters = new Set(selecGeneres);
    selecGeneres = [...uniqueFilters];

    if (genre === "All") {
      if (selecGeneres.includes(genre)) {
      } else {
        selecGeneres = ["All"];
      }
    } else {
      if (selecGeneres.includes(genre)) {
        selecGeneres = selecGeneres.filter(
          (ele) => ele !== "All" && ele !== genre
        );
      } else {
        selecGeneres = selecGeneres.filter((ele) => ele !== "All");
        selecGeneres.push(genre);
      }
    }
    uniqueFilters = new Set(selecGeneres);
    selecGeneres = [...uniqueFilters];
    if (selecGeneres.length === 0) {
      selecGeneres.push("All");
    }
    setselectedGenere(selecGeneres);
    let filteredgenereVideos = getFilteedvideosBygenere(videos, selecGeneres);
    setfilteredvideos((prev) => {
      let as1 = new Set([...filteredgenereVideos]);
      let filteed = [...as1];
      return filteed;
    });
  }

  function filteredContentVideos(allvideos, selConrating) {
    // console.log("selConrating",selConrating)
    if (selConrating.includes("All age group")) return allvideos;
    let filteredVideos = [];

    filteredVideos = allvideos.filter(function (item) {
      for (let key in selConrating) {
        if (selConrating[key] === item.contentRating) return true;
      }
      return false;
    });
    return filteredVideos;
  }

  async function handleContentChange(ContentRating) {
    setfilteredvideos([]);
    let selConrating = [...selectedContentrating];
    let uniqueFilters = new Set(selConrating);
    selConrating = [...uniqueFilters];

    if (ContentRating === "All age group") {
      if (selConrating.includes(ContentRating)) {
      } else {
        selConrating = ["All age group"];
      }
    } else {
      if (selConrating.includes(ContentRating)) {
        selConrating = selConrating.filter(
          (ele) => ele !== "All age group" && ele !== ContentRating
        );
      } else {
        selConrating = selConrating.filter((ele) => ele !== "All age group");
        selConrating.push(ContentRating);
      }
    }
    uniqueFilters = new Set(selConrating);
    selConrating = [...uniqueFilters];
    if (selConrating.length === 0) {
      selConrating.push("All age group");
    }

    setselectedContentrating(selConrating);
    let filtConVideos = filteredContentVideos(videos, selConrating);
    setfilteredvideos((prev) => {
      let as1 = new Set([...prev, ...filtConVideos]);
      let filteed = [...as1];
      return filteed;
    });
  }

  // console.log(videos)
  async function handlesort(sortType) {
    console.log(sortType);
    let filtvideos = filteredvideos;
    setsortType(sortType);
    if (sortType === "Release date") {
      let sortedvidoesbydate = filtvideos.sort((v1, v2) =>
        new Date(v1.releaseDate).getTime() < new Date(v2.releaseDate).getTime()
          ? 1
          : new Date(v1.releaseDate).getTime() >
            new Date(v2.releaseDate).getTime()
          ? -1
          : 0
      );
      console.log(sortedvidoesbydate);
      setfilteredvideos(sortedvidoesbydate);
      return;
    } else if (sortType === "View_Count") {
      let sortedvidoesbyview = filtvideos.sort((v1, v2) =>
        v1.viewCount < v2.viewCount ? 1 : v1.viewCount > v2.viewCount ? -1 : 0
      );
      console.log(sortedvidoesbyview);
      setfilteredvideos(sortedvidoesbyview);
      return;
    }
  }

  return (
    <Box>
      <Header getdata={debounceSearch} setVideos={setVideos}/>
      <GenrePanel
        generes={allGeneres}
        selectedGenere={selectedGenere}
        handleGenereChange={handleGenereChange}
        allContentrating={allContentrating}
        selectedContentrating={selectedContentrating}
        handleContentChange={handleContentChange}
        handlesort={handlesort}
        setsortType={setsortType}
      />
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
        <Dashboard videos={filteredvideos} performApicall={performApicall}/>
      )}
    </Box>
  );
}

export default Landingpage;
