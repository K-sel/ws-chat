import { WSClient } from "wsmini";
import { ref } from "vue";
import { CHANNELS } from "../../shared/channelsConfig";

// Récupération des variables d'env et création du serveur websocket
const wsHost = import.meta.env.VITE_WS_HOST ?? "localhost";
const wsPort = import.meta.env.VITE_WS_PORT ?? "8080";
const wsProtocol = import.meta.env.VITE_WS_PROTOCOL ?? "wss";

export const ws = new WSClient(`${wsProtocol}://${wsHost}:${wsPort}`);

// Refs vue pour l'affichage
export const messages = ref([]);
export const users = ref([]);

// Initialisation de la connection websocket
export async function connect(username, error) {
  try {
    await ws.connect(username);

    await ws.sub(CHANNELS.CHAT.name, (message) => {
      messages.value.push(message);
      console.log(message);
    });

    await ws.sub(CHANNELS.USERS.name, (list) => {
      users.value = list;
    });

    ws.onCmd("/pm", (data) => {
      if (data.from == username) {
        data.from += " (You)";
      }
      messages.value.push(data);
    });

    return true;
  } catch (err) {
    error.value = `Connection failed. Please try again : ${err.message}`;
    console.error("Connection failed:", err);
    return false;
  }
}

export async function emCommand() {}
