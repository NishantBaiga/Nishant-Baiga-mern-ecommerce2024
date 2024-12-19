import express from 'express';
import { deleteUser, getAllUsers } from '../../controllers/admin/users.controller.js';
const router = express.Router();
router.get('/fetchAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser);
export default router;