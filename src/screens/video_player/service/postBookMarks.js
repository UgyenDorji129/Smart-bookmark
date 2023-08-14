import apiClient from "../../../api/axios";

async function postBookMarks(setBookmarks, noteText, video_id, timestamp, is_shared){
    var token = '';
    try{
        const result = localStorage.getItem("token");
        if (!result) {
          window.location.href = "/login";
        }
        token = JSON.parse(result);
        console.log("Token here in player: ", token);
    
        const response = await apiClient
          .post("/bookmark",{
            notes:noteText,
            video_id: video_id,
            timestamp:timestamp,
            is_shared:false
        },
            {
              headers: {
                "x-access-token": token,
              },
            }
          );

          const bookmarkResult = await apiClient
            .get(`/bookmark/${video_id}`,
              {
                headers: {
                  "x-access-token": token,
                },
              }
            );
            setBookmarks(bookmarkResult.data.bookmark_details)
        }
        catch{
          console.log("Some error Occures 12 3");
        }
}

export default postBookMarks;