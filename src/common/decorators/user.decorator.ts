import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//get user from request
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
