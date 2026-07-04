import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from './core/configs/typeorm.config';
import {AuthModule} from './features/auth/auth.module';
import {LibraryModule} from './features/library/library.module';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./core/guards/auth.guard";
import {RoleGuard} from "./core/guards/role.guard";
import {CommonModule} from "./features/common/common.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register({
      global: true,
      secret: 'SuperSecretKeyDoNotUseInProduction',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AuthModule,
    CommonModule,
    LibraryModule,
  ],
  providers: [
    {provide: APP_GUARD, useClass: AuthGuard},
    {provide: APP_GUARD, useClass: RoleGuard},
  ],
})
export class AppModule {
}
