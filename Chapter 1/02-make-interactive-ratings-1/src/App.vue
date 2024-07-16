<script setup>
import { ref } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';
import { items } from './movies.json';
const movies = ref(items);

function updateRating(star, movieIndex) {
	movies.value[movieIndex].rating = star;
}
</script>

<template>
	<div class="app">
		<div class="movie-list">
			<div
				class="movie-item"
				v-for="(movie, movieIndex) in movies"
				:key="movie.id"
			>
				<div class="movie-item-image-wrapper">
					<img :src="movie.image" class="movie-item-image" alt="" />
				</div>

				<div class="movie-item-content-wrapper">
					<div class="movie-item-title-wrapper">
						<h3 class="movie-item-title">{{ movie.name }}</h3>
						<div class="movie-item-genres-wrapper">
							<span
								v-for="genre in movie.genres"
								:key="`${movie.id}-${genre}`"
								class="movie-item-genre-tag"
								>{{ genre }}</span
							>
						</div>
					</div>
					<div class="movie-item-description-wrapper">
						<p class="movie-item-description">{{ movie.description }}</p>
					</div>
					<div class="movie-item-rating-wrapper">
						<span class="movie-item-rating-text">
							Rating: ({{ movie.rating }}/5)
						</span>
						<button
							v-for="star in 5"
							:key="star"
							:class="
								star <= movie.rating ? 'text-yellow-400' : 'text-gray-400'
							"
							:disabled="star === movie.rating"
							@click="updateRating(star, movieIndex)"
						>
							<StarIcon class="movie-item-star-icon" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
