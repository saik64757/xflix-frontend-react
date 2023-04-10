// import logo from './logo.svg';
import "./App.css";
import "./Components/Header";
import Landingpage from "./Components/Landingpage";
import Videopage from "./Components/Videopage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const config = {
  //Mock server api
  // endpoint: 'https://937eb2d1-2b0f-42e1-af80-2c776b32bcc1.mock.pstmn.io/v1/videos'
  endpoint: "https://xflix-backend-2n39.onrender.com/v1/videos",
};

function App() {
  const [vids, setvids] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/Video/:id" element={<Videopage vids={vids} />} />
        <Route path="/" element={<Landingpage setvids={setvids} />} />
      </Routes>
    </div>
  );
}

export default App;
