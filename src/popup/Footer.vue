<template>
	<footer>
		<fa-icon icon="code-branch" class="icon"/>
		<span class="repository">
			<a href="https://github.com/tsutoringo/n-yobikou-better-video-volume" target="_blank">n-yobikou-better-video-volume</a>
		</span>
		@
		<span class="commit-hash"><a :href="`https://github.com/tsutoringo/n-yobikou-better-video-volume/commit/${commitHash}`" target="_blank">{{commitHash}}</a></span>
	</footer>
</template>
<script>
export default {
	name: 'v-footer',
	computed: {
		commitHash () {
			return process.env.VUE_APP_GIT_HASH
		}
	}
}
</script>
<style scoped>
footer {
	color: white;
	padding: 5px;
	background-color: #37474F;
}
footer .icon {
	margin-right: 5px;
	color: #81C784;
}
</style>