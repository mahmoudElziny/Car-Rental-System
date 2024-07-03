import express from 'express';

import { connectionDB } from "./DB/connection.js";

import customerRouter from './src/modules/Customer/customer.routes.js';
import carRouter from './src/modules/Car/car.routes.js';
import rentalRouter from './src/modules/Rental/rental.routes.js';
import specialRouter from './src/modules/SpecialEndPoints/specialEndPoints.routes.js';

const app = express();
const port = 3000;

connectionDB();

app.use(express.json());

app.use('/customer', customerRouter);
app.use('/car', carRouter);
app.use('/rental', rentalRouter);
app.use('/special', specialRouter);


app.listen(port, () => console.log(`App listening on port ${port}`));