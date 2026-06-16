import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../features/auth/entities/user.entity';
import argon2 from 'argon2';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (!req.headers.login || !req.headers.password)
      return false;

    const user = await User.findOneBy({ login: String(req.headers.login) });
    if (!user)
      return false;

    return await argon2.verify(user.password, String(req.headers.password));
  }
}