<script setup>
import { computed } from 'vue';
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/vue/24/outline';

const props = defineProps({
	modelValue: { type: Number, default: 0 },
	count: { type: Number, default: 5 },
});

const emit = defineEmits(['update:modelValue']);

const isPerfectRating = computed(() => {
	return props.modelValue === 10;
});

function updateRating(rating) {
	emit('update:modelValue', rating);
}
</script>

<template>
	<div class="rating-wrapper">
		<button v-for="i in props.count" :key="i" @click="updateRating(i)">
			<StarIconSolid
				v-if="i <= modelValue"
				class="star"
				:class="{
					'solid-star': !isPerfectRating,
					'perfect-rating': isPerfectRating,
				}"
			/>
			<StarIconOutline v-else class="star outline-star" />
		</button>
	</div>
</template>

<style scoped>
.rating-wrapper {
	display: flex;
	flex-direction: row;
}

.star {
	height: 24px;
	width: 24px;
	color: none;
}

.rating-wrapper button {
	background: none;
	border: none;
}

.solid-star {
	color: yellow;
}

.outline-star {
	color: gray;
}

.perfect-rating {
	color: gold;
}
</style>
