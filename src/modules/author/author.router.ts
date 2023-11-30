import { Controller, Get, Path, Route, Body, Post, Put, Delete, Tags } from 'tsoa';
import { AuthorService } from './author.service';

import { Author } from './author';

@Tags("Author")
@Route("author")
export class AuthorController extends Controller {
   
    @Get("/")
     async getAuthors(): Promise<any> {
         try {
             const authors = await new AuthorService().listAuthors();
             return authors;
         } catch (err: any) {
             return err
         }
     }

     @Get("{id}")
    async getAuthor(@Path() id: string): Promise<any> {
        try {
            const author = await new AuthorService().getAuthor(id);
            return author;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Post("/")
    async createAuthor(@Body() author: Author){
        try {
            const newAuthor = await new AuthorService().createAuthor(author);
            this.setStatus(201);
            return newAuthor;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Put("{id}")
    async updateAuthor(@Path() id: string, @Body() author: Author){
        try{
            const updateAuthor = await new AuthorService().updateAuthor(id, author);
            return updateAuthor;
        }catch (err: any) {
            throw new Error(err.message);
        }
    }

    @Delete("{id}")
    async deleteAuthor(@Path() id: string){
        try{
            const deleteAuthor = await new AuthorService().deleteAuthor(id)
            return deleteAuthor
        }catch (err: any) {
            throw new Error(err.message);
        }
    }
}

