<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { reactive } from 'vue';

let tasks = reactive([
	{ id: 1, name: 'Task 1' },
	{ id: 2, name: 'Task 2' },
	{ id: 3, name: 'Task 3' },
]);
const addTask = () => {
	const newTask = { id: Math.random(), name: `Task ${tasks.length + 1}` };
	tasks.push(newTask);
};
const removeTask = (id) => {
	const index = tasks.findIndex((task) => task.id === id);
	if (index !== -1) tasks.splice(index, 1);
};
</script>
<template>
	<div class="wrapper">
		<h1>Task List</h1>
		<ul>
			<li v-for="task in tasks" :key="task.id">
				<input type="text" v-model="task.name" />
				<button @click="removeTask(task.id)" data-test="button-remove">
					<XMarkIcon class="w-full h-full" />
				</button>
			</li>
		</ul>
		<button @click="addTask" data-test="button-add">Add Task</button>
	</div>
</template>
