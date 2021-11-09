export const randomID = () => {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};

export const findTaskIndex = (array, findItem) => {
	let itemIndex = -1;
	array.forEach((item, index) => {
		if (item._id === findItem._id) {
			itemIndex = index;
		}
	});
	return itemIndex;
};

export const updateLocalStorage = (name, value) => {
	localStorage.setItem(`${name}`, JSON.stringify(value));
};
