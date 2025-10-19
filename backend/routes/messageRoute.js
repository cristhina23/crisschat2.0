import express from "express";
import { getMessages, getUsersFromSidebar, sendMessage } from "../controllers/messageController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/users', protectedRoute, getUsersFromSidebar);

router.get('/:id', protectedRoute, getMessages)

router.post('/send/:id', protectedRoute, sendMessage);

export default router;