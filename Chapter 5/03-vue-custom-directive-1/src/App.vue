<script setup>
const vFocus = {
	mounted: (el) => el.focus(),
};
</script>
<template>
	<div class="page">
		<!-- Make this directive work! -->
		<input type="text" v-focus />
	</div>
</template>
