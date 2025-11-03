<script setup>
import Chatbar from "../components/ChatBar.vue";
import { router } from "../routes/router";
import { messages, users, ws } from "../store/chat";

const logout = () => {
  ws.close();
  router.push("/login");
};
</script>

<template>
  <div class="flex flex-row h-screen">
    <div class="flex h-full w-full flex-col border-r border-gray-200">
      <!-- Header -->
      <div
        class="border-b h-16 border-gray-200 bg-white px-6 py-4 justify-between flex items-center"
      >
        <h1 class="text-2xl font-semibold tracking-tight">Chat</h1>
        <button
          class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          @click="logout"
        >
          Logout
        </button>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto p-6">
        <div v-for="message in messages">
          <p>
            <span :style="{ color: message.color }">{{ message.user }}</span>
            : {{ message.msg }}
          </p>
        </div>
      </div>

      <!-- Input Form -->
      <div class="border-t border-gray-200 bg-white p-4">
        <Chatbar />
      </div>
    </div>

    <div class="flex w-[20%] flex-col h-full bg-white">
      <!-- Sidebar Header -->
      <div class="border-b h-16 border-gray-200 bg-white px-6 py-4">
        <h2 class="text-xl font-semibold tracking-tight">Online Users</h2>
      </div>

      <!-- Sidebar Content -->
      <div class="flex-1 flex-row overflow-y-auto p-4">
        <div v-for="user in users">
          <p>
            <span :style="{ color: user.color }">{{ user.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
