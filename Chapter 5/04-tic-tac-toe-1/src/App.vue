<script setup>
import { ref, computed } from 'vue';

const player = ref('X');
const board = ref([
	['', '', ''],
	['', '', ''],
	['', '', ''],
]);

const checkThreeInRow = computed(() => {
	let threeInRow = false;
	for (let row of board.value) {
		threeInRow = row.every((cell) => cell !== '' && cell === row[0]);
		if (threeInRow) {
			player.value = row[0];
			break;
		}
	}
	return threeInRow;
});

const checkThreeInColumm = computed(() => {
	let threeInCol = false;
	for (let col = 0; col < board.value[0].length; col++) {
		const firstCell = board.value[0][col];
		if (firstCell && board.value.every((row) => row[col] === firstCell)) {
			threeInCol = true;
			player.value = firstCell;
			break;
		}
	}
	return threeInCol;
});

const checkThreeInDiagonal = computed(() => {
	let threeInDiagonal = false;
	const size = board.value.length;
	const topLeftToBottomRight = board.value[0][0];
	const topRightToBottomLeft = board.value[0][size - 1];

	// Check top-left to bottom-right diagonal
	if (
		topLeftToBottomRight &&
		board.value.every((row, index) => row[index] === topLeftToBottomRight)
	) {
		threeInDiagonal = true;
		player.value = topLeftToBottomRight;
	}

	// Check top-right to bottom-left diagonal
	if (
		topRightToBottomLeft &&
		board.value.every(
			(row, index) => row[size - 1 - index] === topRightToBottomLeft
		)
	) {
		threeInDiagonal = true;
		player.value = topRightToBottomLeft;
	}

	return threeInDiagonal;
});

const isTie = computed(() => !board.value.flat().includes(''));

function markCell(numRow, numCell) {
	if (board.value[numRow][numCell] === '' && !isFinished.value) {
		board.value[numRow][numCell] = player.value;
		player.value = player.value === 'X' ? 'O' : 'X';
	}
}

function startNewGame() {
	board.value = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	player.value = 'X';
}

const isFinished = computed(
	() =>
		isTie.value ||
		checkThreeInRow.value ||
		checkThreeInColumm.value ||
		checkThreeInDiagonal.value
);
</script>
<template>
	<main
		class="h-screen flex flex-col justify-center items-center text-white bg-slate-800"
	>
		<h1 class="text-4xl py-2">Tic-Tac-Toe</h1>
		<p v-if="!isFinished" class="text-xl py-2">Player {{ player }}'s turn</p>
		<div v-else class="flex flex-col items-center gap-2 mb-4">
			<p v-if="!isTie" class="text-6xl">Player {{ player }} wins</p>
			<p v-else class="text-6xl">Is tie</p>
			<button class="bg-blue-500 p-2 rounded text-white" @click="startNewGame">
				New game
			</button>
		</div>
		<div v-for="(row, numRow) in board" :key="numRow" class="flex flex-row">
			<button
				v-for="(cell, numCell) in row"
				:key="numCell"
				@click="markCell(numRow, numCell)"
				class="w-24 h-24 text-5xl border-white border-2"
				:class="{
					'text-green-400': cell === 'X',
					'text-orange-400': cell === 'O',
				}"
			>
				{{ cell }}
			</button>
		</div>
	</main>
</template>
