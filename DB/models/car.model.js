import { db } from '../connection.js'

export const Car = await db.createCollection('cars');