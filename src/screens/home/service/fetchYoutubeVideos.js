import apiClient from "../../../api/axios";

async function fetchYoutubeVideos(setVideos) {
  var token = "";

  try {
    const result = localStorage.getItem("token");

    if (!result) {
      window.location.href = "/login";
    }

    token = JSON.parse(result);

    console.log("Token: ", token);

    const response = await apiClient.get(
      "/videos",

      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    console.log("Come on ya:", response.data.video_details);

    setVideos(response.data.video_details);
  } catch {
    console.log("Could not Find the videos");
  }
}

export default fetchYoutubeVideos;
