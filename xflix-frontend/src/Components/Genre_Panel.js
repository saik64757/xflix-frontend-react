import React, { useEffect, useState } from "react";
import "./Genre_Panel.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function GenrePanel({
  generes,
  selectedGenere,
  handleGenereChange,
  allContentrating,
  selectedContentrating,
  handleContentChange,
  handlesort,
  setsortType,
}) {
  return (
    <Box className="GeneralpanelBox">
      <Box
        sx={{
          m: 1,
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          width="auto"
          direction="row"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          className="Genre-rating-btn"
        >
          {generes.map((genere, idx) => (
            <Button
              style={{ textTransform: "none" }}
              size="medium"
              sx={{ color: "white" }}
              value={genere}
              key={idx}
              onClick={(e) => handleGenereChange(e.target.value)}
              variant={selectedGenere.includes(genere) ? "contained" : "text"}
            >
              {genere}
            </Button>
          ))}
        </Stack>
        <Stack
          spacing={{ xs: 1, sm: 2, md: 4 }}
          direction="row"
          onClick={(e) => handleContentChange(e.target.value)}
          className="content-rating-btn"
        >
          {allContentrating.map((content, idx) => (
            <Button
              variant={
                selectedContentrating.includes(content) ? "contained" : "text"
              }
              size="medium"
              sx={{ color: "white" }}
              value={content}
              key={idx}
              style={{ textTransform: "none" }}
            >
              {content}
            </Button>
          ))}
        </Stack>
      </Box>
      <Button
        variant="contained"
        size="small"
        sx={{ color: "white", ml: 5 }}
        value="Release_date"
        style={{ textTransform: "none" }}
        className="Sortbutton"
        onChange={(e) => handlesort(e.target.value)}
      >
        <CompareArrowsIcon sx={{ mr: 1 }} />
        <div>Sort by: </div>
        <select className="togglesort">
          <option defaultValue={"Release_date"}>Release date</option>
          <option value="View_Count">View Count</option>
        </select>
      </Button>
    </Box>
  );
}

export default GenrePanel;
