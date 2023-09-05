import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { AuthUserDto } from '../dto/auth-user.dto';

@Injectable()
export class JwtBasicAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const next = context.switchToHttp().getNext();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    return await this.authenticate(req, res, next);
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return ['Basic', 'Bearer'].includes(type) ? token : null;
  }

  private authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        ['jwt', 'basic'],
        { session: false },
        (err: Error, user: AuthUserDto, info: any) => {
          const errInfo = info?.[0];
          if (err || errInfo) {
            return reject(new UnauthorizedException(errInfo?.name || err.name));
          }
          if (!user) {
            return reject(new UnauthorizedException());
          }
          req.user = user;

          return resolve(true);
        },
      )(req, res, next);
    });
  }
}
