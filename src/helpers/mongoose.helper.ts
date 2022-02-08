const MongooseHelper = {
  map<T>(data: any): T {
    const { _id, ...rest } = data

    return {
      id: _id,
      ...rest
    }
  }
}

export default MongooseHelper
