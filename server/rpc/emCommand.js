import { CHANNELS } from "../../shared/channelsConfig.js";

export function setupEmCommand(wsServer) {
  wsServer.addRpc("/em", (data, clientMetadata, client, wsServer) => {
    const emote = {
      type: "em",
      user: clientMetadata,
      text: data,
      time: Date.now(),
    };

    wsServer.pub(CHANNELS.CHAT.name, emote);
  });
}
