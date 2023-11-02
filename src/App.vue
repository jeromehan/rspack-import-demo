<script>
const HelloWorld = async () => await import("./components/HelloWorld.vue")
export default {
	components: { HelloWorld },
	data: () => {
		return {
			isAdd: true
		}
	}
};
</script>

<template>
	<div>
		<router-view />
	</div>
</template>

<style scoped lang="less">
.container2 {
	text-align: center;
}

.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #eeea8caa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
