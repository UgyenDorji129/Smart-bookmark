import apiClient from "../../../api/axios";
import fetchYoutubeVideos from "./fetchYoutubeVideos";
import fetchSharedVideos from "./fetchSharedVideos";
async function deleteVideo(video_id, setVideos, is_shared){
  var token = "";

  try {
    const result = localStorage.getItem("token");

    if (!result) {
      window.location.href = "/login";
    }

    token = JSON.parse(result);

    console.log("Token: ", token);

    const response = await apiClient.delete(
      `/videos/${video_id}/${is_shared}`,

      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    
    if(is_shared === false){
      fetchYoutubeVideos(setVideos);
    }else{
      console.log("Hiiiiiiii: ", is_shared)
      fetchYoutubeVideos(setVideos);
      fetchSharedVideos(setVideos);
    }
    

  } catch {
    console.log("Could not Find the videos");
  }

}


export default deleteVideo;