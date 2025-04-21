
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
  max: number;
}

const TransferModal: React.FC<Props> = ({ open, onClose, onSubmit, max }) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleTransfer = () => {
    if (amount <= 0) {
      setError("Amount must be positive!");
      return;
    }
    if (amount > max) {
      setError("Insufficient funds.");
      return;
    }
    onSubmit(amount);
    setAmount(0);
    setError("");
    onClose();
  };

  React.useEffect(() => {
    setAmount(0);
    setError("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass">
        <DialogHeader>
          <DialogTitle className="text-pink-900 text-lg">Transfer to Child</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <input
            type="number"
            placeholder="Amount"
            className="w-full rounded-lg border-pink-300 border focus:ring-pink-300 p-2"
            value={amount ? amount : ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
            max={max}
          />
          <p className="text-xs text-gray-500">
            Max transferable: <span className="font-semibold">${max}</span>
          </p>
          {error && <span className="text-xs text-red-500">{error}</span>}
          <div className="flex gap-2 mt-1">
            <Button className="pastel-gradient-btn flex-1 rounded-lg" onClick={handleTransfer}>
              Transfer
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

export default TransferModal;
