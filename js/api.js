// Spotify playlist IDs
const spotifyMoodPlaylist = {
    chill: "37i9dQZF1DX889U0CL85jj",
    study: "37i9dQZF1DX8NTLI2TtZa6",
    happy: "37i9dQZF1DXdPec7aLTmlC"
};

const unsplashAccessKey = "dvS5O75bjw0KiU6vl2SvvPdSVygAiPxxOLTzVLjL708";

export function getSpotifyURL(mood) {
    const playlistId = spotifyMoodPlaylist[mood.toLowerCase()];
    if (!playlistId)
        return null;

    return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
}

export async function fetchUnsplashImage(mood) {
    const endpoint = `https://api.unsplash.com/search/photos?query=${mood}&per_page=9&client_id=${unsplashAccessKey}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (!data.results || data.results.length === 0)
            return null;

        const randomIndex = Math.floor(Math.random() * data.results.length);
        return data.results[randomIndex];
    } catch (error) {
        console.error("Unsplash error:", error)
        throw error;
    }
}