import { getSpotifyURL, fetchUnsplashImage } from "./api.js";

const params = new URLSearchParams(window.location.search);
const mood = params.get("mood");

const imageElement = document.getElementById("mood-image");
const moodTitle = document.getElementById("mood-title");
const playListContainer = document.getElementById("playlist");

if (!mood) {
    playListContainer.innerHTML = "<p>Invalid mood selection.</p>";
} else {
    loadMoodBoard(mood);
}

async function loadMoodBoard(mood) {
    if (moodTitle) {
        moodTitle.textContent = `${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood`;
    }
        

    // Load Unsplash image
    try {
        const image = await fetchUnsplashImage(mood);
        imageElement.src = image.urls.regular;
        imageElement.alt = image.alt_description || mood;
    } catch (error) {
        imageElement.src = "";
        imageElement.alt = "Failed to load image";
    }

    const heartButton = document.querySelector(".heart-button");
    heartButton.classList.remove("chill-mood", "study-mood", "happy-mood");
    heartButton.classList.add(`${mood}-mood`);

    // Load Spotify playlist
    const spotifyUrl = getSpotifyURL(mood);
    if (spotifyUrl) {
        playListContainer.innerHTML = `
        <iframe
            class="spotify-embed"
            src="${spotifyUrl}"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            ></iframe>`;
    } else {
        playListContainer.innerHTML = "<p>No playlist found.</p>";
    }
}


