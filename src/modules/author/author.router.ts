import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

// get all authors
authorRouter.get("/", async (req: Request, res: Response) => {
    try{
        const authors = await AuthorService.listAuthors();
        if(!authors) return res.status(404).send("Authors not found");
        return res.status(200).json(authors)
    }catch(err: any){
        return res.status(500).send(err.message);
    }
});