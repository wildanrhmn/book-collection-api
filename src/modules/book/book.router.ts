import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as BookService from "./book.service";

export const bookRouter = express.Router();

// get all books
bookRouter.get("/", async (req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks();
        if (!books) return res.status(404).send("Books not found");
        return res.status(200).json(books)
    } catch (err: any) {
        return res.status(500).send(err.message);
    }
})

// get book by id
bookRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const book = await BookService.getBook(req.params.id);
        if (!book) return res.status(404).send("Book not found");
        return res.status(200).json(book)
    } catch (err: any) {
        return res.status(500).send(err.message);
    }
})

// create new book
bookRouter.post("/",
    body("title").isString(),
    body("authorId").isString(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const createBook = await BookService.createBook(req.body);
            return res.status(201).json(createBook);
        }catch (err: any) {
            return res.status(500).send(err.message);
        }
    }
)

// update book
bookRouter.put("/:id",
    body("title").isString(),
    body("authorId").isString(),
    body("datePublished").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id: string = req.params.id;
        try{
            const updateAuthor = await BookService.updateBook(id, req.body);
            return res.status(200).json(updateAuthor);
        }catch (err: any) {
            return res.status(500).send(err.message);
        }
    }
)

//delete book
bookRouter.delete("/:id", async (req: Request, res: Response) => {
    try{
        await BookService.deleteBook(req.params.id);
        return res.status(200).json({
            message: "Book deleted successfully"
        });
    }catch(err: any){
        return res.status(500).send(err.message);
    }
})