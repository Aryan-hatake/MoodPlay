import { createContext, useState } from 'react';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
 
  const [loading, setLoading] = useState(false);
  const [moodLabel, setMoodLabel] = useState("Detecting...");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);

  const value = { loading, setLoading ,moodLabel, setMoodLabel,isDetecting, setIsDetecting,detectedMood, setDetectedMood };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
};
