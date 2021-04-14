import {emit} from '../util/comini';

class BetterVolumeVideo {
	static videoId = ['#video01', '#movie', '#video-player'];
	static getVideoElement = () => document.querySelector(BetterVolumeVideo.videoId.join(', '));
	/**
	 * 
	 * @param {HTMLVideoElement} video 
	 */
	constructor (video) {
		this.video = video;
		this.video.volume = 0;
		this.video.volume = 0;

		emit('getState').then(state => {
			this.video.volume = state.volume;
			this.video.muted = state.muted;
		});
		this.video.addEventListener('volumechange', e => this.changeState(e));
		this.video.addEventListener('click', e => this.changeState(e));
	}

	changeState () {
		emit('setState', {
			volume: this.video.volume,
			muted: this.video.muted
		});
	}
}

const ob = setInterval(() => {
	const video = BetterVolumeVideo.getVideoElement();
	if (video) {
		clearInterval(ob);
		new BetterVolumeVideo(video);
	}
}, 50);

setTimeout(() => clearInterval(ob), 20 * 1000);
