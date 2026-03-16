import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes"
import './features/shared/global.scss'
import { AuthProvider } from "./features/auth/store/auth.context"
import { MoodProvider } from "./features/FaceExpression/store/face.context"
import { SongProvider } from "./features/songs/store/song.context"
import { useAuth } from "./features/auth/hooks/useAuth"
import { useEffect } from "react"


const App = () => {




  return (
    <AuthProvider>
      <SongProvider>
      <MoodProvider>
        <RouterProvider router={router} />
      </MoodProvider>
      </SongProvider>
    </AuthProvider>
  )
}

export default App
