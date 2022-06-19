import { CanActivate, ExecutionContext } from "@nestjs/common";

//check for user access
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req.session.userId;
  }
}
