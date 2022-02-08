export class MissingFieldError extends Error {
  constructor(field: string) {
    super(`Missing ${field}`)
  }
}

export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing param ${param}`)
  }
}

export class NotAllowedUpdateError extends Error {
  constructor() {
    super('Some received field is not allowed to update.')
  }
}
