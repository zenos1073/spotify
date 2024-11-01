console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let currentTimeDisplay = document.getElementById('currentTime');
let durationDisplay = document.getElementById('duration');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "HENJUNAHA-Angom Khongnangthaba", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Checklagum", filePath: "songs/2.mp3", coverPath: "covers/2.png"},
    {songName: "Maroon 5 - Cold ft. Future (Audio)", filePath: "songs/3.mp3", coverPath: "covers/3.png"},
    {songName: "Lukas Graham - 7 Years [Official Music Video]", filePath: "songs/4.mp3", coverPath: "covers/4.png"},
    {songName: "MEIKHU Official Audio A LIFE IN LIMBO original", filePath: "songs/5.mp3", coverPath: "covers/5.png"},
    {songName: "PAPHAL - Preeti Yumnam feat. LIFE IN LIMBO || Lyrics", filePath: "songs/2.mp3", coverPath: "covers/6.png"},
    {songName: "Shane Filan - Beautiful In White (Official Video)", filePath: "songs/2.mp3", coverPath: "covers/7.png"},
    {songName: "Anuv Jain - HUSN (Official Video)", filePath: "songs/2.mp3", coverPath: "covers/8.png"},
    {songName: "The Local Train - Choo Lo", filePath: "songs/2.mp3", coverPath: "covers/9.png"},
    {songName: "Lord Huron - The Night We Met (Official Audio)", filePath: "songs/4.mp3", coverPath: "covers/10.png"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Format time in minutes and seconds
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) {
        secs = `0${secs}`;
    }
    return `${minutes}:${secs}`;
}


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('loadedmetadata', () => {
    durationDisplay.innerText = formatTime(audioElement.duration);
});


audioElement.addEventListener('timeupdate', () => {
    
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);

    
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
