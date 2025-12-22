import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagemPerType } from "./types";

export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(new Date().getFullYear(), Number(month) - 1, 1),
      lt: new Date(new Date().getFullYear(), Number(month), 1),
    },
  };
  const depositsTotal = Number(
    await db.transaction
      .aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
      .then((res) => res._sum.amount || 0),
  );

  const investmentsTotal = Number(
    await db.transaction
      .aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
      .then((res) => res._sum.amount || 0),
  );

  const expensesTotal = Number(
    await db.transaction
      .aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
      .then((res) => res._sum.amount || 0),
  );

  const balance = investmentsTotal - depositsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagemPerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
  };
};
