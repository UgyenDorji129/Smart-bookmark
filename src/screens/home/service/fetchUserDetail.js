import apiClient from "../../../api/axios";

async function fetchUserDetail(setUserDetail){
    var token = "";

  try {
    const result = localStorage.getItem("token");

    if (!result) {
      window.location.href = "/login";
    }

    token = JSON.parse(result);

    console.log("Token: ", token);

    const response = await apiClient.get(
      `/user`,

      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    setUserDetail(response.data.user_details[0])
  } catch {
    console.log("Could not Find the videos");
  }
}

export default fetchUserDetail;