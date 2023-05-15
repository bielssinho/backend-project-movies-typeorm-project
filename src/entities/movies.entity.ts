import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity('movies')
class Movie {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar',{ length: 50, unique: true })
    name: string

    @Column('text', { nullable: true })
    description?: string | null

    @Column('int')
    duration: number

    @Column('int')
    price: number

}

export {
    Movie
}