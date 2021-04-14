import chromep from 'chrome-promise';

let state = {volume: 0, muted: false};

chromep.storage.local.get({ volume: 0.2, muted: false }).then(data => {
	state.volume = data.volume;
	state.muted = data.muted;
});

const ports = [];

chrome.runtime.onConnect.addListener(function (port) {
	ports.push(port);
	console.log(port);
	port.onMessage.addListener(function (data) {
		if (data.method === 'getState') {
			port.postMessage({
				method: 'setState',
				state
			});
		} else if (data.method === 'setState') {
			state = Object.assign({...state}, data.state);
			ports.every( (p, i) => {
				try {
					p.postMessage({
						method: 'setState',
						state
					});
				} catch (e) {
					ports.splice(i, 1);
				}
			})
			chromep.storage.local.set(state);
		}
	});
});