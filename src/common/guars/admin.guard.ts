import { CanActivate, ExecutionContext } from '@nestjs/common';

//check for user's admin access
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (!req.user) {
      return false;
    }
    return req.user.admin;
  }
}
