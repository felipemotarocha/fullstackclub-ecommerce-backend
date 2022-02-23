import { Router } from 'express'
import adaptRoute from '../adapters/express-route-adapter'
import makeProductController from '../factories/product.factory'

const router = Router()

router.get('/', adaptRoute(makeProductController(), 'getAll'))

router.post('/', adaptRoute(makeProductController(), 'create'))

router.patch('/', adaptRoute(makeProductController(), 'update'))

router.delete('/', adaptRoute(makeProductController(), 'delete'))

export default router
