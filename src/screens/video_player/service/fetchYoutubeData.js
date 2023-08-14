import axios from 'axios';

const fetchVideoDetails = async (setVideoDetails,video_url) => {
    try {
      const youtubeUrl = video_url
        // "https://www.youtube.com/watch?v=Y-OLcnr8eNo&list=PL4OKShK9gkQca9QVqmnPMzT6QYM2LHaqt&index=6";
      const video_Id = extractVideoId(youtubeUrl);
      if (video_Id) {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_Id}&key=AIzaSyDjHRiG75TpZG6OONttDUB0EOsYzfA-sq8`
        );
        console.log(response);

        const video = response.data.items[0];
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.maxres !== undefined ? video.snippet.thumbnails.maxres.url : video.snippet.thumbnails.high.url;        ;
        setVideoDetails({
          videoId: video_Id,
          title: title,
          thumbnail: thumbnail,
        });
      }
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };
  const extractVideoId = (url) => {
    const youtubeUrlPattern = /(?:\?|&)v=([^&]+)/;
    const match = url.match(youtubeUrlPattern);

    if (match) {
      const videoId = match[1];
      console.log(videoId);
      return videoId;
    }

    return null;
  };


  export default fetchVideoDetails;