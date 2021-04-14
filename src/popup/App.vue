<template>
	<div>
		volume: <input type="range" max="1" step="0.000000001" v-model="volume"><br>
		muted: <input type="checkbox" v-model="muted">
	</div>
</template>

<script>

export default {
	name: 'App',
	components: { },
	data: () => ({
		volume: 0,
		muted: false,
		port: null
	}),
	watch: {
		muted () {
			this.setState();
		},
		volume () {
			this.setState();
		}
	},
	methods: {
		setState () {
			this.port.postMessage({
				method: 'setState',
				state: {
					volume: this.volume,
					muted: this.muted
				}
			});
		}
	},
	mounted () {
		this.port = chrome.runtime.connect();
		this.port.postMessage({
			method: 'getState'
		});
		this.port.onMessage.addListener(data => {
			if (data.method == 'setState') {
				this.volume = data.state.volume;
				this.muted = data.state.muted;
			}
		});
	}
}
</script>

<style>
html {
	width: 400px;
	height: 400px;
}
</style>
