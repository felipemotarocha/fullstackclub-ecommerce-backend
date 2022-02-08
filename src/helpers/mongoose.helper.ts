const MongooseHelper = {
  map(data: any) {
    const { _id, ...rest } = data

    return {
      id: _id,
      ...rest
    }
  }
}

export default MongooseHelper
