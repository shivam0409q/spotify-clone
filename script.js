const songs = [
    { title: "Song 1", artist: "Artist 1", album: "Album 1", src: "song1.mp3", art: "https://via.placeholder.com/200" },
    { title: "Song 2", artist: "Artist 2", album: "Album 2", src: "song2.mp3", art: "https://via.placeholder.com/200" },
    { title: "Song 3", artist: "Artist 3", album: "Album 3", src: "song3.mp3", art: "https://via.placeholder.com/200" },
    // Add more songs here
];

let currentSongIndex = 0;
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const currentArt = document.getElementById('current-art');
const songList = document.getElementById('song-list');
const searchInput = document.getElementById('search-input');

// Load songs into the list
function loadSongs(filteredSongs = songs) {
    songList.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerHTML = `
            <img src="${song.art}" alt="${song.album}">
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;
        songItem.addEventListener('click', () => playSong(index));
        songList.appendChild(songItem);
    });
}

// Play a song
function playSong(index) {
    currentSongIndex = index;
    const song = songs[index];
    audio.src = song.src;
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentArt.src = song.art;
    audio.play();
    playBtn.textContent = '⏸';
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Search
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    loadSongs(filtered);
});

// Initialize
loadSongs();