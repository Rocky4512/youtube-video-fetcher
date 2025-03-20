const cardContainer = document.querySelector('.card-container');
const searchInput = document.getElementById('search-input');

const url = 'https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=mostLiked';
const options = { method: 'GET', headers: { accept: 'application/json' } };

let videos = [];

// Function to fetch videos
async function fetchVideos() {
    try {
        const response = await fetch(url, options);
        const Data = await response.json();

        console.log("Fetched Data:", Data); // Debugging
        console.log("Data Type:", typeof Data.data);
        if (!response.ok) {
            throw new Error("Error fetching the videos : ", content.message);
        }
        videos = Data.data.data; 
        displayVideos(videos); 
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

// Function to display videos
function displayVideos(videoList) {
    if (!Array.isArray(videoList)) {
        console.error("displayVideos expected an array but got:", videoList);
        return;
    }

    cardContainer.innerHTML = "";
    videoList.forEach(video => {
        const videodata = video.items.snippet
        const videocard = document.createElement('a');
        videocard.classList.add('card');
        videocard.href = `https://www.youtube.com/watch?v=${video.items.id}`;
        videocard.target = "_blank";

        const thumbnail = document.createElement("img");
        thumbnail.src = videodata.thumbnails.maxres.url || "default-thumbnail.jpg";
        thumbnail.alt = videodata.title;
        thumbnail.classList.add("video-thumbnail");
        videocard.appendChild(thumbnail);

        const videoDetails = document.createElement("div");
        videoDetails.classList.add("video-details");

        const title = document.createElement("h3");
        title.textContent = videodata.title;
        title.classList.add("video-title");
        videoDetails.appendChild(title);

        const channelName = document.createElement("p");
        channelName.textContent = videodata.channelTitle;
        channelName.classList.add("channel-name");
        videoDetails.appendChild(channelName);

        const videoInfo = document.createElement("div");
        videoInfo.classList.add("video-info");
        videoInfo.innerHTML = `
        <span>${video.items.statistics.viewCount} views</span> | 
        <span>${video.items.statistics.likeCount} likes</span> | 
        <span>${video.items.statistics.commentCount} comments</span>
        `;
        videoDetails.appendChild(videoInfo);

        
        videocard.appendChild(videoDetails);
        cardContainer.appendChild(videocard);
    });
}

// Function to filter videos
function filterVideos() {
    const searchInput = document.querySelector('#search-input')
    const inputValue = searchInput.value.toLowerCase();

    const filteredVideos = videos.filter((video) => { 
        const title = video.items.snippet.title.toLowerCase();
        const channelTitle = video.items.snippet.channelTitle.toLowerCase();    
        return title.includes(inputValue) || channelTitle.includes(inputValue);
});
    displayVideos(filteredVideos);
}

// Fetch videos on page load
fetchVideos();
