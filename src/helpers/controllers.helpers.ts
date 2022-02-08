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
  }
}

export default ControllersHelpers