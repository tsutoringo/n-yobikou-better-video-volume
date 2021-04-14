import {EventEmitter} from 'events';

/**
 * 
 * @param {String} type 
 * @param {Any} data 
 * @returns {Promise}
 */
export function emit (type, data) {
	return new Promise((resolve) => {
		chrome.runtime.sendMessage(
			{type, data},
			resolve
		);
	});
}

export function comini () {
	const e = new EventEmitter();
	chrome.runtime.onMessage
		.addListener(
			function (r, sender, sendResponse){
				e.emit(r.type, r.data, sendResponse);
				return true;
			}
		);
	return e;
}