"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./scherma";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.transaction.upsert({
    create: { ...params, userId },
    update: { ...params, userId },
    where: { id: params.id ?? "" },
  });
  // const { id, ...data } = params;

  // if (id) {
  //   // 🔵 UPDATE
  //   await db.transaction.update({
  //     where: { id },
  //     data: { ...data, userId },
  //   });
  // } else {
  //   // 🟢 CREATE
  //   await db.transaction.create({
  //     data: { ...data, userId },
  //   });
  // }

  revalidatePath("/transactions");
};
