import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from '@mui/material';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

export function formatDate(olddate) {
  var d = new Date(olddate),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(",");
}

export function getdiff(date) {
  let d1 = Date.now();
  let d2 = new Date(formatDate(date)).getTime();
  const hoursDiff = Math.abs(Math.floor((d2 - d1) / 3600000));

  if (hoursDiff > 8760) {
    return `${Math.floor(hoursDiff / 8760)} Years`;
  } else if (hoursDiff > 730) {
    return `${Math.floor(hoursDiff / 730)} Months`;
  } else if (hoursDiff > 168) {
    return `${Math.floor(hoursDiff / 168)} Weeks`;
  } else if (hoursDiff > 24) {
    return `${Math.floor(hoursDiff / 24)} days`;
  }

  return `hours dif ${Math.floor(hoursDiff)}`;
}

export function DashboardCard(props) {



  return (
    <>
      <Card sx={{ maxWidth: 345,alignItems: 'stretch',backgroundColor: 'transparent',boxShadow: 0}}>
      <CardActionArea sx={{ backgroundColor: 'transparent' }} >
      <Link to={"/video/"+props.video._id}>
        <CardMedia
          component="img"
          height="140"
          image={props.video.previewImage}
          alt="green iguana"
          className="cardImage"
        /></Link>
        <CardContent sx={{p:0,justifyContent:"flex-start",backgroundColor: 'transparent' }} >
          <Typography gutterBottom variant="subtitle1" component="div" align="left" color="white">
          {props.video.title}
          </Typography>
          <Typography variant="body2"align="left" color="white" sx={{opacity:0.4}}>
          {getdiff(props.video.releaseDate)} ago
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
  );
}

export default DashboardCard;
