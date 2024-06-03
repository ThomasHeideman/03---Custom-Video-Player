'use strict';

const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const skipBck = document.getElementById('skipBck');
const skipFwd = document.getElementById('skipFwd');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const overlayIcon = document.getElementById('overlay-icon');

// Play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
    hideIconOverlay();
  } else {
    video.pause();
    showPlayIconOverlay();
  }
}

// Show play icon overlay
function showPlayIconOverlay() {
  overlayIcon.classList.add('overlay-icon-visible');
  const icon = overlayIcon.querySelector('i');
  icon.classList.remove('fa-pause');
  icon.classList.add('fa-play');
}

// Hide icon overlay
function hideIconOverlay() {
  overlayIcon.classList.remove('overlay-icon-visible');
}

// Show pause icon overlay
function showPauseIconOverlay() {
  overlayIcon.classList.add('overlay-icon-visible');
  const icon = overlayIcon.querySelector('i');
  icon.classList.remove('fa-play');
  icon.classList.add('fa-pause');
}

function iconOverlay() {
  if (!video.paused) {
    showPauseIconOverlay();
  }
}

// Update play/pause icon
function updatePlayIcon() {
  const icon = play.querySelector('i');
  if (video.paused) {
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
  } else {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
  }
}

// Update progress & timestamp
function updateProgress() {
  let duration = video.duration;
  let currentTime = video.currentTime;
  let percentage = (currentTime / duration) * 100;

  // Update range slider
  progress.value = (currentTime / duration) * 100;
  document.getElementById('progress-fill').style.width = percentage + '%';

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + mins;
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + secs;
  }
  timestamp.textContent = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

// Set Video Backward
function skipBack() {
  video.currentTime = Math.max(0, video.currentTime - 5);
}

// Set Video Forward
function skipForward() {
  video.currentTime = Math.min(video.duration, video.currentTime + 5);
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('mouseover', iconOverlay);
video.addEventListener('mouseout', hideIconOverlay);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
skipBck.addEventListener('click', skipBack);
skipFwd.addEventListener('click', skipForward);

progress.addEventListener('change', setVideoProgress);
