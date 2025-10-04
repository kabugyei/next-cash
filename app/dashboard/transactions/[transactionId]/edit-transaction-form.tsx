"use client";
import TransactionForm, {
  transactionFormSchema,
} from "@/components/transaction-form";
import { Category } from "@/types/Categories";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { updateTransaction } from "./actions";

const EditTransactionForm = ({
  categories,
  transaction,
}: {
  categories: Category[];
  transaction: {
    id: number;
    amount: string;
    categoryId: number;
    description: string;
    transactionDate: string;
  };
}) => {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await updateTransaction({
      id: transaction.id,
      amount: data.amount,
      description: data.description,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      categoryId: data.categoryId,
    });
    if (result?.error) {
      toast.error("Error", {
        description: result.message,
      });
      return;
    }
    toast.success("Success", {
      description: "Transaction updated",
    });
    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
    // redirect(
    //   `/dashboard/transactions?month=${data.transactionDate.getMonth()}`
    // );
  };
  return (
    <TransactionForm
      defaultValues={{
        amount: Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find((category) => category.id === transaction.categoryId)
            ?.type ?? "income",
      }}
      onSubmit={handleSubmit}
      categories={categories}
    />
  );
};
export default EditTransactionForm;
