import { Router } from "express";
import { FinishGame, InitGame, ResetGame } from "../handlers/gameHandler";

const router = Router();

router.get('/', InitGame)

router.get('/reset', ResetGame)

router.get('/end', FinishGame)

export default router;