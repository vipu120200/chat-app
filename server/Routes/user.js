import express from 'express';
import {signin,signup,allUsers} from '../Controllers/user.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.get("/",auth, allUsers);

router.post("/signin", signin);
router.post("/signup", signup);


export default router