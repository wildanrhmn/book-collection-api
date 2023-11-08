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

// get author by id
authorRouter.get("/:id", async (req: Request, res: Response) => {
    try{
        const author = await AuthorService.getAuthor(req.params.id);
        if(!author) return res.status(404).send("Author not found");
        return res.status(200).json(author)
    }catch(err: any){
        return res.status(500).send(err.message);
    }
});

// create a new author
authorRouter.post("/", 
body("firstName").isString(),
body("lastName").isString(),
async (req: Request, res : Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const newAuthor = await AuthorService.createAuthor(req.body);
        return res.status(201).json(newAuthor);
    } catch(err: any){
        return res.status(500).send(err.message);
    }
})

// update an author
authorRouter.put("/:id",
body("firstName").isString(),
body("lastName").isString(),
async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const updatedAuthor = await AuthorService.updateAuthor(req.params.id, req.body);
        if(!updatedAuthor) return res.status(404).send("Author not found");
        return res.status(200).json(updatedAuthor);
    }catch(err: any){
        return res.status(500).send(err.message);
    }
})

// delete an author
authorRouter.delete("/:id", async (req: Request, res: Response) => {
    try{
        const deletedAuthor = await AuthorService.deleteAuthor(req.params.id);
        if(!deletedAuthor) return res.status(404).send("Author not found");
        return res.status(200).json({
            message: "Author deleted successfully"
        });
    }catch(err: any){
        return res.status(500).send(err.message);
    }
})
