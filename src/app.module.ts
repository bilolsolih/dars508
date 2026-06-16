import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './core/configs/typeorm.config';
import { AuthModule } from './features/auth/auth.module';
import { LibraryModule } from './features/library/library.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    LibraryModule,
  ],
})
export class AppModule {
}
