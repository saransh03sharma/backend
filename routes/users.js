import express  from "express";
import { signup } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
import{getAllUsers} from '../controllers/users.js'
import auth from '../middlewares/auth.js'
import { updateProfile } from "../controllers/users.js";

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router