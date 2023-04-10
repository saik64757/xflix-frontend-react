import "./Videoplayerpage.css";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { getdiff } from "./DashboardCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { config } from "../App";

function Videoplayerview({ video }) {
  const [selectVideo, setSelectVideo] = useState({});
  const [loading, setLoading] = useState(false);
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const params = useParams();

  const fetchVideoById = async () => {
    console.log("id from fetchVideoById", params.id);
    setLoading(true);
    try {
      const response = await axios.get(`${config.endpoint}/${params.id}`);
      const data = await response.data;
      console.log(data);
      setSelectVideo(data);
      setUpVote(data.votes.upVotes);
      setDownVote(data.votes.downVotes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateViews = async () => {
    const response = await axios.patch(`${config.endpoint}/${params.id}/views`);
    return response;
  };

  useEffect(() => {
    fetchVideoById();
    updateViews();
  }, []);

  const patchVoteData = async (vote) => {
    const voteData = {
      vote: vote,
      change: "increase",
    };

    try {
      const response = await axios.patch(
        `${config.endpoint}/${params.id}/votes`,
        voteData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVote = () => {
    setUpVote(upVote + 1);
    patchVoteData("upVote");
  };

  const handleDownVote = () => {
    setDownVote(downVote - 1);
    patchVoteData("downVote");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "transparent",
          height: "0",
          justifyContent: "center",
          position: "relative",
          pb: "56.25%",
          pt: "25px",
          mx: "40px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            p: 5,
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          {" "}
          <iframe
            title="W3Schools Free Online Web Tutorials"
            src={`https://${video.videoLink}`}
            width="100%"
            height="100%"
            className="iframe-main"
          ></iframe>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              borderBottom: 1,
              borderColor: "primary.main",
            }}
          >
            <Box>
              <Typography variant="h5" component="h5" sx={{ color: "white" }}>
                {video.title}
              </Typography>
              <Box sx={{ display: "flex", color: "white", opacity: 0.4 }}>
                <Typography variant="h6" gutterBottom sx={{ pr: 2 }}>
                  <span>{video.viewCount}</span> views
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    pr: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ mx: 1, mb: "3px" }}>
                    <CircleIcon sx={{ fontSize: "small" }} />
                  </Box>
                  <Box>{video.genre}</Box>
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    pr: 2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ mx: 1, mb: "3px" }}>
                    <CircleIcon sx={{ fontSize: "small" }} />
                  </Box>
                  <Box>{getdiff(video.releaseDate)}</Box>
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                style={{ textTransform: "none" }}
                size="medium"
                sx={{ color: "white", mx: 1 }}
                variant="contained"
                onClick={handleUpVote}
              >
                <ThumbUpIcon sx={{ fontSize: "medium", mr: "6px" }} />
                {/* {video.votes.upVotes} */}
                {/* {video.votes ? video["votes"]["upVotes"] : null} */}
                {upVote}
              </Button>
              <Button
                style={{ textTransform: "none" }}
                size="medium"
                sx={{ color: "white", mx: 1 }}
                variant="contained"
                onClick={handleDownVote}
              >
                <ThumbDownIcon sx={{ fontSize: "medium", mr: "6px" }} />
                {/* {video.votes.downVotes} */}
                {/* {video.votes ? video["votes"]["downVotes"] : null} */}
                {downVote}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Videoplayerview;
