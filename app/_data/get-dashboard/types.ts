import { TransactionType } from "@prisma/client";

export type TransactionPercentagemPerType = {
  [key in TransactionType]: number;
};
