import express from 'express';
import {signin,signup,allUsers} from '../Controllers/chat.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.post("/",auth, accessChat);
router.get("/",auth, fetchChats);
router.post("/group",auth, createGroup);
router.put("/rename",auth, renameGroup);
router.put("/groupremove",auth, removeFromGroup);
router.put("/groupadd",auth, addToGroup);




export default router