import {BaseModel} from "@/core/base.model";
import {Column, Entity} from "typeorm";

@Entity("news")
export class News extends BaseModel {
  @Column({length: 512})
  title: string;

  @Column({length: 256})
  image: string;
}