import { db } from "../../utils/db.server";

export type Author = {
    id: string,
    firstName: string,
    lastName: string
}

export const listAuthors = async(): Promise<Author[]> => {
    return db.author.findMany({
        select:{
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

export const getAuthor = async(id: string): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
            id
        }
    });
}

export const createAuthor = async(author: Omit<Author, "id">): Promise<Author> => {
    const { firstName, lastName } = author;
    return db.author.create({
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

export const updateAuthor = async(id: string, author: Omit<Author, "id">): Promise<Author | null> => {
    const { firstName, lastName } = author;
    return db.author.update({
        where: {
            id
        },
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    });
}

export const deleteAuthor = async(id: string): Promise<Author | null> => {
    return db.author.delete({
        where: {
            id
        },
    });
}