import {Injectable} from "@nestjs/common";
import {GetAllNewsRequest} from "./get-all-news.request";
import {News} from "@/features/news/entities/news.entity";

@Injectable()
export class GetAllNewsHandler {
  async execute(req: GetAllNewsRequest) {
    const data = await News.find();
    for (let news of data) {
      news.image = "http://localhost:8000" + "/" + news.image;
    }
    return data;
  }
}