import * as dotenv from 'dotenv'

import connectToDatabase from './src/database/mongoose.database'

dotenv.config()

connectToDatabase()

console.log('hello world!')
