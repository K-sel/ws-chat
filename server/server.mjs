import { WSServerPubSub } from "wsmini";
import { getRandomColor } from "./utils/colors.js";

import UsersList from "./channels/UsersList.mjs";
import Chat from "./channels/chat.mjs";

const port = process.env.VITE_WS_PORT ? parseInt(process.env.VITE_WS_PORT) : 8080;
const origins = process.env.VITE_WS_HOST ?? "localhost";

export const wsServer = new WSServerPubSub({
  port: port,
  origins: origins,
  maxNbOfClients: 500,
  maxInputSize: 50000,
  pingTimeout: 30000,
  logLevel: "info",

  authCallback: (username, request, wsServer) => {
    const regex = /^[A-Za-z]+$/;

    if (!regex.test(username)) return false;
    return { nickname: username, role: "admin", color: getRandomColor() };
  },
});


export const ChatChannel = new Chat("chat", wsServer);
export const UsersListChannel = new UsersList("user-list", wsServer);

wsServer.start();
