import { Router } from "express";
const router = Router();
import * as carController from './car.controller.js';

router.post('/addCar', carController.addCar);
router.get('/getSpecificCar/:_id', carController.getSpecificCar);
router.get('/getAllCars', carController.getAllCars);
router.put('/updateCar/:_id', carController.updateCar);
router.delete('/deleteCar/:_id', carController.deleteCar);



export default router;