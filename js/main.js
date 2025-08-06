import { getSpotifyURL, fetchUnsplashImage } from "./api.js";

const moodMenu = document.getElementById("mood-menu");
const moods = ["chill", "study", "happy"];

document.addEventListener("DOMContentLoaded", () => {
    preloadMoodButtonImages();
});


async function preloadMoodButtonImages() {
    for (const mood of moods) {
        try {
            const image = await fetchUnsplashImage(mood);
            const button = document.querySelector(`[data-mood="${mood}"]`);
            if (button && image) {
                button.style.backgroundImage = `url(${image.urls.small})`;
            }
        } catch (error) {
            console.error(`Could not load background for mood "${mood}":`, error);
        }
    }

}
