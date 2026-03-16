import React from 'react'
import { useContext } from 'react'
import { MoodContext } from '../store/face.context'



const useFace = () => {

    const context = useContext(MoodContext)

    const {moodLabel, setMoodLabel,isDetecting, setIsDetecting,detectedMood, setDetectedMood} = context
    

    return {moodLabel, setMoodLabel,isDetecting, setIsDetecting,detectedMood, setDetectedMood}
}

export default useFace
