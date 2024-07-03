import { Car } from '../../../DB/models/car.model.js';
import { ObjectId } from 'mongodb';


export const addCar = async (req, res) => {
    try {
        const { name, model } = req.body;

        if( name && model ){
            const newCar = await Car.insertOne({
                name,
                model,
                rentalStatus: "available"
        });
        
    
        res.json({message: 'User Added Successfully', data: newCar});
        }else{
            res.json({message: "Initialize All Fields"});
        }
    } catch (error) {
        console.log("Error in Adding a car ",error);
        res.json({message: "Error in Adding a car"});
    }
}

export const getSpecificCar = async (req, res) => {
    try {
        const { _id } = req.params;
    
        const car = await Car.findOne(
            {_id: new ObjectId(_id)}
        );

        res.json({message:" Car has found", data: car});

    } catch (error) {
        console.log("Error in finding the Car", error);
        res.json({message: "Error in finding the Car"});
    }
}

export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().toArray();
        res.json({message: "List of Cars",data: cars});
    } catch (error) {
        console.log("Error in Listing Cars", error);
        res.json({message: "Error in listing Cars"});
    }
}

export const updateCar = async (req, res) => {
    try {
        let { _id } = req.params;
        const { name, model, rentalStatus } = req.body;
    
        if(name && model && rentalStatus ){
            const car = await Car.updateOne(
                { _id: new ObjectId(_id) },
                {$set: {name,model,rentalStatus}}
                );
                
            return res.json({message: "car updated successfully", data: car});
        }
        return res.json({message: "All fields must be initialized"});
            
    } catch (error) {
        console.log("Error in updating the car", error);
        res.json({message:"Error in updating the car"});
    }
}

export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.params;

        const car = await Car.deleteOne(
            { _id: new ObjectId(_id) }
        );    
                
        res.json({message: "car deleted successfully", data: car});
    
    } catch (error) {
        console.log("Error in deleting the user", error);
        res.json({message:"Error in deleting the user"});
    }
}

