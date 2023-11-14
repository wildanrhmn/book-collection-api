import express from 'express';
import * as ReaderService from './reader.service';
import { body, validationResult } from 'express-validator';
import type { Request, Response } from 'express';

export const readerRouter = express.Router();

// get all readers
readerRouter.get("/", async (req: Request, res: Response) => {
    try{
        const readers = await ReaderService.listReaders();
        return res.status(200).json(readers);
    }catch(err: any){
        return res.status(500).send(err.message);
    }
})

//bookmark a book
readerRouter.post("/bookmark",
body("readerId").isString(),
body("bookId").isString(),
async (req: Request, res: Response) => {
    const { readerId, bookId } = req.body
    try{
        await ReaderService.readerBookmarkBook(readerId, bookId);
        return res.status(200).json({
            message: "Book bookmarked successfully"
        });
    }catch(err: any){
        return res.status(500).send(err.message);
    }
})