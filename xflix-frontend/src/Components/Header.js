import React, { useState } from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import { config } from "../App";

// MUI styles
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function refreshPage() {
  window.location.reload(false);
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
// MUI styles

function Header(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(null);

  const reqbody = {
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    previewImage: "",
  };

  const [data, setdata] = useState(reqbody);
  function handleClickOpen() {
    setOpen(true);
  }

  async function handleClose() {
    setOpen(false);
    await uploadVideo();
    refreshPage();
  }

  function handleChange(e) {
    setdata({
      ...data,
      [e.target.name]: `${e.target.value}`,
    });
  }

  function handleSearch(e) {
    props.getdata(e.target.value, 5000);
  }

  async function uploadVideo() {
    // let url = `https://0cec8d3e-3ef8-4bcd-bf50-5f0816d927e4.mock.pstmn.io/v1/videos`;
    // let url = `https://xflix-backend-dig2.onrender.com/v1/videos`;
    let url = `${config.endpoint}`;
    let unformateddate = `${value ? value.$d : "nothing"}`;
    let [, month, day, year] = unformateddate.split(" ");
    let formateddate = `${day} ${month} ${year}`;
    try {
      let response = await axios.post(
        url,
        {
          videoLink: data.videoLink,
          title: data.title,
          genre: data.genre,
          contentRating: data.contentRating,
          releaseDate: formateddate,
          previewImage: data.previewImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            p: 2,
            bgcolor: "#202020",
          }}
        >
          <Link to="/">
            <img src="Logosvg.svg" alt="Logosvg" />
          </Link>
          <Box>
            <Search
              // onChange={(e) => {
              //   props.getdata(e.target.value);
              // }}
              onChange={handleSearch}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                className="SerchinputBase"
              />
            </Search>
          </Box>
          <Button
            variant="contained"
            startIcon={<FileUploadIcon />}
            onClick={handleClickOpen}
          >
            Upload
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <Box sx={{ background: "#424242", color: "white" }}>
              <DialogTitle>Upload Video</DialogTitle>
              <DialogContent>
                <form>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      id="outlined-basic"
                      label="Video Link"
                      variant="outlined"
                      value={data.videoLink}
                      name="videoLink"
                      helperText="This link will be used to derive the video"
                      sx={{
                        mt: 2,
                        label: { color: "#9e9e9e" },
                        input: { color: "white" },
                      }}
                      onChange={handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Thumbnail Image Link"
                      variant="outlined"
                      value={data.previewImage}
                      name="previewImage"
                      helperText="This link will be used to preview the thumbnail image"
                      sx={{
                        mt: 2,
                        label: { color: "#9e9e9e" },
                        input: { color: "white" },
                      }}
                      onChange={handleChange}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      helperText="This title will be the representative text for video"
                      value={data.title}
                      name="title"
                      sx={{
                        mt: 2,
                        label: { color: "#9e9e9e" },
                        input: { color: "white" },
                      }}
                      onChange={handleChange}
                    />
                    <FormControl
                      sx={{
                        mt: 2,
                        label: { color: "#9e9e9e" },
                        input: { color: "white" },
                      }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Genre
                      </InputLabel>
                      <Select
                        sx={{
                          color: "white",
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(228, 219, 233, 0.25)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(228, 219, 233, 0.25)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(228, 219, 233, 0.25)",
                          },
                          ".MuiSvgIcon-root ": {
                            fill: "white !important",
                          },
                        }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="genre"
                        value={data.genre}
                        label="Genre"
                        input={<OutlinedInput label="Name" />}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Sports">Sports</MenuItem>
                        <MenuItem value="Comedy">Comedy</MenuItem>
                        <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                        <MenuItem value="Movies">Movies</MenuItem>
                      </Select>
                      <FormHelperText>
                        Genre will help in categorizing your videos
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      sx={{
                        mt: 2,
                        label: { color: "#9e9e9e" },
                        input: { color: "white" },
                      }}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Content Rating
                      </InputLabel>
                      <Select
                        sx={{
                          color: "white",
                          ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(228, 219, 233, 0.25)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(228, 219, 233, 0.25)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(228, 219, 233, 0.25)",
                          },
                          ".MuiSvgIcon-root ": {
                            fill: "white !important",
                          },
                        }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name="contentRating"
                        value={data.contentRating}
                        label="Age"
                        input={<OutlinedInput label="Name" />}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Anyone">All Age Group</MenuItem>
                        <MenuItem value="7+">7+</MenuItem>
                        <MenuItem value="12+">12+</MenuItem>
                        <MenuItem value="16+">16+</MenuItem>
                        <MenuItem value="18+">18+</MenuItem>
                      </Select>
                      <FormHelperText>
                        This will be used to filter videos on age group
                        suitability
                      </FormHelperText>
                    </FormControl>
                    <Box sx={{ mt: 2, input: { color: "white" } }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            color: "white",
                            ".MuiOutlinedInput-notchedOutline": {
                              borderColor: "rgba(228, 219, 233, 0.25)",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "rgba(228, 219, 233, 0.25)",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "rgba(228, 219, 233, 0.25)",
                            },
                            ".MuiSvgIcon-root ": {
                              fill: "white !important",
                            },
                          }}
                          label="Release date"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              helperText={params?.inputProps?.placeholder}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="contained">
                  Upload Video
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Stack>
      </Box>
    </>
  );
}

export default Header;
