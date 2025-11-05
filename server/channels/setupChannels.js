import { CHANNELS } from "../../shared/channelsConfig.js";

// --- Chat Channel ---

const postSystemMessage = (wsServer, text) => {
  const post = {
    type: "system",
    text,
    time: Date.now(),
  };
  wsServer.pub(CHANNELS.CHAT.name, post);
};

export function setupChatChannel(wsServer) {
  wsServer.addChannel(CHANNELS.CHAT.name, {
    usersCanPub: true,
    usersCanSub: true,

    hookSubPost: (clientMetadata) => {
      const text = `${clientMetadata.nickname} joined the chat`;
      postSystemMessage(wsServer, text);
    },

    hookUnsubPost: (clientMetadata) => {
      const text = `${clientMetadata.nickname} left the chat`;
      postSystemMessage(wsServer, text);
    },

    hookPub: (message, clientMetadata) => {
      if (message.length > 100) throw new WSServerError("Message too long");
      
      return {
        type: "user",
        from: clientMetadata.nickname,
        color: clientMetadata.color,
        text: message,
        time: Date.now(),
      };
    },
  });
}

// --- Users Channel ---

const updateUsers = (wsServer) => {
  const clients = wsServer.getChannelClients(CHANNELS.USERS.name);
  const usersConnected = [];

  for (const client of clients) {
    const metadata = wsServer.clients.get(client);
    usersConnected.push({ name: metadata.nickname, color: metadata.color });
  }
  wsServer.pub(CHANNELS.USERS.name, usersConnected);
};

export function setupUsersChannel(wsServer) {
  wsServer.addChannel(CHANNELS.USERS.name, {
    usersCanPub: false,
    usersCanSub: true,

    hookSubPost: () => {
      updateUsers(wsServer);
    },

    hookUnsubPost: () => {
      updateUsers(wsServer);
    },
  });
}
