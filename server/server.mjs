import { WSServerPubSub } from "wsmini";
import { getRandomColor } from "./utils/colors.js";

const port = process.env.VITE_WS_PORT
  ? parseInt(process.env.VITE_WS_PORT)
  : 8080;
const origins = process.env.VITE_WS_HOST ?? "localhost";

const wsServer = new WSServerPubSub({
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

wsServer.addChannel("chat", {
  usersCanPub: true,
  usersCanSub: true,

  hookSub: (clientMetadata, wsServer) => true,

  hookPub: (msg, clientMetadata, wsServer) => {
    console.log(clientMetadata);
    // If you want to forbid publishing, on some condition, throw an WSServerError
    if (msg.length > 100) throw new WSServerError("Message too long");
    return {
      time: Date.now(),
      user: clientMetadata.nickname,
      color: clientMetadata.color,
      msg,
    };
  },
});

wsServer.addChannel("user-list", {
  usersCanPub: false,
  usersCanSub: true,

  hookSub: (clientMetadata, wsServer) => true,

  hookSubPost: (clientMetadata, wsServer) => {
    // Called after successful subscription
    const clients = wsServer.getChannelClients("user-list");
    const usersConnected = [];
    for (const client of clients) {
      const metadata = wsServer.clients.get(client);
      usersConnected.push({name : metadata.nickname, color : metadata.color});
    }
    wsServer.pub("user-list", usersConnected);
  },
});

wsServer.start();
