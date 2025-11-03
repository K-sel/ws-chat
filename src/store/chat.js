import { WSClient } from "wsmini";

import { ref } from "vue";

export const messages = ref([]);
export const users = ref([]);


const wsHost = import.meta.env.VITE_WS_HOST ?? "localhost";
const wsPort = import.meta.env.VITE_WS_PORT ?? "8080";
const wsProtocol = import.meta.env.VITE_WS_PROTOCOL ?? "wss";

export const ws = new WSClient(`${wsProtocol}://${wsHost}:${wsPort}`);

export async function connect(username, error) {
  try {
    await ws.connect(username);

    await ws.sub("chat", (message) => {
      messages.value.push(message);
      console.log(
        `${message.user} (${new Date(message.time).toLocaleTimeString()}): ${
          message.msg
        }`
      );
    });

    await ws.sub("user-list", (list) => {
      users.value = list;  
      console.log("connected users : ", list)
    });

    return true;
  } catch (err) {
    error.value = `Connection failed. Please try again : ${err.message}`;
    console.error("Connection failed:", err);
    return false;
  }
}
