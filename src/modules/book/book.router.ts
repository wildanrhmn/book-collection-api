import { Controller, Get, Path, Route, Body, Post, Put, Delete } from 'tsoa';

import { BookService } from "./book.service";
import { BookWrite } from "./book";

@Route("book")
export class BookController extends Controller {
    @Get("/")
     async getBooks(): Promise<any> {
        try {
            const books = await new BookService().listBooks();
            return books;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Get("{id}")
    async getBook(@Path() id: string): Promise<any> {
        try {
            const book = await new BookService().getBook(id);
            return book;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Post("/")
    async createBook(@Body() book: BookWrite){
        try {
            const createBook = await new BookService().createBook(book);
            return createBook;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Put("{id}")
    async updateBook(@Path() id: string, @Body() book: BookWrite){
        try{
            const updateBook = await new BookService().updateBook(id, book);
            return updateBook;
        }catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Delete("{id}")
    async deleteBook(@Path() id: string){
        try{
            const deleteBook = await new BookService().deleteBook(id)
            return deleteBook
        }catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Post("bookmark/{bookId}")
    async userBookmarkBook (@Body() body: any, @Path() bookId: string){
        const { userId } = body;
        try {
            const userBookmarkBook = await new BookService().userBookmarkBook(userId, bookId);
            return userBookmarkBook;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Delete("bookmark/{bookId}")
    async userUnBookmarkBook (@Body() body: any, @Path() bookId: string){
        const { userId } = body;
        try {
            const userUnBookmarkBook = await new BookService().userUnBookmarkBook(userId, bookId);
            return userUnBookmarkBook;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}

