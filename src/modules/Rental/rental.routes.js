import { Router } from "express";
const router = Router();
import * as rentalController from './rental.controller.js';

router.post('/createRental', rentalController.createRental);
router.put('/updateRental/:_id', rentalController.updateRental);
router.delete('/deleteRental/:_id', rentalController.deleteRental);
router.get('/getAllRentals', rentalController.getAllRentals);
router.get('/getSpecificRental/:_id', rentalController.getSpecificRental);
 

export default router;