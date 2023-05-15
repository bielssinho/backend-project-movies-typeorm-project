import { Request, Response, NextFunction } from 'express'
import { ZodTypeAny } from 'zod'

const ensureDataIsValidMiddleware = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {

    const validateData = schema.parse(req.body)

    req.body = validateData

    return next()

}

export default ensureDataIsValidMiddleware