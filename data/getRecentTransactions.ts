import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import "server-only";
import { tr } from "zod/v4/locales";

const getRecentTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }
  const transactions = await db
    .select({
      id: transactionsTable.id,
      transactionDate: transactionsTable.transactionDate,
      description: transactionsTable.description,
      amount: transactionsTable.amount,
      category: categoriesTable.name,
      transactionType: categoriesTable.type,
    })
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(desc(transactionsTable.transactionDate))
    .limit(5)
    .leftJoin(
      categoriesTable,
      eq(transactionsTable.categoryId, categoriesTable.id)
    );

  return transactions;
};

export default getRecentTransactions;
