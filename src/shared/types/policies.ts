import { AnyAbility } from '@casl/ability';

export interface IPolicyHandler {
  handle(ability: AnyAbility): boolean;
}

export type PolicyHandlerCallback = (ability: AnyAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
