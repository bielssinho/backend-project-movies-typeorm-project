import app from './app'
import { AppDataSource } from './data-source'

AppDataSource.initialize().then(() => {
    console.log('Database conncted!')
    app.listen(3000, () => {
        console.log('server is running')
    })
}).catch(error => {
    console.log(error)
})