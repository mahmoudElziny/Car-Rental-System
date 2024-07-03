import { db } from '../connection.js'

export const Rental = await db.createCollection('rentals');