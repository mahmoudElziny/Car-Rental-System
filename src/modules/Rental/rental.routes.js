import { Router } from "express";
const router = Router();
import * as rentalController from './rental.controller.js';

router.post('/createRental', rentalController.createRental);
router.put('/updateRental', rentalController.updateRental);
router.patch('/deleteRental', rentalController.deleteRental);
router.get('/getAllRentals', rentalController.getAllRentals);
router.get('/getSpecificRental', rentalController.getSpecificRental);
 

export default router;