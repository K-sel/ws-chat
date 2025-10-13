import { WSServerPubSub } from 'wsmini';

const wsServer = new WSServerPubSub({
  port: 8080,
});

wsServer.start();