import * as dotenv from 'dotenv'
import * as express from 'express'
import * as cors from 'cors'

import productRouter from './src/routes/product.routes'
import categoryRouter from './src/routes/category.routes'

import connectToDatabase from './src/database/mongoose.database'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectToDatabase()

app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`listening on port ${port}!`))
