import { Request, Response } from "express";
import { sendMessage } from "@services/whatsapp";

export class WhatsappController {
  static receive = (req: Request, res: Response) => {
    const { message } = req.body;

    const name = message.visitor.firstName;

    const userSentMessage = message.direction === "IN";

    if(userSentMessage) {
      const sentMessage = message.contents[1].text;
      
      console.log(sentMessage);
      sendMessage(message.from, `E aí, ${name}!`);
    }
    
    res.sendStatus(200);
  };
  static send = (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}
