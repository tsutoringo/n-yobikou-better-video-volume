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

		this.port = chrome.runtime.connect();
		this.port.postMessage({
			method: 'getState'
		});
		this.port.onMessage.addListener(data => {
			if (data.method == 'setState') {
				this.video.volume = data.state.volume;
				this.video.muted = data.state.muted;
			}
		});
		this.video.addEventListener('volumechange', e => this.changeState(e));
		this.video.addEventListener('click', e => this.changeState(e));
	}

	changeState () {
		this.port.postMessage({
			method: 'setState',
			state: {
				volume: this.video.volume,
				muted: this.video.muted
			}
		});
	}
}

// あとからJSで動画要素が付与されるため多少むりやり
const ob = setInterval(() => {
	const video = BetterVolumeVideo.getVideoElement();
	if (video) {
		clearInterval(ob);
		new BetterVolumeVideo(video);
	}
}, 50);

// 10秒たっても動画が検知されなければ放棄
setTimeout(() => clearInterval(ob), 10 * 1000);
