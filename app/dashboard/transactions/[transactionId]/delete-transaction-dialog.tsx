"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { deleteTransaction } from "./actions";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

const DeleteTransactionDialog = ({
  transactionId,
  transactionDate,
}: {
  transactionId: number;
  transactionDate: string;
}) => {
  const handleDeleteConfirm = async () => {
    const result = await deleteTransaction(transactionId);
    //const router = useRouter();

    if (result?.error) {
      toast.error("error", {
        description: result.message,
      });
      return;
    }
    toast.success("Success", {
      description: "Transaction successfully deleted",
    });
    const [year, month] = transactionDate.split("-");
    //router.push(`/dashboard/transactions?month=${month}&year=${year}`);
    redirect(`/dashboard/transactions?month=${month}&year=${year}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This transaction will be permanently
            deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button onClick={handleDeleteConfirm} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionDialog;
