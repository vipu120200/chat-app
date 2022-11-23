import express from 'express';
import {accessChat,fetchChats,createGroup,renameGroup,removeFromGroup,addToGroup} from '../Controllers/chat.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.post("/",auth, accessChat);
router.get("/",auth, fetchC hats);
router.post("/group",auth, createGroup);
router.put("/rename",auth, renameGroup);
router.put("/groupadd",auth, addToGroup);
router.put("/groupremove",auth, removeFromGroup);




export default router