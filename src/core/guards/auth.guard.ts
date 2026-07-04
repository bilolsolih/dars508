import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Reflector} from "@nestjs/core";
import {RolesKey} from "../decorators/roles.decorator";
import {Role} from "../enums/role.enum";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const roles: Role[] = this.reflector.getAllAndOverride(RolesKey, [context.getHandler(), context.getClass()]);
    if (!roles)
      return true;

    if (!req.headers.authorization)
      throw new UnauthorizedException();

    const [bearer, token] = req.headers.authorization.split(' ');
    if (!bearer || !token)
      throw new UnauthorizedException();

    try {
      req.user = this.jwtService.verify(token);
      return true
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}