<script setup>
import { ref, unref } from 'vue';

const model = defineModel();

const newUserInfo = ref({ ...unref(model) });

function update() {
	model.value = { ...unref(newUserInfo) };
}
function cancelForm() {
	newUserInfo.value = { ...unref(model) };
}
</script>

<template>
	<form @submit.prevent="update" class="card">
		<div class="space-y-12">
			<div class="container">
				<div>
					<h2 class="title">Profile</h2>
					<p class="description">Update your user profile here.</p>
				</div>

				<div class="content">
					<div class="sm:col-span-3">
						<label for="first-name" class="label">First name</label>
						<div class="mt-2">
							<input
								v-model="newUserInfo.firstName"
								type="text"
								name="first-name"
								id="first-name"
								autocomplete="given-name"
								class="input"
							/>
						</div>
					</div>

					<div class="sm:col-span-3">
						<label for="last-name" class="label">Last name</label>
						<div class="mt-2">
							<input
								v-model="newUserInfo.lastName"
								type="text"
								name="last-name"
								id="last-name"
								autocomplete="family-name"
								class="input"
							/>
						</div>
					</div>

					<div class="sm:col-span-4">
						<label for="email" class="label">Email address</label>
						<div class="mt-2">
							<input
								v-model="newUserInfo.email"
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								class="input"
							/>
						</div>
					</div>

					<div class="col-span-full">
						<label for="about" class="label">About</label>
						<div class="mt-2">
							<textarea
								v-model="newUserInfo.about"
								id="about"
								name="about"
								rows="3"
								class="input"
							/>
						</div>
						<p class="hint">Write a few sentences about yourself.</p>
					</div>
				</div>
			</div>
		</div>
		<div class="buttons">
			<button type="button" class="muted" @click="cancelForm">Cancel</button>
			<button type="submit" class="primary">Save</button>
		</div>
	</form>
</template>
