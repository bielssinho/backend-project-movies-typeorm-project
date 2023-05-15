import { ArrayContains, Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { AppError } from '../errors'
import { IMovieResp, iMovieUpdate } from '../interfaces'
import { movieResSchema } from '../schemas'

const updateMovieService = async (upMovieData: iMovieUpdate, idMovie: number): Promise<IMovieResp> => {

    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    
    if(upMovieData.name){
        const movieWithNameExists = await movieRepository.findOneBy({
            name: upMovieData.name
        })
        
        if(movieWithNameExists){
            throw new AppError('Movie already exists.', 409)
        }
    }

    const oldMovieData = await movieRepository.findOneBy({
        id: idMovie
    })

    const newMovie = movieRepository.create({
        ...oldMovieData,
        ...upMovieData
    })

    await movieRepository.save(newMovie)

    const upMovie = movieResSchema.parse(newMovie)

    return upMovie
}

export default updateMovieService