import { db } from "../../utils/db.server";
import { Author } from "./author";

export class AuthorService{
    async listAuthors (): Promise<Author[]>{
        return db.author.findMany({
            select:{
                id: true,
                firstName: true,
                lastName: true
            }
        });
    }

    async getAuthor (id: string): Promise<Author | null>{
        return db.author.findUnique({
            where: {
                id
            }
        });
    }

    async createAuthor (author: Pick<Author, "firstName" | "lastName">): Promise<Author>{
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

    async updateAuthor (id: string, author: Pick<Author, "firstName" | "lastName">): Promise<Author | null>{
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

    async deleteAuthor(id: string): Promise<any>{
        await db.author.delete({
            where: {
                id
            },
        });
        return { message: "Successfully deleted an Author!" }
    }

}
