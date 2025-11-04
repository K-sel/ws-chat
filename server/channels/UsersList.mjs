import { wsServer } from "../server.mjs";

export default class UsersList {

  #chanName;

  constructor(chanName) {
    this.#chanName = chanName
    this.createChannel();
  }

  createChannel() {
    wsServer.addChannel(this.#chanName, {
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
    const clients = wsServer.getChannelClients(this.#chanName);
    const usersConnected = [];

    for (const client of clients) {
      const metadata = wsServer.clients.get(client);
      usersConnected.push({ name: metadata.nickname, color: metadata.color });
    }
    
    wsServer.pub(this.#chanName, usersConnected);
  };
}
