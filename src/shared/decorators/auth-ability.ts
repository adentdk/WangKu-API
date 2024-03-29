import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthAbility = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.ability;
  },
);
