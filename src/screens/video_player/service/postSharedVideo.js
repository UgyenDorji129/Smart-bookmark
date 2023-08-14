import apiClient from "../../../api/axios";

async function addBookmark(token, notes, timestamp, video_id) {
  const result = localStorage.getItem("token");
        if (!result) {
          window.location.href = "/login";
        }
        token = JSON.parse(result);
  const res = await apiClient
    .post("/bookmark",{
      notes:notes,
      video_id: video_id,
      timestamp:timestamp,
      is_shared:true
  },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
}

async function postSharedVideo(video_id){
  var token = "";
    try{
        const result = localStorage.getItem("token");
        if (!result) {
          window.location.href = "/login";
        }
        token = JSON.parse(result);
        console.log("Token: ", token);
    
        const getResponse = await apiClient
          .get(`/videos/${video_id}`,
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
         const response = await apiClient
          .post("/videos",{url: getResponse.data.video_details.url},
            {
              headers: {
                "x-access-token": token,
              },
            }
          );
          console.log("Ala wai nga guto: ",getResponse.data.video_details.url)
            
          const bookMarks = getResponse.data.video_details.bookmarks;
          
          // bookMarks.map(async(bookMark)=>(
          //   await addBookmark(token, bookMark.notes, bookMark.timestamp, response.data.video_id, true)
          // ));
          await Promise.all(
            bookMarks.map(async (bookMark) => {
              await addBookmark(token, bookMark.notes, bookMark.timestamp, response.data.video_id, true);
            })
          );
          
          return getResponse.data.video_details.url
        }
        catch(error){
          console.log("Some error Occures");
          return null
        }
}

export default postSharedVideo;