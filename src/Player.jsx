/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { styled, Typography, Slider, Paper, Stack } from "@mui/material";

import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  height: "100vh",
  width: "100vw",
  paddingTop: theme.spacing(6),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#4c4c4c",
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  display: "flex",
}));

const PSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "white",
  height: 2,
  "&:hover": {
    cursor: "auto",
  },
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
  },
}));

const _dates = [
  "Sab 11/03/2023",
  "Dom 12/03/2023",
  "Seg 13/03/2023",
  "Ter 14/03/2023",
  "Qua 15/03/2023",
  "Qui 16/03/2023",
  "Sex 17/03/2023",
];

export default function Player({
  onChange = (val) => console.log(val),
  timer = 2000,
  dates = _dates,
  hasPastDates = true,
}) {
  const [index, setIndex] = useState(hasPastDates ? Math.round((dates.length - 1) / 2) : dates[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        if (index === dates.length - 1) {
          setIsPlaying(false);
          clearInterval(intervalId);
          return;
        }
        setIndex((prevIndex) => prevIndex + 1);
      }, timer);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, index]);

  useEffect(() => {
    onChange(dates[index]);
  }, [index]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleBackward = () => {
    if (index === 0) return;
    setIndex((prevIndex) => prevIndex - 1);
  };

  const toggleForward = () => {
    if (index === dates.length - 1) return;
    setIndex((prevIndex) => prevIndex + 1);
  };

  const toggleRestart = () => {
    setIndex(0);
  };

  const handleSliderChange = (_, newValue) => {
    setIndex(newValue);
  };

  return (
    <Div>
      <CustomPaper>
        <Stack direction="row" spacing={1} sx={styles.control}>
          <FastRewindIcon
            className="hover-style"
            sx={styles.icons}
            onClick={toggleBackward}
          />

          {!isPlaying ? (
            <PlayArrowIcon
              fontSize={"large"}
              sx={styles.icons}
              onClick={togglePlay}
              className="hover-style"
            />
          ) : (
            <PauseIcon
              fontSize={"large"}
              sx={styles.icons}
              onClick={togglePlay}
              className="hover-style"
            />
          )}

          <FastForwardIcon
            className="hover-style"
            sx={styles.icons}
            onClick={toggleForward}
          />

          <RestartAltIcon
            className="hover-style"
            sx={styles.icons}
            onClick={toggleRestart}
          />
        </Stack>
        <Stack spacing={1} direction="row" sx={styles.position}>
          <Typography sx={styles.dateRef}>{dates[index]}</Typography>
          <PSlider
            value={index}
            onChange={handleSliderChange}
            max={dates.length - 1}
          />
        </Stack>
      </CustomPaper>
    </Div>
  );
}

const styles = {
  control: {
    display: "flex",
    width: "150px",
    alignItems: "center",
  },
  icons: {
    color: "white",
    cursor: "pointer",
  },
  position: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  dateRef: {
    color: "white",
    margin: "0 10px",
  },
};
