// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(['jwt', 'basic'], { session: false }, (err, user) => {
      if (err) {
      }

      if (!user) {
      }

      // Autentikasi berhasil, tambahkan pengguna ke objek permintaan (request)
      req.user = user;
      next();
    })(req, res, next);
  }
}
