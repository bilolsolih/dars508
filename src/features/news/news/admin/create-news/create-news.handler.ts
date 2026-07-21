import {Injectable} from "@nestjs/common";
import {CreateNewsRequest} from "./create-news.request";
import {News} from "@/features/news/entities/news.entity";

@Injectable()
export class CreateNewsHandler {
  async execute(req: CreateNewsRequest, image: Express.Multer.File) {
    const newNews = {title: req.title, image: image.path} as News;
    return await News.save(newNews);
  }
}