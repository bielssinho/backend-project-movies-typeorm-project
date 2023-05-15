import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { iMovieCreate } from '../interfaces'
import { movieResSchema } from '../schemas'


const createMovieService = async (movieData: iMovieCreate) => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)

    const movie: Movie = movieRepository.create(movieData)

    await movieRepository.save(movie)

    const newMovie = movieResSchema.parse(movie)

    return newMovie
}

export default createMovieService