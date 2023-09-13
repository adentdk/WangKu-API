export enum IconType {
  Component = 1,
  URI = 2,
  FILE = 3,
}

export interface BasicUser {
  name: string;
  phone_number: string | null;
  email: string | null;
}
