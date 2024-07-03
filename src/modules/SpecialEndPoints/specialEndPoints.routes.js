import { Router } from "express";
const router = Router();
import * as specialEndPoinsController from './specialEndPoints.controller.js';

router.get('/getAllCarsWhoseModelIsHondaOrToyota/:name', specialEndPoinsController.getAllCarsWhoseModelIsHondaOrToyota);
router.get('/getAvailableCarsOfSpecificModel/:name', specialEndPoinsController.getAvailableCarsOfSpecificModel);
router.get('/getCarsThatAreEitherRentedOrOfSpecificModel/:name', specialEndPoinsController.getCarsThatAreEitherRentedOrOfSpecificModel);
router.get('/getAvailableCarsOfSpecificModelsOrRentedCarsOfSpecificModel', specialEndPoinsController.getAvailableCarsOfSpecificModelsOrRentedCarsOfSpecificModel);


export default router;