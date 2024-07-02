import { Router } from "express";
const router = Router();
import * as customerController from './customer.controller.js';

router.post('/registration', customerController.registration);
router.patch('/signIn', customerController.signIn);
router.patch('/signOut/:_id', customerController.signOut);
router.get('/getSpecificUser',customerController.getSpecificUser);
router.get('/getAllUsers',customerController.getAllUsers);
router.put('/updateUser/:_id',customerController.updateUser);
router.delete('/deleteUser/:_id',customerController.deleteUser);


export default router;