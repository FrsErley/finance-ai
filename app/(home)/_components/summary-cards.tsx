import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
}

const SummaryCards = async ({ month }: SummaryCards) => {
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

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
