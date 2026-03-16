import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useSong } from "../../songs/hooks/useSong";
// @functionality - styles Obj
export const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
        fontFamily: "Arial, sans-serif",
    },

    card: {
        background: "#ffffff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        textAlign: "center",
        width: "450px",
    },

    heading: {
        marginBottom: "20px",
        color: "#333",
    },

    button: {
        padding: "10px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4CAF50",
        color: "#fff",
        marginBottom: "20px",
        transition: "all 0.2s ease",
    },

    video: {
        borderRadius: "12px",
        marginBottom: "15px",
        width: "100%",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },

    mood: {
        fontSize: "22px",
        fontWeight: "600",
        color: "#444",
    },
};


// @functionality -  Load FaceLandmarker once
export const loadModel = async (landmarker, setLandmarker) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    const detector = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
    });

    setLandmarker(detector);

};

// @functionality -  Start User webcam
export const startCamera = async (landmarker, videoRef, streamRef, setMood) => {
    if (!landmarker) return;

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    videoRef.current.onloadedmetadata = () => {
        detect(landmarker, videoRef, setMood);
    }


};

// @functionality -  Detect mood
export const detect = (landmarker, videoRef, setMood) => {

    if (!videoRef.current || videoRef.current.videoWidth === 0 || !landmarker) return;
    const results = landmarker.detectForVideo(
        videoRef.current,
        performance.now()
    );



    if (results.faceBlendshapes.length > 0) {
        const blends = results.faceBlendshapes[0].categories;
        const getScore = (name) =>
            blends.find((b) => b.categoryName === name)?.score || 0;

        // Important blendshapes
        const smile = getScore("mouthSmileLeft") + getScore("mouthSmileRight");
        const frown = getScore("mouthFrownLeft") + getScore("mouthFrownRight");
        const jawOpen = getScore("jawOpen");
        const browDown = getScore("browDownLeft") + getScore("browDownRight");
        const eyeSquint = getScore("eyeSquintLeft") + getScore("eyeSquintRight");
        const mouthPress = getScore("mouthPressLeft") + getScore("mouthPressRight");



        // Simple logic mapping
        console.log(browDown)
 
        if (smile > 0.8) setMood("Happy");
        else if (browDown > 1 && (eyeSquint > 0.6 || mouthPress > 0.6)) setMood("Angry");   
        else if (frown > 0.02 && browDown > 0.2) setMood("Sad");
        else if (jawOpen > 0.06) setMood("Surprised");
        else setMood("Neutral");
    }

    requestAnimationFrame(() => {
        detect(landmarker, videoRef, setMood);
    });

};


// @functionality -  stop user cam
export const handleStopCamera = async(streamRef,setIsDetecting,detectedMood,handleGetSong,handleGetPlaylist) => {
    

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    await handleGetSong(detectedMood)
    await handleGetPlaylist(detectedMood)
    setIsDetecting(false);

  };


  // @functionality -  handle user cam
export const handleStartCamera = async (setIsDetecting, setDetectedMood, landmarker, videoRef, streamRef) => {
    setIsDetecting(true);
    
    await startCamera(landmarker, videoRef, streamRef, (mood) => {
      setDetectedMood(mood);
    });
  };