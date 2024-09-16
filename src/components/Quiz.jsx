import React, { useState, useEffect } from "react";
import Styled from "./Quiz.module.css";

import intro_music from "/Musics/intro.mp3";
import intro_video from "/Videos/intro.mp4";
import file from "/Images/file.png";
import Questions from "./Questions";

const Quiz = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const videoElement = document.getElementById("introVideo");
    if (videoElement) {
      videoElement.play();
    }
  }, []);

  const handleVideoEnd = () => {
    console.log("Video ended");
    setVideoEnded(true);
  };

  useEffect(() => {
    if (videoEnded) {
      const audioElement = document.getElementById("backgroundMusic");
      if (audioElement) {
        audioElement
          .play()
          .then(() => {
            console.log("Audio started playing");
            setAudioPlayed(true);
          })
          .catch((error) => console.error("Error playing audio: ", error));
      }
    }
  }, [videoEnded]);

  const handleReadyClick = () => {
    setIsReady(true);
  };

  return (
    <div className={Styled.quiz}>
      <div className={Styled.file}>
        <img src={file} />
      </div>
      <video
        id="introVideo"
        src={intro_video}
        autoPlay
        onEnded={handleVideoEnd}
        style={{
          display: videoEnded ? "none" : "block",
          width: "100%",
          height: "100%",
        }}
      />

      <audio
        id="backgroundMusic"
        src={intro_music}
        style={{ display: "none" }}
        onCanPlayThrough={() => {
          console.log("Audio can play through");
        }}
      />

      {videoEnded && audioPlayed && !isReady && (
        <div className={Styled.readyButtonContainer}>
          <button className={Styled.readyButton} onClick={handleReadyClick}>
            Ready
          </button>
        </div>
      )}

      {videoEnded && audioPlayed && isReady && (
        <div className={Styled.questions}>
          <Questions />
        </div>
      )}
    </div>
  );
};

export default Quiz;
