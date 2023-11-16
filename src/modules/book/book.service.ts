import { db } from "../../utils/db.server";
import { BookRead, BookWrite } from "./book";

export class BookService{
    async listBooks (): Promise<BookRead[]>{
        return db.book.findMany({
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
    }

    async getBook(id: string): Promise<BookRead | null>{
        return db.book.findUnique({
            where:{
                id
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
    }

    async createBook(book: BookWrite): Promise<BookRead>{
        const { title, datePublished, authorId, isFiction } = book;
        const parsedDate: Date = new Date(datePublished);
    
        return db.book.create({
            data:{
                title,
                datePublished: parsedDate,
                authorId,
                isFiction
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                isFiction: true,
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
    }

    async updateBook(id: string, book: BookWrite): Promise<BookRead | null>{
        const { title, datePublished, authorId, isFiction } = book;
        return db.book.update({
            where:{
                id
            },
            data:{
                title,
                datePublished,
                authorId,
                isFiction
            },
            select:{
                id: true,
                title: true,
                datePublished: true,
                updatedAt: true,
                isFiction: true,
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
    }

    async deleteBook(id: string): Promise<any>{
        await db.book.delete({
            where:{
                id
            }
        })
        return { message: "Successfully deleted a book!" }
    }

    async userBookmarkBook (userId: string, bookId: string): Promise<any>{
        await db.bookReader.create({
            data:{
                bookId,
                readerId: userId
            }
        })
        return {  message: "Book bookmarked successfully" }
    }

    async userUnBookmarkBook(readerId: string, bookId: string): Promise<any> {
        await db.bookReader.deleteMany({
            where:{
                bookId,
                readerId
            }
        })
        return {  message: "Book unbookmarked successfully" }
    }
}