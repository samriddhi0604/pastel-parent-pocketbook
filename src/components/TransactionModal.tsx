
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  type: "deposit" | "withdraw" | null;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  balance: number;
  accountType: string;
}

const TransactionModal: React.FC<Props> = ({
  open,
  type,
  onClose,
  onSubmit,
  balance,
  accountType,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (amount <= 0) {
      setError("Amount must be positive!");
      return;
    }
    if (type === "withdraw" && amount > balance) {
      setError("Insufficient funds.");
      return;
    }
    setError("");
    onSubmit(amount);
    setAmount(0);
  };

  React.useEffect(() => {
    setError("");
    setAmount(0);
  }, [open, type]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass">
        <DialogHeader>
          <DialogTitle className="text-pink-900 text-lg">
            {type === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-lg border-pink-300 border focus:ring-pink-300 p-2"
            value={amount ? amount : ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
          />
          {type === "withdraw" && (
            <p className="text-xs text-gray-500">
              Max withdrawable: <span className="font-semibold">${balance}</span>
            </p>
          )}
          {error && <span className="text-xs text-red-500">{error}</span>}
          <div className="flex gap-2 mt-2">
            <Button
              className="pastel-gradient-btn flex-1 rounded-lg"
              onClick={handleSubmit}
            >
              {type === "deposit" ? "Deposit" : "Withdraw"}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-pink-200"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
