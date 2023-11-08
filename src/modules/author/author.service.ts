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