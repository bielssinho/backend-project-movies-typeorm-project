import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { IListMoviesPag } from '../interfaces'
import { returnListMovie } from '../schemas'



const listMoviesService = async (payload: any): Promise<IListMoviesPag> => {
    
    const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie)
    
    const page: number = Number(payload.page) > 0 ? Number(payload.page) : 1
    const perPage: number = Number(payload.perPage) > 0 && Number(payload.perPage) <= 5 ? Number(payload.perPage) : 5
    const order: string = !payload.order || !payload.sort ? 'ASC' :  payload.order.toUpperCase() === 'ASC' || payload.order.toUpperCase() === 'DESC' ? payload.order.toUpperCase() : 'ASC'
    const sort: string = !payload.sort ? 'id' : payload.sort.toLowerCase() === 'price' || payload.sort.toLowerCase() === 'duration' ? payload.sort.toLowerCase() : 'id' 

    const listMovies: Movie[] = await movieRepository.find({
        take: perPage,
        skip: perPage * (page - 1),
        order:{
            [sort]: order
        }
    })

    const listMoviesTest: Movie[] = await movieRepository.find({
        take: perPage,
        skip: perPage * (page),
        order:{
            [sort]: order
        }
    })

    const listMoviesWhitoutParams: Movie[] = await movieRepository.find()
    
    const moviesList = returnListMovie.parse(listMovies)

    const list = {
        prevPage: page === 1 ? null : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`,
        nextPage: listMoviesTest.length === 0 ? null : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`,
        count: listMoviesWhitoutParams.length,
        data: moviesList
    }

    return list
}

export default listMoviesService