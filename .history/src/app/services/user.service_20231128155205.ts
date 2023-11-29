import {
  HttpResponse,
  HttpResponseCreated,
  HttpResponseOK,
  Logger,
  dependency,
} from "@foal/core";
import { PrismaClient, Transaction } from "@prisma/client";
import {
  SessionUser,
  TransactionType,
  TransactionsDto,
} from "../dtos/user.dto";

export class UserService {
  @dependency
  logger: Logger;
  @dependency
  prisma: PrismaClient;

  async getTransactions(
    sessionUser: SessionUser,
    type: TransactionType
  ): Promise<HttpResponse> {
    console.log(type);
    const transactions: Transaction[] = await this.prisma.transaction.findMany({
      where: { userId: sessionUser.id, transactionType: type },
    });
    return new HttpResponseOK({ message: "success", transactions });
  }

  async createTransactions(
    sessionUser: SessionUser,
    transaction: TransactionsDto
  ): Promise<HttpResponse> {
    console.log(transaction);
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        amount: parseFloat(transaction.amount.toString()),
        transactionId: transaction.transactionId,
        balance: parseFloat(transaction.balance.toString()),
        recipient: transaction.recipient,

        user: {
          connect: { id: Number(sessionUser.id) }, // Replace with the actual user ID
        },
        expenseCategory: {
          connect: { id: Number(TransactionsDto.expenseCategoryId) },
        },
      },
    });
    return new HttpResponseCreated({
      message: "Success",
      transaction: createdTransaction,
    });
  }
}
