import apiClient from "../../../api/axios";

async function fetchBookMarks(setBookmark, video_url, setVideoId){
  var token = "";
    try{
        const result = localStorage.getItem("token");
        if (!result) {
          window.location.href = "/login";
        }
        token = JSON.parse(result);
        console.log("Token: ", token);
    
        const response = await apiClient
          .post("/videos",{url: video_url,},
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
          setVideoId(response.data.video_id)
          const bookmarkResult = await apiClient
            .get(`/bookmark/${response.data.video_id}`,
              {
                headers: {
                  "x-access-token": token,
                },
              }
            );
          setBookmark(bookmarkResult.data.bookmark_details);
        }
        catch{
          console.log("Some error Occures");
        }
}

export default fetchBookMarks;