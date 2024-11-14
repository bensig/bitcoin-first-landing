async function loadEpisodes() {
    try {
        const response = await fetch('episodes.json');
        return await response.json();
    } catch (error) {
        console.error('Error loading episodes:', error);
        return [];
    }
}
