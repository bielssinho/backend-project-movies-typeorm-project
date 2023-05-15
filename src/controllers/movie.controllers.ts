import { Request, Response } from 'express'
import { IListMovie, IListMoviesPag, iMovieCreate, iMovieRepo, iMovieUpdate } from '../interfaces'
import createMovieService from '../services/createMovie.service'
import deleteMovieService from '../services/deleteMovie.service'
import listMoviesService from '../services/listMovies.service'
import updateMovieService from '../services/updateMovie.service'

const crateMovieController = async (req: Request, res: Response) => {

    const movieData: iMovieCreate = req.body

    const newMovie = await createMovieService(movieData)

    return res.status(201).json(newMovie)

}

const listMovieController = async (req: Request, res: Response) => {

    const listMovies: IListMoviesPag  = await listMoviesService(req.query)

    return res.status(200).json(listMovies)
}

const updateMovieController = async (req: Request, res: Response) => {

    const upMovieData: iMovieUpdate = req.body
    const idMovie: number = +req.params.id

    const updateMovie = await updateMovieService(upMovieData, idMovie)

    return res.status(200).json(updateMovie)
}

const deleteMovieController = async (req: Request, res: Response) => {

    const idMovie: number = +req.params.id

    await deleteMovieService(idMovie)

    return res.status(204).send()
}

export {
    crateMovieController,
    listMovieController,
    updateMovieController,
    deleteMovieController
}