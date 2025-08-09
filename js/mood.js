import { getSpotifyURL, fetchUnsplashImage } from "./api.js";
import { saveFavorite, removeFavorite, isFavorite } from "./favorites.mjs";

const params = new URLSearchParams(window.location.search);
const mood = params.get("mood");

const imageElement = document.getElementById("mood-image");
const moodTitle = document.getElementById("mood-title");
const playListContainer = document.getElementById("playlist");
const heartButton = document.querySelector(".heart-button");

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
    let imageUrl = ""
    try {
        const image = await fetchUnsplashImage(mood);
        imageUrl = image.urls.regular;
        imageElement.src = imageUrl
        imageElement.alt = image.alt_description || mood;
    } catch (error) {
        imageElement.src = "";
        imageElement.alt = "Failed to load image";
    }

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

    updateFavoriteButton(mood, imageUrl, spotifyUrl);
}

function updateFavoriteButton(currentMood, imageUrl, playlistUrl) {
    if (!heartButton) return;

    updateHeart(currentMood); 

    // Remove old listeners before adding new (to avoid duplicates)
    heartButton.replaceWith(heartButton.cloneNode(true));
    const newHeartButton = document.querySelector(".heart-button");

    // Re-add style classes (if needed for styling)
    newHeartButton.classList.add(`${currentMood}-mood`);


    newHeartButton.addEventListener("click", () => {
        if (isFavorite(currentMood)) {
            removeFavorite(currentMood);
        } else {
            saveFavorite({ mood: currentMood, imageUrl, playlistUrl });
        }
        updateHeart(currentMood);
    });
}

function updateHeart(mood) {
    const heart = document.querySelector(".heart-button");
    const fav = isFavorite(mood);

    heart.innerText = fav ? "❤️" : "🤍";
    heart.classList.toggle("active", fav);
}

document.addEventListener("DOMContentLoaded", () => {
    const heartButton = document.querySelector(".heart-button");
    const favoritesButton = document.querySelector(".favorites-button");

    if (heartButton && favoritesButton) {
        heartButton.addEventListener("click", () => {
            favoritesButton.classList.add("animate");

            favoritesButton.addEventListener("animationend", () => {
                favoritesButton.classList.remove("animate");
            }, { once: true });
        });
    }
});