import { ObjectId } from 'mongodb';
import { Rental } from '../../../DB/models/rental.model.js';

export const createRental = async (req, res) => {
    try {
        let { customerId , carId, rentalDate, returnDate } = req.body;

        const rental = await Rental.insertOne({
            customerId: new ObjectId(customerId),
            carId: new ObjectId(carId),
            rentalDate,
            returnDate
        });

        

        res.json({message: "Rental Added Successfully", data: rental , });

    } catch (error) {
        console.log("Error in Adding a Rental ",error);
        res.json({message: "Error in Adding a Rental"});
    }
}

export const updateRental = async (req, res) => {
    try {
        const { _id } = req.params;
        const {  customerId , carId, rentalDate, returnDate } = req.body;

        if(customerId && carId && rentalDate && returnDate ){
            const rental = await Rental.updateOne(
                { _id: new ObjectId(_id) },
                {$set: {customerId: new ObjectId(customerId),carId: new ObjectId(carId),rentalDate,returnDate}}
                );
                
            return res.json({message: "rental updated successfully", data: rental});
        }
        return res.json({message: "All fields must be initialized"});
    } catch (error) {
        console.log("Error in updating rental", error);
        res.json({message:"Error in updating rental"});
    }
}

export const deleteRental = async (req, res) => {
    try {
        const { _id } = req.params;
    
        const rental = await Rental.deleteOne(
            { _id: new ObjectId(_id) }
        );    
                
        res.json({message: "rental deleted successfully", data: rental});
        
    } catch (error) {
        console.log("Error in deleting the user", error);
        res.json({message:"Error in deleting the user"});
    }
}

export const getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.aggregate([
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customersData'
                }
            },
            {
                $unwind: "$customersData"
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: 'carId',
                    foreignField: '_id',
                    as: 'carData'
                }
            },
            {
                $unwind: "$carData"
            }
        ]).toArray();

        res.json({message: "List of Rentals", data: rentals});

    } catch (error) {
        console.log("Error in Listing Rentals", error);
        res.json({message: "Error in listing Rentals"});
    }
}

export const getSpecificRental = async (req, res) => {
    try {
        const { _id } = req.params;

        let rental = await Rental.aggregate([
            {
                $match: {
                    _id: new ObjectId(_id)
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customersData'
                }
            },
            {
                $unwind: "$customersData"
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: 'carId',
                    foreignField: '_id',
                    as: 'carData'
                }
            },
            {
                $unwind: "$carData"
            }
        ]).toArray();

        res.json({message: "Rental has found", data: rental});

    } catch (error) {
        console.log("Error in finding Rental", error);
        res.json({message: "Error in finding Rental"});
    }
}