"use strict"

// دسترسی به عناصر HTML برای نمایش آهنگ
const image = document.querySelector("#cover")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const music = document.querySelector("audio")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const background = document.getElementById("background")

// آرایه‌ای از آهنگ‌ها با اطلاعات مربوط به هر آهنگ
const songs = [
    { path: "media/html.mp4", displayName: "Html Padcast", artist: "Ozbi", cover: "https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg" },
    { path: "media/kar.mp4", displayName: "Developing", artist: "Flora Cash", cover: "image/peakpx.jpg" },
    { path: "media/bazar.mp4", displayName: "Earn", artist: "Linkin Park", cover: "https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg" }
]

// تعیین وضعیت پخش
let isPlaying = false

// پخش آهنگ
function playSong() {
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "Pause")
    music.play()
}

// توقف آهنگ
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "Play")
    music.pause()
}

// تغییر وضعیت پخش/توقف بر اساس کلیک کاربر
playBtn.addEventListener("click", function() {
    isPlaying ? pauseSong() : playSong()
})

// بارگذاری آهنگ جدید
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = song.path
    changeCover(song.cover)
}

// تغییر کاور و پس‌زمینه آهنگ
function changeCover(cover) {
    image.classList.remove("active")
    setTimeout(() => {
        image.src = cover
        image.classList.add("active")
    }, 100)
    background.src = cover
}

// آهنگ فعلی
let songIndex = 0

// پخش آهنگ قبلی
function prevSong() {
    songIndex = songIndex > 0 ? songIndex - 1 : songs.length - 1
    loadSong(songs[songIndex])
    playSong()
}

// پخش آهنگ بعدی
function nextSong() {
    songIndex = songIndex < songs.length - 1 ? songIndex + 1 : 0
    loadSong(songs[songIndex])
    playSong()
}

// بارگذاری اولین آهنگ
loadSong(songs[songIndex])

// به‌روزرسانی نوار پیشرفت و زمان
function updateProgressBar(e) {
    if (isPlaying) {
        const duration = e.srcElement.duration
        const currentTime = e.srcElement.currentTime
        progress.style.width = (currentTime / duration) * 100 + "%"

        // محاسبه و نمایش زمان آهنگ
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60).toString().padStart(2, "0")
        durationEl.textContent = durationMinutes + ":" + durationSeconds

        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, "0")
        currentTimeEl.textContent = currentMinutes + ":" + currentSeconds
    }
}

// تنظیم نوار پیشرفت بر اساس کلیک کاربر
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = music.duration
    music.currentTime = (clickX / width) * duration
}

// رویدادهای مربوط به دکمه‌ها و نوار پیشرفت
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
music.addEventListener("ended", nextSong)
music.addEventListener("timeupdate", updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)

