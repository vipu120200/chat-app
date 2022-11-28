import express from 'express';
import {sendMessage,fetchMessages} from '../Controllers/message.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.post("/",auth, sendMessage);
router.get("/:chatId",auth, fetchMessages);





export default router