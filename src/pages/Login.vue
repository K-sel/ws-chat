<script setup>
import { ref } from "vue";
import { router } from "../routes/router.js";
import { connect } from "../store/chat.js";

const error = ref(null);
const regex = /^[A-Za-z]+$/;

const login = async (e) => {
  e.preventDefault();
  const input = document.getElementById("username");
  const username = input.value.trim();

  if (!username) {
    error.value = "Username cannot be empty.";
    return;
  }

  if (regex.test(username) && username.length >= 2 && username.length <= 20) {
    
    if (await connect(username, error)) {
      router.push("/chat");
    } else {
      error.value = "Username is already taken. Please choose another one.";
    }

  } else {
    error.value = "Invalid username. Only alphabetic characters are allowed.";
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div
      class="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-semibold tracking-tight">Login</h1>
        <p class="text-sm text-gray-500">Enter your username to continue</p>
      </div>

      <form @submit="login" class="space-y-4">
        <div class="space-y-2">
          <label for="username" class="text-sm font-medium leading-none">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Connect
        </button>

        <p
          v-if="error"
          class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
