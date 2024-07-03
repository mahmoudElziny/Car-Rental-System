import { Car } from '../../../DB/models/car.model.js';

export const getAllCarsWhoseModelIsHondaOrToyota = async (req, res) => {
    try {
        const { model } = req.params;
        if( model=='toyota' || model == 'honda' ){
        const cars = await Car.find({
            name: model
        }).toArray();

        if( cars[0 ]== null){
            res.json({message: "Can not find matched cars"});
        }else{
            return res.json({message: "cars", data: cars});
        }
    }else{
        res.json({message: "car model must be toyota or honda only"});
    }

    } catch (error) {
        console.log(`Error in Listing Cars whose model is honda or toyota`, error);
        res.json({message: `Error in Listing Cars whose model is honda or toyota`});
    }
}

export const getAvailableCarsOfSpecificModel = async (req, res) => {
    try {
        const { model } = req.params;
        
        const cars = await Car.find({
            model: model,
            rentalStatus: "available"
        }).toArray();
        
        if( cars[0] == null){
            res.json({message: "Can not find matched cars"});
        }else{
            return res.json({message: "cars", data: cars});
        }

    } catch (error) {
        console.log(`Error in Listing available Cars`, error);
        res.json({message: `Error in Listing available Cars`});
    }
}

export const getCarsThatAreEitherRentedOrOfSpecificModel = async (req, res) => {
    try {
        const { model } = req.params;
        const cars = await Car.find({
            $and: [{model: model},
                  {rentalStatus: "rented"}],
        }).toArray();

        if( cars[0]== null){
            res.json({message: "Can not find matched cars"});
        }else{
            return res.json({message: "cars", data: cars});
        }
    
    } catch (error) {
        console.log(`Error in Listing Cars rented for this model`, error);
        res.json({message: `Error in Listing Cars rented for this model`});
    }
}

export const getAvailableCarsOfSpecificModelsOrRentedCarsOfSpecificModel = async (req, res) => {
    try {
        const { model, rentalStatus } = req.body;

        const cars = await Car.find({
            $and: [{model: model},
                  {rentalStatus: rentalStatus}],
        }).toArray();

        if( cars[0]== null){
            res.json({message: "Can not find matched cars"});
        }else{
            return res.json({message: "cars", data: cars});
        }
    
    } catch (error) {
        console.log(`Error in Listing Cars`, error);
        res.json({message: `Error in Listing Cars`});
    }
}