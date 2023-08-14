import apiClient from "../../../api/axios";

async function fetchSharedVideos(setVideos){
  var token = "";

  try {
    const result = localStorage.getItem("token");

    if (!result) {
      window.location.href = "/login";
    }

    token = JSON.parse(result);

    console.log("Token: ", token);

    const response = await apiClient.get(
      "/sharedvideos",
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    setVideos(response.data.video_details);
    console.log("ala wai thdaaa: ",response.data.video_details )
  } catch {
    console.log("Could not Find the videos");
  }
}


export default fetchSharedVideos;