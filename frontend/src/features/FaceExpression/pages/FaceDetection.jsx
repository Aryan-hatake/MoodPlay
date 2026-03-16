import React, { useEffect, useRef, useState } from "react";
import { loadModel,handleStopCamera , handleStartCamera } from "../utils/utils";
import '../styles/FaceDetection.css';
import useFace from "../hooks/useFace";
import { useSong } from "../../songs/hooks/useSong";
import MoodMusicPlayer from "../../songs/UI/components/MoodMusicPlayer";

export default function MoodDetector() {
  const videoRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const streamRef = useRef(null);
  

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

   const  {isDetecting, setIsDetecting,detectedMood, setDetectedMood} = useFace()

   const {handleGetSong,handleGetPlaylist,currentSong,playlist,loading} = useSong()
   
   const moodEmojis = {
    "Happy": "😊",
    "Angry": "😠",
    "Sad": "😢",
    "Surprised": "😲",
    "Neutral": "😐",
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };



  useEffect(() => {
    loadModel(landmarker, setLandmarker);
    return () => {
      if (landmarker) {
        landmarker.close();
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  
  


  




  return (
    <div className="luxury-container">
      {/* Floating AI Indicator */}
      <div className="floating-ai-indicator">
        <div className="ai-pulse"></div>
        <span className="ai-text">🤖 AI Mood Analysis</span>
      </div>

      {/* Top Section */}
      <div className="top-section">
        <div className="greeting-section">
          <h1 className="greeting-text">{getGreeting()}</h1>
          <p className="mood-subtitle">
            You seem <span className="mood-emphasis">{detectedMood}</span> today
          </p>
        </div>

        {/* Mood Detection Card */}
        <div className="mood-detection-card">
          {isDetecting ? (
            <div className="camera-wrapper">
              <video ref={videoRef} autoPlay playsInline className="detection-video" />
              <div className="camera-overlay">
                <div className="detection-circle"></div>
                <p className="detection-hint">Position your face in the circle</p>
              </div>
            </div>
          ) : (
            <div className="camera-placeholder">
              <div className="placeholder-icon">📷</div>
              <p>Enable camera for mood detection</p>
            </div>
          )}

          <button
            className={`detect-btn ${isDetecting ? "active" : ""}`}
            onClick={()=>{isDetecting ? handleStopCamera(streamRef,setIsDetecting,detectedMood,handleGetSong,handleGetPlaylist) : handleStartCamera(setIsDetecting,setDetectedMood,landmarker,videoRef,streamRef)}}
            disabled={!landmarker}
          >
            {!landmarker ? "⏳ Loading..." : isDetecting ? "⏹️ Stop Detection" : "🎬 Start Detection"}
          </button>

          <div className="detected-mood-badge">
            <span className="mood-emoji">{moodEmojis[detectedMood]}</span>
            <span className="mood-name">{detectedMood}</span>
          </div>
        </div>
      </div>
    
    <MoodMusicPlayer/>
    </div>
  );
}