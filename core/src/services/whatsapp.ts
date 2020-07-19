import { Client, TextContent } from "@zenvia/sdk";
export const sendMessage = async (to: string, message: string) => {
  const client = new Client("aCBRVCdtmRgp51cWIpqKMojw7HOl9f325nzO");
  const whatsapp = client.getChannel("whatsapp");
  const content = new TextContent(message);

  await whatsapp.sendMessage("heathered-bumper", to, content);
};
