<script setup>
import { ws } from "../store/chat.js";

const submit = async (e) => {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (message) {
    // Envoyer le message via WebSocket ici
    ws.pub("chat", message);
  }
  input.value = "";
};
</script>

<template>
  <form @submit="submit" class="mx-auto max-w-4xl">
    <div class="flex gap-2">
      <input
        type="text"
        name="chat-input"
        id="chat-input"
        placeholder="Type a message..."
        class="flex h-10 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Send
      </button>
    </div>
  </form>
</template>

<style scoped></style>
