import ControllersHelpers from '../helpers/controllers.helpers'
import { ProductServiceAbstract } from '../services/product.service'

export interface HttpRequest {
  body?: any
  params?: any
  query?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

interface ProductControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(): Promise<HttpResponse>
  update(httpRequest: HttpRequest): Promise<HttpResponse>
  delete(httpRequest: HttpRequest): Promise<HttpResponse>
}

export class ProductController implements ProductControllerAbstract {
  private readonly productService: ProductServiceAbstract

  constructor(productService: ProductServiceAbstract) {
    this.productService = productService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      //   TODO: verificar se a Category existe no banco de dados

      // Verificar campos obrigatórios
      const body = httpRequest.body

      const requiredFields = ['name', 'imageUrl', 'collection']

      for (const field of requiredFields) {
        if (!body[field]) {
          return {
            statusCode: 400,
            body: `Missing ${field}.`
          }
        }
      }

      const product = await this.productService.create(httpRequest.body)

      return ControllersHelpers.created(product)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se um ID foi fornecido por parâmetro
      const params = httpRequest.params

      if (!params.id) {
        return {
          statusCode: 400,
          body: 'Missing param id.'
        }
      }

      const product = await this.productService.getOne(params.id)

      return ControllersHelpers.ok(product)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async getAll(): Promise<HttpResponse> {
    try {
      const products = await this.productService.getAll()

      return ControllersHelpers.ok(products)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // verificar se os campos fornecidos para atualização são permitidos
      const body = httpRequest.body
      const params = httpRequest.params

      const allowedUpdates = ['name', 'imageUrl', 'collection']

      const someReceivedUpdateIsNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return {
          statusCode: 400,
          body: 'Some received field is not allowed to update.'
        }
      }

      // verificar se um ID foi fornecido por parâmetro
      if (!params.id) {
        return {
          statusCode: 400,
          body: 'Missing param id.'
        }
      }

      const product = await this.productService.update(params.id, body)

      return ControllersHelpers.ok(product)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.params

      // verificar se um ID foi fornecido por parâmetro
      if (!params.id) {
        return {
          statusCode: 400,
          body: 'Missing param id.'
        }
      }

      const product = await this.productService.delete(params.id)

      return ControllersHelpers.ok(product)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }
}
