<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import RatingInput from './components/RatingInput.vue';

const NUM_STARS = 10;

const rating = ref(0);

function incrementStars() {
	if (rating.value < NUM_STARS) rating.value += 1;
}

function decrementStarts() {
	if (rating.value > 0) rating.value -= 1;
}

function handleKeyDown(event) {
	if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
		incrementStars();
	} else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
		decrementStarts();
	} else if (event.key >= '0' && event.key <= '9') {
		rating.value = parseInt(event.key, 10);
	}
}

function updateRating(value) {
	rating.value = value;
}

onMounted(() => {
	window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
	window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
	<div>
		<h1>Rating Input Feature Challenge</h1>
		<RatingInput
			:modelValue="rating"
			:count="NUM_STARS"
			@update:modelValue="updateRating"
		/>
		<p>You selected rating: {{ rating }}</p>
	</div>
</template>
