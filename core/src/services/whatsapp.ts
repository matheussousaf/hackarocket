import { Client, TextContent } from "@zenvia/sdk";
export const sendMessage = async (to: string, message: string) => {
  const client = new Client("fake");
  const whatsapp = client.getChannel("whatsapp");
  const content = new TextContent(message);

  await whatsapp.sendMessage("heathered-bumper", to, content);
};
