import { db } from "../../utils/db.server"


export type Reader = {
    id: string,
    firstName: string,
    lastName: string
}

export const listReaders = async(): Promise<Reader[]> => {
    return db.reader.findMany({
        select:{
            id: true,
            firstName: true,
            lastName: true,
            bookmarks: {
                select:{
                    book:{
                        select:{
                            id: true,
                            title: true
                        }   
                    }
                }
            },
        }
    })
}

export const readerBookmarkBook = async(readerId: string, bookId: string): Promise<void> => {
    await db.bookReader.create({
        data:{
            bookId,
            readerId
        }
    })
}



