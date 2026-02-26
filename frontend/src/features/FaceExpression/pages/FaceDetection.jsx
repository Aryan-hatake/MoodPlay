import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { loadModel,startCamera,styles } from "../utils/utils";

export default function MoodDetector() {
  const videoRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const [mood, setMood] = useState("Detecting...");
  const streamRef = useRef(null)
  // Load FaceLandmarker once
  //  const loadModel = async () => {
  //     const vision = await FilesetResolver.forVisionTasks(
  //       "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  //     );

  //     const detector = await FaceLandmarker.createFromOptions(vision, {
  //       baseOptions: {
  //         modelAssetPath:
  //           "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
  //         delegate: "GPU",
  //       },
  //       runningMode: "VIDEO",
  //       outputFaceBlendshapes: true,
  //     });

  //     setLandmarker(detector);
  //   };
    
  useEffect(() => {
    loadModel(landmarker,setLandmarker);
    return () => {
            if (landmarker) {
                landmarker.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
  }, []);

  // const startCamera = async () => {
  //   if (!landmarker) return;

  //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //   videoRef.current.srcObject = stream;
  //   videoRef.current.onloadeddata = detect;
  // };

  // const detect = () => {
  //   if (!videoRef.current || !landmarker) return;

  //   const results = landmarker.detectForVideo(
  //     videoRef.current,
  //     performance.now()
  //   );
    
    

  //   if (results.faceBlendshapes.length > 0) {
  //     const blends = results.faceBlendshapes[0].categories;
  //     console.log(blends)
  //     const getScore = (name) =>
  //       blends.find((b) => b.categoryName === name)?.score || 0;

  //     // Important blendshapes
  //     const smile = getScore("mouthSmileLeft") + getScore("mouthSmileRight");
  //     const frown = getScore("mouthFrownLeft") + getScore("mouthFrownRight");
  //     const jawOpen = getScore("jawOpen");
  //     const browDown = getScore("browDownLeft") + getScore("browDownRight");
      
  //     console.log(jawOpen)

  //     // Simple logic mapping
  //     console.log(jawOpen)
  //     if (smile > 0.8) setMood("😊 Happy");
  //     else if (frown > 0.6 || browDown > 0.8) setMood("😢 Sad");
  //     else if (jawOpen > 0.06)  setMood("😮 Surprised");
  //     else setMood("😐 Neutral");
  //   }

  //   requestAnimationFrame(detect);
  // };

  return (
    <div style={styles.container}>
  <div style={styles.card}>
    <h2 style={styles.heading}>Mood Detection</h2>

    <button
      onClick={() => startCamera(landmarker, videoRef, streamRef, setMood)}
      disabled={!landmarker}
      style={{
        ...styles.button,
        opacity: landmarker ? 1 : 0.6,
        cursor: landmarker ? "pointer" : "not-allowed",
      }}
    >
      {landmarker ? "Start Camera" : "Loading..."}
    </button>

    <video
      ref={videoRef}
      autoPlay
      playsInline
      width="400"
      style={styles.video}
    />

    <h3 style={styles.mood}>{mood}</h3>
  </div>
</div>
  );
}