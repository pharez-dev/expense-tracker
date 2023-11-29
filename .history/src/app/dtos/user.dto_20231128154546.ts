export class UserDto {
  email: string;
  password: string;
  id?: number | null;
  name?: string | null;
}
export class SessionUser {
  email?: string;
  password?: string;
  id?: number;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class TransactionsDto {
  id?: number;
  amount: number;
  balance: number;
  recipient: string;
  transactionId: string;
  type: TransactionType;
  user?: object;
  userId: number;
  createdAt?: Date;
  transactionCategory: TransactionCategory;
}
export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

enum TransactionCategory {
  paybill = "paybill",
  buygoods = "buygoods",
  sendmoney = "sendmoney",
}
