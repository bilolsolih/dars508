import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://postgres:123@localhost:5432/dars507',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/migrations/*.js']
});