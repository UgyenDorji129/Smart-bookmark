import apiClient from "../../../api/axios";

async function deleteBookmark(bookmark_id, setBookmarks){
    var token = '';
    try{
        const result = localStorage.getItem("token");
        if (!result) {
          window.location.href = "/login";
        }
        token = JSON.parse(result);
        console.log("Token here in player: ", token);
    
        const response = await apiClient
          .delete(`/bookmark/${bookmark_id}`,
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
          console.log("DHa 1: ",response)
          const bookmarkResult = await apiClient
            .get(`/bookmark/${response.data.video_id}`,
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

export default deleteBookmark;