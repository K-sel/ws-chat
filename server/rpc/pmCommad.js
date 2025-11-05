import { CHANNELS } from "../../shared/channelsConfig.js";

export function setupPmCommand(wsServer) {
  wsServer.addRpc("/pm", (data, clientMetadata, client, wsServer) => {
    const users = wsServer.getChannelClientsData(CHANNELS.USERS.name);

    const recipientMetadata = users.find((el) => el.nickname.trim().toLowerCase() === data.to.trim().toLowerCase());

    if (!recipientMetadata) {
      throw new WSServerError("Cannot find recipient");
    }

    const recipientSocket = wsServer.getClientSocket(recipientMetadata.id);

    const message = {
      type: "pm",
      from: clientMetadata.nickname,
      color: clientMetadata.color,
      to: recipientMetadata.nickname,
      text: data.text,
      time: Date.now(),
    };

    wsServer.sendCmd(recipientSocket, "/pm", message);
    wsServer.sendCmd(client, "/pm", message);
  });
}
