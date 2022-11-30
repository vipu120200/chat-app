import express from 'express';
import {accessChat,fetchChats,createGroup,renameGroup,storeNotification,removeFromGroup,addToGroup} from '../Controllers/chat.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.post("/",auth, accessChat);
router.get("/",auth, fetchChats);
router.post("/group",auth, createGroup);
router.put("/rename",auth, renameGroup);
router.put("/groupadd",auth, addToGroup);
router.put("/groupremove",auth, removeFromGroup);

router.post("/notification",auth, storeNotification);



export default router