// function that takes in a date and returns how many seconds have passed since that date
const getSecondsSince = (date) => {
	const now = new Date();
	const seconds = Math.floor((now - Date.parse(date)) / 1000);
	return seconds;
};

// function that returns a random number between min and max
const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUpdatedCounter = (counter, date) => {
	const passedSeconds = getSecondsSince(date);
	const newCounter = counter - passedSeconds;
	return newCounter;
};

const numberToLetter = (number) => {
	return String.fromCharCode(65 + number);
};

export { getSecondsSince, getRandomNumber, getUpdatedCounter, numberToLetter };
