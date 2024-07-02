import { Router } from "express";
const router = Router();
import * as carController from './car.controller.js';

router.post('/addCar', carController.addCar);
router.get('/getSpecificCar', carController.getSpecificCar);
router.get('/getAllCars', carController.getAllCars);
router.put('/updateCar', carController.updateCar);
router.patch('/deleteCar', carController.deleteCar);



export default router;