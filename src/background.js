import {comini} from './util/comini';
import chromep from 'chrome-promise';

const reciever = comini();
let state = {volume: 0, muted: false};

chromep.storage.local.get({ volume: 0.2, muted: false }).then(data => {
	state.volume = data.volume;
	state.muted = data.muted;
});

reciever.on('getState', (data, res) => {
	res(state);
});

reciever.on('setState', s => {
	state.volume = s.volume || state.volume;
	state.muted = s.muted == void 0 ? state.muted : s.muted;
	chromep.storage.local.set(s);
})