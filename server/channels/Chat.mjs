import { wsServer } from "../server.mjs";

export default class Chat {
  #chanName;
  
  constructor(chanName) {
    this.#chanName = chanName;
    this.createChannel();
  }

  createChannel() {
    wsServer.addChannel(this.#chanName, {
      usersCanPub: true,
      usersCanSub: true,

      hookSubPost: (clientMetadata, wsServer) => {
        const subPost = {
          type: "system",
          text: `${clientMetadata.nickname} joined the chat`,
          time: Date.now(),
        };
        wsServer.pub(this.#chanName, subPost);
      },

      hookUnsubPost: (clientMetadata, wsServer) => {
        const unSubPost = {
          type: "system",
          text: `${clientMetadata.nickname} left the chat`,
          time: Date.now(),
        };
        wsServer.pub(this.#chanName, unSubPost);
      },

      hookPub: (message, clientMetadata, wsServer) => {
        console.log(clientMetadata);
        if (message.length > 100) throw new WSServerError("Message too long");
        return {
          type: "user",
          user: clientMetadata,
          text: message,
          time: Date.now(),
        };
      },
    });
  }
}
