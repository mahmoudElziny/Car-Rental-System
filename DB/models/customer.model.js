import { db } from '../connection.js'

export const Customer = await db.createCollection('customers');
