import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../screens/home/Home";
import { VideoPlayer } from "../screens/video_player/VideoPlayer";
import { ShareHelper } from "../screens/video_player/components/ShareHelper";

function ProtectedRoute() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/videos/:video_url/:is_shared" element={<VideoPlayer/>}/>
      <Route path="/share/:video_id" element={<ShareHelper/>}/>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default ProtectedRoute;