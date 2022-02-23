import {
  MissingFieldError,
  MissingParamError,
  NotAllowedUpdateError
} from '../errors/controllers.errors'
import ControllersHelpers from '../helpers/controllers.helpers'
import { ProductServiceAbstract } from '../services/product.service'
import BaseControllerAbstract, {
  HttpRequest,
  HttpResponse
} from './base.controller'

export class ProductController implements BaseControllerAbstract {
  private readonly productService: ProductServiceAbstract

  constructor(productService: ProductServiceAbstract) {
    this.productService = productService
  }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      //   TODO: verificar se a Category existe no banco de dados

      // Verificar campos obrigatórios
      const body = httpRequest.body

      const requiredFields = ['name', 'imageUrl', 'category']

      for (const field of requiredFields) {
        if (!body[field]) {
          return ControllersHelpers.badRequest(new MissingFieldError(field))
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
        return ControllersHelpers.badRequest(new MissingParamError('id'))
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

      const allowedUpdates = ['name', 'imageUrl', 'category']

      const someReceivedUpdateIsNotAllowed = Object.keys(body).some(
        (update) => !allowedUpdates.includes(update)
      )

      if (someReceivedUpdateIsNotAllowed) {
        return ControllersHelpers.badRequest(new NotAllowedUpdateError())
      }

      // verificar se um ID foi fornecido por parâmetro
      if (!params.id) {
        return ControllersHelpers.badRequest(new MissingParamError('id'))
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
        return ControllersHelpers.badRequest(new MissingParamError('id'))
      }

      const product = await this.productService.delete(params.id)

      return ControllersHelpers.ok(product)
    } catch (error) {
      return ControllersHelpers.serverError()
    }
  }
}
