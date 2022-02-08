import { HttpResponse } from '../controllers/product.controller'

const ControllersHelpers = {
  serverError(): HttpResponse {
    return {
      statusCode: 500,
      body: 'Something went wrong. Try again later.'
    }
  },
  ok(body: any): HttpResponse {
    return {
      statusCode: 200,
      body
    }
  },
  created(body: any): HttpResponse {
    return {
      statusCode: 201,
      body
    }
  },
  badRequest(error: Error): HttpResponse {
    return {
      statusCode: 500,
      body: error
    }
  }
}

export default ControllersHelpers
