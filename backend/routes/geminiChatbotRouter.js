import express from 'express';
import { generateContent } from '../controllers/geminiChatbotController.js';

const geminiChatbotRouter = express.Router();

geminiChatbotRouter.post("/", generateContent);

export default geminiChatbotRouter;
