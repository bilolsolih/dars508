import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Role} from "../enums/role.enum";
import {RolesKey} from "../decorators/roles.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const roles: Role[] = this.reflector.getAllAndOverride(RolesKey, [context.getHandler(), context.getClass()]);
    if (!roles)
      return true;

    if (!req.user.role || !roles.includes(req.user.role))
      throw new UnauthorizedException();

    return true;
  }
}