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

// function that takes in a list of booleans and returns if all are true and false if otherwise
const allTrue = (list) => {
	return list.every((item) => item === true);
};

const transformQueryObject = (list) => {
	const isLoading = list.every((item) => item.isLoading === true);
	const isError = list.every((item) => item.isError === true);
	const hasData = list.every((item) => item.data);
	return [isLoading, isError, hasData];
};

// function that takes in a list of objects
// the object has a a key of 'state' which is a boolean and a key of 'component' which is an html element
// the function loops through the list and returns the html element if the state is true
const getComponent = (list) => {
	return list.find((item) => item.state === true).component;
};

export {
	getSecondsSince,
	getRandomNumber,
	getUpdatedCounter,
	numberToLetter,
	allTrue,
	transformQueryObject,
	getComponent,
};
