import { Controller, Get, Route, Tags} from 'tsoa';
import { ReaderService } from './reader.service';
import { Reader } from "./reader"

@Tags("Reader")
@Route("reader")
export class ReaderController extends Controller {

 @Get("/")
  async getReaders(): Promise<Reader[]> {
      try{
          const readers = await new ReaderService().listReaders();
          return readers;
      }catch (err: any) {
        throw new Error(err.message);
    }
  }
}
