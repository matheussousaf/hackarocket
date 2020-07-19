import { Router } from "express";
import { WhatsappController } from "@controllers/WhatsappController";

const router = Router();

router.post("/", WhatsappController.receive);
router.post("/send", WhatsappController.send);

export default router;
