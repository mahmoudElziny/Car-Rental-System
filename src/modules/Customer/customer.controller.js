import { Customer } from '../../../DB/models/customer.model.js';
import { ObjectId } from 'mongodb';
import bcrypt, { hashSync } from 'bcrypt'


export const registration = async (req, res) => {
    try {
        let {userName, email, password, phonenumber} = req.body;

        if(userName && email && password && phonenumber){
    
            password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8)); 
    
            let isEmailExits = await Customer.findOne({ email });
        
            if(isEmailExits){
                return res.json({message: 'User already exists'});
            }
            const newCustomer = await Customer.insertOne({
                    userName,
                    email,
                    password,
                    phonenumber
            });
            
        
            res.json({message: 'User Added Successfully', data: newCustomer});
        }else {
            res.json({message: "Initialize All Fields"});
        }
    
    } catch (error) {
        console.log("Error in creating user ",error);
        res.json({message: "Error in creating user"});
    }
    
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email && password){
            const user = await Customer.findOne({
                email
            }
            );
        
            const checkPassword = bcrypt.compareSync(password,user.password);
        
            if(checkPassword){
                await Customer.updateOne(
                    {email},
                    {  $set: {loggedIn: 'true'} }
                );
                return res.json({message:'Logged in Successfully', greeting:`Hello ${user.userName}!!`}); 
            }
        
            res.json({message:'wrong email or password'});
        }else {
            res.json({message: "Initialize All Fields"});
        } 
    } catch (error) {
        console.log("Error in loggingIn ",error);
        res.json({message: "Error in loggingIn "});
    }
    
}

export const signOut = async (req, res) => {
    try {
        const { _id } = req.params;

        const user = await Customer.updateOne(
            { _id: new ObjectId(_id)},
            {  $set: {loggedIn: 'false'} }
            );
            return res.json({message:'Logged out Successfully',data: user }); 
            
    } catch (error) {
        console.log("Error in loggingOut ",error);
        res.json({message: "Error in loggingOut "});
    }
}

export const getSpecificUser = async (req, res) => {
    try {
        const { _id, userName, email } = req.body;
    
        const customer = await Customer.findOne(
            {$or: [{ _id: new ObjectId(_id) },{userName},{email}]}
        );

        res.json({message:" User is found", data: customer});

    } catch (error) {
        console.log("Error in finding the User", error);
        res.json({message: "Error in finding the User"});
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const customers = await Customer.find().toArray();
        res.json({message: "List of Users",data: customers});
    } catch (error) {
        console.log("Error in Listing Users", error);
        res.json({message: "Error in listing Users"});
    }
}

export const updateUser = async (req, res) => {
try {
    let { _id } = req.params;
    let {userName, email, password, phonenumber} = req.body;
    _id = new ObjectId(_id);
    const isUserLoggedIn = await Customer.findOne({
        _id
    });

    if(isUserLoggedIn.loggedIn == "true"){
        if(userName && email && password && phonenumber){
            password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8));  
            const user = await Customer.updateOne(
                { _id },
                {$set: {userName,email,password,phonenumber}}
                
                );
                
            return res.json({message: "user updated successfully", data: user});
        }
        return res.json({message: "All fields must be initialized"});
    }

    return res.json({message: "Must Logged In First"});

} catch (error) {
    console.log("Error in updating the user", error);
    res.json({message:"Error in updating the user"});
}
}

export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params;
    
        const isUserLoggedIn = await Customer.findOne({
            _id: new ObjectId(_id)
        });

        if(!isUserLoggedIn){
            return res.json({message:"user not found"});
        }

        if(isUserLoggedIn.loggedIn == "true"){
            const user = await Customer.deleteOne(
                { _id: new ObjectId(_id) }
            );
                
                
            return res.json({message: "user deleted successfully", data: user});
        }
    
        res.json({message: "Must Logged In First"});
    
    } catch (error) {
        console.log("Error in deleting the user", error);
        res.json({message:"Error in deleting the user"});
    }
}