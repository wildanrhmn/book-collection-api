import { db } from "../../utils/db.server"
import { Reader } from "./reader"

export class ReaderService{
    async listReaders (): Promise<Reader[]>{
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
                }
            }
        })
    }
}




