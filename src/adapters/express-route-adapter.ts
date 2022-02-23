import { Request, Response } from 'express'

import BaseControllerAbstract, {
  ControllerMethods,
  HttpRequest,
  HttpResponse
} from '../controllers/base.controller'

const adaptRoute = (
  controller: BaseControllerAbstract,
  method: ControllerMethods
) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    }

    const httpResponse: HttpResponse = await controller[method](httpRequest)

    const isError = ![200, 201].includes(httpResponse.statusCode)

    if (isError) {
      return res.status(httpResponse.statusCode).send(httpResponse.body.message)
    }

    return res.status(httpResponse.statusCode).send(httpResponse.body)
  }
}

export default adaptRoute
