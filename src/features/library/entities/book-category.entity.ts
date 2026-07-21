import {Column, Entity} from 'typeorm';
import {BaseModel} from '@/core/base.model';

@Entity('bookCategories')
export class BookCategory extends BaseModel {
  @Column({length: 96, unique: true})
  title: string;
}