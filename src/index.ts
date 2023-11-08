import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import { authorRouter } from './modules/author/author.router'

dotenv.config()

if(!process.env.PORT){
    process.exit(1)
}

const PORT:number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/author', authorRouter)
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})