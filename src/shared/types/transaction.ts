import { SimpleUser } from 'shared/dto/simple-user.dto';

export enum TransactionType {
  Income = 1,
  Expense = 2,
  Transfer = 3,
  Credit = 4,
  Debt = 5,
  Initial = 6,
}

export enum TransactionAccountType {
  Manual = 1,
  Connected = 2,
}

export type Debtor = SimpleUser;
export type Lender = SimpleUser;
