import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

router.post('/signup', login);

router.post('/login', signup);

router.post('/logout', logout);


export default router;