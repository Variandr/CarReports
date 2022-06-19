import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../auth/user.service";

//set user to req with userId from cookie
@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {
  }

  async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session || {};
    if (userId) {
      req.user = await this.userService.findOneBy({id: userId});
    }
    return handler.handle();
  }
}
