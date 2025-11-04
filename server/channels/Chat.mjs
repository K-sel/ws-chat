export default class Chat {
  #chanName;
  #wsServer;

  constructor(chanName, wsServer) {
    this.#wsServer = wsServer;
    this.#chanName = chanName;

    this.createChannel();
  }

  createChannel() {
    this.#wsServer.addChannel(this.#chanName, {
      usersCanPub: true,
      usersCanSub: true,

      hookSubPost: (clientMetadata) => {
        sendLeftJoinedMessage(clientMetadata, "joined");
      },

      hookUnsubPost: (clientMetadata) => {
        sendLeftJoinedMessage(clientMetadata, "left");
      },

      hookPub: (message, clientMetadata) => {
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

  getChanName() {
    return this.#chanName;
  }

  sendLeftJoinedMessage(clientMetadata, action) {
    const post = {
      type: "system",
      text: `${clientMetadata.nickname} ${action} the chat`,
      time: Date.now(),
    };
    this.#wsServer.pub(this.#chanName, post);
  }
}
