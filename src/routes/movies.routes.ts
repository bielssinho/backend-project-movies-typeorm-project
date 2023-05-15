import { Router } from 'express'
import { crateMovieController, deleteMovieController, listMovieController, updateMovieController } from '../controllers/movie.controllers'
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware'
import ensureMovieExistsMiddleware from '../middlewares/ensureMovieExists.middleware'
import ensureMovieExistsByIdMiddleware from '../middlewares/ensureMovieExistsById.middleware'
import { movieCreateSchema, movieUpdateSchema } from '../schemas'

const movieRouter: Router = Router()

movieRouter.post('', ensureDataIsValidMiddleware(movieCreateSchema), ensureMovieExistsMiddleware, crateMovieController)
movieRouter.get('', listMovieController)
movieRouter.patch('/:id', ensureDataIsValidMiddleware(movieUpdateSchema), ensureMovieExistsByIdMiddleware, updateMovieController)
movieRouter.delete('/:id', ensureMovieExistsByIdMiddleware, deleteMovieController)

export default movieRouter