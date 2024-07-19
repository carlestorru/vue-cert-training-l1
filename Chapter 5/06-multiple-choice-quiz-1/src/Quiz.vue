<script setup>
import { ref } from 'vue';
const questions = [
	{
		question: 'What is the capital of France?',
		options: ['London', 'Berlin', 'Paris', 'Rome'],
		answer: 'Paris',
	},
	{
		question: 'Which planet is closest to the sun?',
		options: ['Earth', 'Mars', 'Venus', 'Mercury'],
		answer: 'Mercury',
	},
	{
		question: 'Which is my favorite dish?',
		options: ['Pasta', 'Pizza', 'Burger', 'Sushi'],
		answer: 'Sushi',
	},
];

const questionNum = ref(0);
const selectedOption = ref(null);
const score = ref(0);
const isSubmited = ref(false);
const isFinish = ref(false);

function onSubmitAnswer() {
	if (selectedOption.value === questions[questionNum.value].answer) {
		score.value += 1;
	}
	isSubmited.value = true;
}

function nextQuestion() {
	questionNum.value += 1;
	isSubmited.value = false;
	if (questionNum.value === questions.length) {
		isFinish.value = true;
	}
}
</script>
<template>
	<div v-if="!isFinish">
		<h2 class="p-4 text-4xl border-b border-black">
			{{ questions[questionNum].question }}
		</h2>
		<div
			v-for="(option, index) in questions[questionNum].options"
			:key="option"
			class="flex flex-row gap-4 text-2xl py-4"
		>
			<input
				type="radio"
				:id="`option-${index}`"
				:value="option"
				v-model="selectedOption"
				:disabled="isSubmited"
			/>
			<label :for="`option-${index}`">{{ option }}</label>
		</div>
		<div class="flex flex-row justify-between items-center gap-2">
			<div class="flex-1">
				<p
					v-if="isSubmited"
					class="p-2 border text-center"
					:class="{
						'bg-green-500 text-green-900 border-green-900':
							selectedOption === questions[questionNum].answer,
						'bg-red-500 text-red-900 border-red-900':
							selectedOption !== questions[questionNum].answer,
					}"
				>
					{{
						selectedOption === questions[questionNum].answer
							? 'Correct'
							: 'Incorrect'
					}}
				</p>
			</div>
			<button
				v-if="!isSubmited"
				@click="onSubmitAnswer"
				class="bg-blue-500 p-2 w-24 text-white hover:bg-blue-600"
			>
				Submit
			</button>
			<button
				v-else
				@click="nextQuestion"
				class="bg-blue-500 p-2 w-24 text-white hover:bg-blue-600"
			>
				Next
			</button>
		</div>
	</div>
	<div v-else class="text-4xl">
		<p>Your final score is {{ score }} out of {{ questions.length }}</p>
	</div>
</template>
