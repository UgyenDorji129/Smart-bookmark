import apiClient from "../../../api/axios";

async function fetchRecentWatches(setRecentVideos) {
  var token = "";

  try {
    const result = localStorage.getItem("token");

    if (!result) {
      window.location.href = "/login";
    }

    token = JSON.parse(result);

    console.log("Token: ", token);

    const response = await apiClient.get(
      "/lastvideos",

      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    console.log("Come on ya 123 123 123 123:", response.data.video_details);

    //setVideos(response.data.video_details);
    console.log("Dha ani ben response en mea: ",response.data.video_details)
    setRecentVideos(response.data.video_details)
  } catch {
    console.log("Could not Find the videos");
  }
}

export default fetchRecentWatches;
