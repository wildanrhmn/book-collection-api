import * as dotenv from 'dotenv'
import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { RegisterRoutes } from '../build/routes';

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

RegisterRoutes(app)

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  });

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})