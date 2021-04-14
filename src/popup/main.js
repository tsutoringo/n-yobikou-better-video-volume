import Vue from 'vue';
import App from './App.vue';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faVolumeMute, faVolumeUp, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faVolumeMute, faVolumeUp, faCodeBranch);

Vue.component('fa-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(App)
});
