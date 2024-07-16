<script setup>
import { reactive } from 'vue';
import { items } from './movies.json';
import { StarIcon } from '@heroicons/vue/24/solid';

const movies = reactive(items);
</script>

<template>
	<!-- This is where your template goes	-->
	<div>
		<ul class="flex flex-row items-center gap-4">
			<li
				v-for="movie in movies"
				:key="movie.id"
				class="w-96 h-auto shadow-2xl bg-white rounded-md flex flex-col items-center justify-start"
			>
				<img
					:src="movie.image"
					:alt="movie.name"
					class="w-full h-96 rounded-t-md"
				/>
				<h2 class="text-2xl">{{ movie.name }}</h2>
				<ul class="flex flex-row items-center justify-start gap-4 w-full">
					<li
						v-for="genre in movie.genres"
						:key="`${movie.id}-${genre}`"
						class="text-xs bg-indigo-500 text-white py-0.5 px-2 rounded-full"
					>
						{{ genre }}
					</li>
				</ul>
				<p>{{ movie.description }}</p>
				<div class="flex flex-row gap-1">
					<StarIcon
						v-for="star in movie.rating"
						:key="`star-${star}`"
						class="h-5 w-5 text-yellow-400"
					/>
				</div>
			</li>
		</ul>
	</div>
</template>
