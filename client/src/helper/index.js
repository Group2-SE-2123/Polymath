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

// function that takes in a number and returns a string of that number in words
const getUpdatedCounter = (counter, date) => {
	const passedSeconds = getSecondsSince(date);
	const newCounter = counter - passedSeconds;
	return newCounter;
};

// function that takes in a number and returns a string of that number in words
const numberToLetter = (number) => {
	return String.fromCharCode(65 + number);
};

export { getSecondsSince, getRandomNumber, getUpdatedCounter, numberToLetter };
