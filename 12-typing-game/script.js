const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving',
];

// Init
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value from localStorage or Medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// Starting counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}

// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
	time--;
	timeEl.innerHTML = time + 's';

	if (time === 0) {
		clearInterval(timeInterval);
		// End game
		gameOver();
	}
}

// Game over, show end screen
function gameOver() {
	endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play again</button>
    `;

	endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', (e) => {
	const insertedText = e.target.value;
	console.log(insertedText);

	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();
		// Clear
		e.target.value = '';

		// if (difficulty === 'hard') {
		// 	time += 2;
		// } else if (difficulty === 'medium') {
		// 	time += 3;
		// } else {
		// 	time += 5;
		// }

		switch (difficulty) {
			case 'hard':
				time += 1;
				break;
			case 'easy':
				time += 5;
				break;
			default:
				time += 3;
		}

		updateTime();
	}
});

// Settings button click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', (e) => {
	difficulty = e.target.value;
	localStorage.setItem('difficulty', difficulty);
});
