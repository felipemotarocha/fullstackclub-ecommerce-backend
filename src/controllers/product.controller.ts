import { ProductServiceAbstract } from '../services/product.service'

interface HttpRequest {
  body?: any
  params?: any
  query?: any
}

interface HttpResponse {
  statusCode: number
  body: any
}

interface ProductControllerAbstract {
  create(httpRequest: HttpRequest): Promise<HttpResponse>
  getOne(httpRequest: HttpRequest): Promise<HttpResponse>
  getAll(httpRequest: HttpRequest): Promise<HttpResponse>
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

      return {
        statusCode: 201,
        body: product
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong. Try again later.'
      }
    }
  }

  getOne(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  update(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }

  delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.')
  }
}
