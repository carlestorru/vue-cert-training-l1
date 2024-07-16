import { createApp } from 'vue';
import App from './App.vue';
import '../style.css';

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import MovieDetailPage from './pages/MovieDetailPage.vue';

const routes = [
	{ path: '/', component: HomePage },
	{
		path: '/:id',
		name: 'movie',
		component: MovieDetailPage,
		props: (route) => ({ id: Number(route.params.id) }),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(App).use(router).mount('#app');
