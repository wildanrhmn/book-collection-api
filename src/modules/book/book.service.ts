import { db } from "../../utils/db.server";
import { Author } from "../author/author.service";

export type BookRead = {
    id: string,
    title: string,
    datePublished: Date,
    isFiction: boolean,
    author: Author
}

export type BookWrite = {
    title: string,
    datePublished: Date,
    authorId: string,
    isFiction: boolean
}

export const listBooks = async(): Promise<BookRead[]> => {
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

export const getBook = async(id: string): Promise<BookRead | null> => {
    return db.book.findUnique({
        where:{
            id
        },
        select:{
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
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

export const createBook = async(book: BookWrite): Promise<BookRead> => {
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

export const updateBook = async(id: string, book: BookWrite): Promise<BookRead | null> => {
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

export const deleteBook = async(id: string): Promise<void> => {
    await db.book.delete({
        where:{
            id
        }
    })
}