import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getTransactionsByMonth from "@/data/getTransactionsByMonth";
import { format } from "date-fns";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import z from "zod";
import numeral from "numeral";
import { Badge } from "@/components/ui/badge";
import Filters from "./filters";
import getTransactionYearsRange from "@/data/getTransactionYearsRange";
import CashflowFilters from "./cashflow-filters";

const today = new Date();

const searchSchema = z.object({
  year: z.coerce
    .number()
    .min(today.getFullYear() - 100)
    .max(today.getUTCFullYear() + 1)
    .catch(today.getFullYear()),
  month: z.coerce
    .number()
    .min(1)
    .max(12)
    .catch(today.getMonth() + 1),
});

const TransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) => {
  const searchParamsValues = await searchParams;

  const { month, year } = searchSchema.parse(searchParamsValues);

  const selectedDate = new Date(year, month - 1, 1);

  const transactions = await getTransactionsByMonth({ month, year });
  //console.log(transactions);
  const yearsRange = await getTransactionYearsRange();

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Transactions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>{format(selectedDate, "MMM yyyy")} Transactions</span>
            <div>
              <Filters month={month} year={year} yearsRange={yearsRange} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/dashboard/transactions/new">New Transaction</Link>
          </Button>
          {!transactions?.length && (
            <p className="text-lg py-10 text-center text-muted-foreground">
              There are no transactions for this month
            </p>
          )}
          {!!transactions?.length && (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(transaction.transactionDate, "do MMM yyyy")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="capitalize">
                      <Badge
                        className={
                          transaction.transactionType === "income"
                            ? "bg-lime-500"
                            : "bg-orange-500"
                        }
                      >
                        {transaction.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>
                      ${numeral(transaction.amount).format("0,0[.]00")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        aria-label="Edit transactions"
                      >
                        <Link
                          href={`/dashboard/transactions/${transaction.id}`}
                        >
                          <PencilIcon />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
