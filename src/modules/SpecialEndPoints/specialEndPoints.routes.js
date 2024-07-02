import { Router } from "express";
const router = Router();
import * as specialEndPoinsController from './specialEndPoints.controller.js';

router.get('/getAllCarsWhoseModelIsHondaAndToyota', specialEndPoinsController.getAllCarsWhoseModelIsHondaAndToyota);
router.get('/getAvailableCarsOfSpecificModel', specialEndPoinsController.getAvailableCarsOfSpecificModel);
router.get('/getCarsThatAreEitherRentedOrOfSpecificModel', specialEndPoinsController.getCarsThatAreEitherRentedOrOfSpecificModel);
router.get('/getAvailableCarsOfSpecificModelsOrRentedCarsOfSpecificModel', specialEndPoinsController.getAvailableCarsOfSpecificModelsOrRentedCarsOfSpecificModel);


export default router;