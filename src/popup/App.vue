<template>
	<div id="app">
		<main>
		</main>
		<div class="controller">
			<div class="volume-range">
				<input type="range" max="1" step="0.01" v-model="volume">
			</div>
			<div class="detail">
				<span class="vol">
					音量設定 <input class="vol-num" type="number" max="100" step="0.01" min="0" v-model="volNum">%
				</span>
				<span class="mute">
					<label>
						<input type="checkbox" v-model="muted">
						<fa-icon v-if="muted || volume == 0" icon="volume-mute" />
						<fa-icon v-else icon="volume-up" />
					</label>
				</span>
			</div>
		</div>
		<v-footer />
	</div>
</template>

<script>
import VFooter from './Footer';
export default {
	name: 'App',
	components: { VFooter },
	data: () => ({
		volume: 0,
		muted: false,
		port: null
	}),
	computed: {
		volNum: {
			set (val) {
				this.volume = Math.min(val / 100, 1);
			},
			get () {
				return (this.volume * 100).toFixed(2);
			}
		}
	},
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
	width: 300px;
}

body {
	margin: 0;
}

#app {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #607D8B;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

main {
	height: auto;
	flex: 1;
}

.controller .detail {
	padding: 4px;
	color: #ececec;
	display: flex;
}

.controller .detail .vol {
	margin-right: auto;
}

.controller .detail .mute {
	transform: scale(1.4);
}

.controller .detail .mute input {
	display: none;
}

.vol-num {
	min-width: 100px;
}
</style>
<style>

a {
	color: #81C784;
	text-decoration: none;
}

input[type="text"],input[type="number"] {
	color: #ececec;
	outline: none;
	border: none;
	background-color: transparent;
}

input[type="range"] {
	box-sizing: border-box;
	-webkit-appearance: none;
	appearance: none;
	cursor: pointer;
	outline: none; 
	height: 3px; 
	width: 100%; 
	background: #ffffff;
	margin: 5px 0;
}

input[type="range"]::-webkit-slider-thumb {
	box-sizing: border-box;
	-webkit-appearance: none;
	background: #ffffff;
	width: 11px; 
	height: 11px;
	border-radius: 50%;
}
</style>
