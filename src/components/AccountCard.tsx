
import React, { useState } from "react";
import { Banknote, User, Wallet, ArrowUp, ArrowDown } from "lucide-react";
import TransactionModal from "./TransactionModal";
import TransferModal from "./TransferModal";

interface Account {
  id: string;
  name: string;
  balance: number;
  transactions: { id: number; amount: number; type: string; date: string }[];
}
interface Props {
  account: Account;
  isParent?: boolean;
  isChild?: boolean;
  onChange: (id: "parent" | "child", newBalance: number, newTransaction: any) => void;
  onTransfer?: (amount: number) => void;
  canTransfer?: boolean;
}

const AccountCard: React.FC<Props> = ({
  account,
  isParent,
  isChild,
  onChange,
  onTransfer,
  canTransfer,
}) => {
  const [modalType, setModalType] = useState<null | "deposit" | "withdraw">(null);
  const [showTransfer, setShowTransfer] = useState(false);

  const isChildAccount = account.id.includes("child");

  const handleDeposit = (amount: number) => {
    onChange(isChildAccount ? "child" : "parent", account.balance + amount, {
      id: account.transactions.length + 1,
      amount: amount,
      type: "Deposit",
      date: new Date().toISOString().slice(0, 10),
    });
    setModalType(null);
  };

  const handleWithdraw = (amount: number) => {
    if (account.balance < amount) return;
    onChange(isChildAccount ? "child" : "parent", account.balance - amount, {
      id: account.transactions.length + 1,
      amount: -amount,
      type: "Withdraw",
      date: new Date().toISOString().slice(0, 10),
    });
    setModalType(null);
  };

  return (
    <div className="glass card-shadow max-w-xl mx-auto p-6 mb-2 flex flex-col items-center">
      <div className="flex items-center gap-3 mb-4">
        <Wallet size={30} className="text-pink-500" />
        <h2 className="text-2xl font-bold text-pink-900">{account.name}</h2>
      </div>

      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <p className="text-sm text-gray-500 font-medium">Current Balance</p>
          <span className="text-3xl font-extrabold text-[#ad4871]">${account.balance}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="pastel-gradient-btn px-4 py-2 rounded-lg shadow transition hover:scale-105"
            onClick={() => setModalType("deposit")}
          >
            <ArrowDown size={18} className="inline mr-1" /> Deposit
          </button>
          <button
            className="pastel-gradient-btn px-4 py-2 rounded-lg shadow transition hover:scale-105"
            onClick={() => setModalType("withdraw")}
          >
            <ArrowUp size={18} className="inline mr-1" /> Withdraw
          </button>
          {canTransfer && (
            <button
              className="bg-white/80 shadow px-4 py-2 ml-2 rounded-lg border border-pink-300 font-semibold text-pink-700 hover:bg-pink-100 transition"
              onClick={() => setShowTransfer(true)}
            >
              Transfer to Child
            </button>
          )}
        </div>
      </div>

      <div className="w-full mb-2">
        <p className="font-semibold mb-1 text-pink-900">Recent Transactions</p>
        <ul className="bg-white/40 rounded-xl p-3 shadow-inner max-h-48 overflow-auto">
          {account.transactions.length === 0 ? (
            <li className="text-gray-400 text-sm">No transactions yet.</li>
          ) : (
            account.transactions.slice(0, 5).map((tx) => (
              <li key={tx.id} className="flex justify-between items-center mb-1 last:mb-0">
                <span className="font-medium text-sm">{tx.type}</span>
                <span
                  className={`text-sm font-mono ${
                    tx.amount < 0 ? "text-red-500" : "text-green-700"
                  }`}
                >
                  {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount)}
                </span>
                <span className="text-xs text-[#ad4871]">{tx.date}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Deposit/Withdraw Modal */}
      <TransactionModal
        open={!!modalType}
        type={modalType}
        onClose={() => setModalType(null)}
        onSubmit={modalType === "deposit" ? handleDeposit : handleWithdraw}
        accountType={isChildAccount ? "Child" : "Parent"}
        balance={account.balance}
      />
      {/* Transfer to Child Modal */}
      {showTransfer && canTransfer && onTransfer && (
        <TransferModal
          open={showTransfer}
          onClose={() => setShowTransfer(false)}
          onSubmit={onTransfer}
          max={account.balance}
        />
      )}
    </div>
  );
};

export default AccountCard;
