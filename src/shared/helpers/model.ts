import { Injectable } from '@nestjs/common';

export const Mixin = (...superclass: any) => {
  @Injectable()
  class MixinClass extends superclass {}

  return MixinClass;
};
