import apiClient from "../../../api/axios";

async function fetchAIBookMarks(video_url, setAiBookmarks){
  var token = "";
    try{
        const result = localStorage.getItem("token");
        if (!result) {
          window.location.href = "/login";
        }
        token = JSON.parse(result);
        console.log("Token: ", token);
        
        const response = await apiClient
          .post("/aitimestamp",{url: video_url,},
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
          console.log("Alllaa aa 1 3 4: ", response)
          setAiBookmarks([])
          setAiBookmarks(response.data.timestamp_details
)
        //   setBookmark(bookmarkResult.data.bookmark_details)
    
        }
        catch{
          console.log("Some error Occures");
        }
          
}

export default fetchAIBookMarks;