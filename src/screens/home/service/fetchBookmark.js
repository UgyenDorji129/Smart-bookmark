import apiClient from "../../../api/axios";

async function fetchBookmarks(id, setBookmarks){
    var token = "";

  try {
    const result = localStorage.getItem("token");

    if (!result) {
      window.location.href = "/login";
    }

    token = JSON.parse(result);

    console.log("Token: ", token);

    const response = await apiClient.get(
      `/bookmark/${id}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
      setBookmarks(response.data.bookmark_details)
      console.log("Yo yo heloo mello: ",response.data.bookmark_details)
  } catch {
    console.log("Could not Find the videos");
  }

}


export default fetchBookmarks;