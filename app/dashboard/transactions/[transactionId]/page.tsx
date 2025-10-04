import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/data/getCategories";
import Link from "next/link";
import EditTransactionForm from "./edit-transaction-form";
import getTransaction from "@/data/getTransaction";
import { notFound } from "next/navigation";
import DeleteTransactionDialog from "./delete-transaction-dialog";

const EditTransactionsPage = async ({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) => {
  const paramValues = await params;
  const transactionId = Number(paramValues.transactionId);
  if (isNaN(transactionId)) {
    notFound();
  }

  const categories = await getCategories();
  const transaction = await getTransaction(transactionId);

  if (!transaction) {
    notFound();
  }

  return (
    <Card className="max-w-screen-md mt-4">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Edit Transaction</span>
          <DeleteTransactionDialog
            transactionId={transaction.id}
            transactionDate={transaction.transactionDate}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditTransactionForm
          transaction={transaction}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
};

export default EditTransactionsPage;
