export default class UsersList {
  #chanName;
  #wsServer;

  constructor(chanName, wsServer) {
    this.#wsServer = wsServer;
    this.#chanName = chanName;

    this.createChannel();
  }

  createChannel() {
    this.#wsServer.addChannel(this.#chanName, {
      usersCanPub: false,
      usersCanSub: true,

      hookSubPost: () => {
        this.update();
      },

      hookUnsubPost: () => {
        this.update();
      },
    });
  }

  update = () => {
    const clients = this.#wsServer.getChannelClients(this.#chanName);
    const usersConnected = [];

    for (const client of clients) {
      const metadata = this.#wsServer.clients.get(client);
      usersConnected.push({ name: metadata.nickname, color: metadata.color });
    }

    this.#wsServer.pub(this.#chanName, usersConnected);
  }

  getChanName() {
    return this.#chanName;
  }
}
