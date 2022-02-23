import * as mongoose from 'mongoose'

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fscecommercecluster.p7ims.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    (error) => {
      if (error) {
        return console.log(`Could not connect to MongoDB: ${error.message}`)
      }

      return console.log('Connected to MongoDB!')
    }
  )
}

export default connectToDatabase
