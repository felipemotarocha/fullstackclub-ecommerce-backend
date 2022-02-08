export interface CreateProductDto {
  name: string
  imageUrl: string
  collection: string
}

export interface UpdateProductDto {
  name?: string
  imageUrl?: string
  collection?: string
}
