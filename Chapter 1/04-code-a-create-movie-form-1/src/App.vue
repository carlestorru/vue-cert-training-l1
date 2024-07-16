<script setup>
import { ref, reactive } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';
import { items } from './movies.json';
const movies = ref(items);

const form = reactive({
	name: { value: null, error: null },
	description: { value: null, error: null },
	image: { value: null, error: null },
	inTheaters: { value: false, error: null },
	genres: { value: [], error: null },
});

const genres = ['Drama', 'Action', 'Comedy', 'Crime'];

function updateRating(movieIndex, rating) {
	movies.value[movieIndex].rating = rating;
}

function clearFormValues() {
	form.name.value = null;
	form.description.value = null;
	form.image.value = null;
	form.inTheaters.value = false;
	form.genres.value = [];
}

function clearFormErrors() {
	form.name.error = null;
	form.description.error = null;
	form.image.error = null;
	form.inTheaters.error = false;
	form.genres.error = [];
}

function hideForm() {
	clearFormValues();
	showForm.value = false;
}

function validForm() {
	let isValid = true;
	if (form.name.value === null || form.name.value.trim() !== '') {
		form.name.error = 'Can not be empty';
		isValid = false;
	}

	if (form.genres.value.length === 0) {
		form.genres.error = 'At least you must select one';
		isValid = false;
	}
	return isValid;
}

function insertMovie() {
	if (validForm()) {
		const movie = {
			id: Number(Date.now()),
			name: form.name.value,
			description: form.description.value,
			image: form.image.value,
			genres: form.genres.value,
			inTheaters: form.inTheaters.value,
			rating: null,
		};
		movies.value.push(movie);
		hideForm();
	}
}

const showForm = ref(false);
</script>

<template>
	<div class="app">
		<div v-if="showForm" class="modal-wrapper">
			<div class="modal-wrapper-inner">
				<form @submit.prevent="addMovie">
					<div class="movie-form-input-wrapper">
						<label for="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							class="movie-form-input"
							v-model="form.name.value"
							required
						/>
						<span v-if="form.name.error" class="text-red-500">{{
							form.name.error
						}}</span>
					</div>
					<div class="movie-form-input-wrapper">
						<label for="description">Description</label>
						<textarea
							type="text"
							name="description"
							id="description"
							v-model="form.description.value"
							class="movie-form-textarea"
						/>
					</div>
					<div class="movie-form-input-wrapper">
						<label for="image">Image</label>
						<input
							type="text"
							name="image"
							id="image"
							v-model="form.image.value"
							class="movie-form-input"
						/>
					</div>
					<div class="movie-form-input-wrapper">
						<label for="genre">Genres</label>
						<select
							name="genre"
							id="genre"
							v-model="form.genres.value"
							class="movie-form-input"
							multiple
							required
						>
							<option v-for="option in genres" :key="option" :value="option">
								{{ option }}
							</option>
						</select>
						<span v-if="form.genres.error" class="text-red-500">{{
							form.genres.error
						}}</span>
					</div>
					<div class="movie-form-input-wrapper">
						<label for="inTheaters" class="movie-form-checkbox-label">
							<input
								type="checkbox"
								id="inTheaters"
								v-model="form.inTheaters.value"
								:true-value="true"
								:false-value="false"
								class="movie-form-checkbox"
							/>
							<span>In theaters</span>
						</label>
					</div>

					<div class="movie-form-actions-wrapper">
						<button type="button" class="button" @click="hideForm">
							Cancel
						</button>

						<button type="submit" class="button-primary" @click="insertMovie">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
		<div class="movie-actions-list-wrapper">
			<div class="flex-spacer"></div>
			<div class="movie-actions-list-actions">
				<button
					class="movie-actions-list-action-button"
					:class="{
						'button-primary': !showForm,
						'button-disabled': showForm,
					}"
					@click="showForm = true"
					:disabled="showForm.value"
				>
					Add Movie
				</button>
			</div>
		</div>
		<div class="movie-list">
			<div
				class="movie-item"
				v-for="(movie, movieIndex) in movies"
				:key="movie.id"
			>
				<div class="movie-item-image-wrapper">
					<div class="movie-item-star-wrapper">
						<StarIcon
							id="rating"
							class="movie-item-star-rating-icon"
							:class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']"
						/>
						<div class="movie-item-star-content-wrapper">
							<span
								v-if="movie.rating"
								id="rating-stars"
								class="movie-item-star-content-rating-rated"
							>
								{{ movie.rating }}
							</span>
							<span v-else class="movie-item-star-content-rating-not-rated">
								-
							</span>
						</div>
					</div>
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

						<div class="movie-item-star-icon-wrapper">
							<button
								v-for="star in 5"
								:key="star"
								class="movie-item-star-icon-button"
								:class="[
									star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
								]"
								:disabled="star === movie.rating"
								@click="updateRating(movieIndex, star)"
							>
								<StarIcon class="movie-item-star-icon" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
