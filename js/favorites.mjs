
// Get favorites from localStorage
export function getFavorites() {
    return JSON.parse(localStorage.getItem("mood-favorites")) || [];
}

// SAve entire favorites array to localStorage
export function saveFavorites(favorites) {
    localStorage.setItem("mood-favorites", JSON.stringify(favorites));
}

// save one favorite
export function saveFavorite(favorite) {
    const favorites = getFavorites();
    // Prevent duplicates by mood, update if exists
    const index = favorites.findIndex(f => f.mood === favorite.mood);
    if (index >= 0) {
        favorites[index] = favorite;
    } else {
        favorites.push(favorite)
    }  
    saveFavorites(favorites);
}

// remove favorite
export function removeFavorite(mood) {
    const favorites = getFavorites().filter(f => f.mood !== mood);
    saveFavorites(favorites);
}

// if mood is favorited
export function isFavorite(mood) {
    return getFavorites().some(f => f.mood === mood);
}

// render favorites to favorites page
export function renderFavorites() {
    const container = document.getElementById("favorites-container");
    if (!container) return;

    const favorites = getFavorites();
    container.innerHTML = "";

    if (favorites.length === 0) {
        container.innerHTML = "<p>No favorites yet.</p>";
        return;
    }

    favorites.forEach(fav => {
        const item = document.createElement("div");
        item.classList.add("favorite-list-item");

        item.innerHTML = `
        <div class="favorite-info">
            <h2>${fav.mood}</h2>        
            <iframe
                src="${fav.playlistUrl}"
                width="100%"
                height="80"
                frameborder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
        </iframe>
        </div>
        <img src="${fav.imageUrl}" alt="${fav.mood}" class="favorite-image" />
        <button class="remove-btn" data-mood="${fav.mood}">❌</button>
    `;

        container.appendChild(item);

        item.querySelector(".remove-btn").addEventListener("click", () => {
            removeFavorite(fav.mood);
            renderFavorites(); // refresh the list
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
});




