import { db } from "../src/utils/db.server";

type Author = {
    firstName: string,
    lastName: string
}

type Reader = {
    firstName: string,
    lastName: string
}

type Book = {
    title: string,
    isFiction: boolean,
    datePublished: Date
}

async function seed(){
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data:{
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            })
        })
    )
    const author = await db.author.findFirst({
        where: {
            firstName: "William"
        }
    })
    
    await Promise.all(
        getBooks().map((book) => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: String(author?.id),
                }
            })
        })
    )

    await Promise.all(
        getReader().map((reader) => {
            return db.reader.create({
                data:{
                    firstName: reader.firstName,
                    lastName: reader.lastName
                }
            })
        })
    )
}
seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstName: "John",
            lastName: "Doe"
        },
        {
            firstName: "William",
            lastName: "Shakespeare"
        },
        {
            firstName: "Yuval Noah",
            lastName: "Harari"
        }
    ]

}
function getBooks(): Array<Book> {
    return [
        {
            title: "The Great Gatsby",
            isFiction: true,
            datePublished: new Date()
        },
        {
            title: "To Kill a Mockingbird",
            isFiction: true,
            datePublished: new Date()
        },
        {
            title: "Hamlet",
            isFiction: true,
            datePublished: new Date()
        }

    ]
}

function getReader(): Array<Reader> {
    return [
        {
            firstName: "Wildan",
            lastName: "Nur Rahman"
        },
        {
            firstName: "Robert",
            lastName: "Downey"
        },
        {
            firstName: "Steve",
            lastName: "Rogers"
        }
    ]
}