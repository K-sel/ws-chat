import { WSServerPubSub } from 'wsmini';

const wsServer = new WSServerPubSub({
  // Set your server options, e.g., port, allowed origins, max number of clients, ...
  // See the server documentation for the complete list of options
  port: 8080,
});

wsServer.start();