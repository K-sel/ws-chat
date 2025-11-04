import { WSClient } from "wsmini";
import { ref } from "vue";

// récupérer les instances des channels pour obtenir leur chanName via leur méthode getChanName.
import { ChatChannel } from "../../server/server.mjs";
import { UsersListChannel } from "../../server/server.mjs";

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

    await ws.sub(ChatChannel.getChanName, (message) => {
      messages.value.push(message);
    });

    await ws.sub(UsersListChannel.getChanName, (list) => {
      users.value = list;  
    });

    return true;
  } catch (err) {
    error.value = `Connection failed. Please try again : ${err.message}`;
    console.error("Connection failed:", err);
    return false;
  }
}
