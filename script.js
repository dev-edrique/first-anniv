const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = musicToggle.querySelector('.music-label');

function updateMusicControl() {
	const playing = !music.paused;
	musicToggle.classList.toggle('is-playing', playing);
	musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
	musicLabel.textContent = playing ? 'Our song is playing' : 'Play our song';
}

function playMusic() {
	music.play().then(updateMusicControl).catch(updateMusicControl);
}
// Ask for playback immediately; supported browsers begin the song as the invitation appears.
window.addEventListener('DOMContentLoaded', playMusic, {
	once: true
});
musicToggle.addEventListener('click', () => {
	if (music.paused) playMusic();
	else {
		music.pause();
		updateMusicControl();
	}
});
music.addEventListener('play', updateMusicControl);
music.addEventListener('pause', updateMusicControl);

function showView(id) {
	const next = document.getElementById(id);
	const current = document.querySelector('.view-active');
	if (current === next) return;
	current.classList.remove('view-active');
	window.setTimeout(() => {
		current.hidden = true;
		next.hidden = false;
		requestAnimationFrame(() => next.classList.add('view-active'));
		history.replaceState(null, '', `#${id}`);
	}, 360);
}
document.getElementById('openEnvelope').addEventListener('click', (event) => {
	const button = event.currentTarget;
	if (button.classList.contains('opening')) return;
	button.classList.add('opening');
	playMusic();
	window.setTimeout(() => showView('rsvp'), 780);
});
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
noButton.addEventListener('click', () => {
	noButton.hidden = true;
	yesButton.textContent = 'Joke, I am available';
	document.getElementById('jokeNote').hidden = false;
	yesButton.focus();
});
yesButton.addEventListener('click', () => showView('work-check'));
document.getElementById('workYesButton').addEventListener('click', () => showView('celebration'));
document.getElementById('workNoButton').addEventListener('click', () => {
	document.getElementById('openEnvelope').classList.remove('opening');
	noButton.hidden = false;
	yesButton.textContent = 'Yes, I am';
	document.getElementById('jokeNote').hidden = true;
	showView('welcome');
});

function getAnniversaryMidnight() {
	const now = new Date();
	const year = now.getFullYear();
	let target = new Date(`${year}-09-22T00:00:00+08:00`);
	if (now >= target) target = new Date(`${year + 1}-09-22T00:00:00+08:00`);
	return target;
}
const targetDate = getAnniversaryMidnight();

function updateCountdown() {
	const seconds = Math.floor(Math.max(0, targetDate.getTime() - Date.now()) / 1000);
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	document.getElementById('days').textContent = String(days).padStart(2, '0');
	document.getElementById('hours').textContent = String(hours).padStart(2, '0');
	document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
	document.getElementById('seconds').textContent = String(seconds % 60).padStart(2, '0');
}
updateCountdown();
window.setInterval(updateCountdown, 1000);