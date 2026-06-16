import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:123@localhost:5432/dars507',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};