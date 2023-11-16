import { Author } from "../author/author"

export interface BookRead {
    id: string,
    title: string,
    datePublished: Date,
    isFiction: boolean,
    author: Author
}

export interface BookWrite {
    title: string,
    datePublished: Date,
    authorId: string,
    isFiction: boolean
}