import { getSpotifyURL, fetchUnsplashImage } from "./api.js";

const moodMenu = document.getElementById("mood-menu");
const playlistContainer = document.getElementById("playlist");
const imageContainer = document.getElementById("image");


moodMenu.addEventListener("click", (event) => {
    event.preventDefault();
    const mood = event.target.dataset.mood;
    if (!mood)
        return;

    updateMoodboard(mood);
});

function updateMoodboard(mood) {
    playlistContainer.innerHTML = "<p>Loading music...</p>";
    imageContainer.innerHTML = "<p>Loading images...</p>";

    updatePlaylist(mood);
    updateImage(mood);
}

function updatePlaylist(mood) {
    const url = getSpotifyURL(mood);
    if (!url) {
        playlistContainer.innerHTML = `<p>No playlist found for this mood.</p>`;
        return;
    }

    playlistContainer.innerHTML = `
        <iframe 
            class="spotify-embed"
            src="${url}"
            width="100%"
            height="380"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        </iframe>`;
}


async function updateImage(mood) {
    try {
        const image = await fetchUnsplashImage(mood);
        renderImage(image);
    } catch (error) {
        imageContainer.innerHTML = "<p>Failed to load image.</p>";
    }
}

function renderImage(image) {
    if (!image) {
        imageContainer.innerHTML = "<p>No image found.</p>";
        return;
    }

    imageContainer.innerHTML = `
    <img 
        src="${image.urls.small}"
        alt="${image.alt_description || "Mood image"}"
        class="mood-image"
        loading="lazy"
    />`;
}

