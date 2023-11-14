import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { authorRouter } from './modules/author/author.router'
import { bookRouter } from './modules/book/book.router'
import { readerRouter } from './modules/reader/reader.router'

dotenv.config()

if(!process.env.PORT){
    process.exit(1)
}

const PORT:number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/author', authorRouter)
app.use('/book', bookRouter)
app.use('/reader', readerRouter)
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})