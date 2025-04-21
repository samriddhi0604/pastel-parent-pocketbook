
import React, { useState } from "react";
import AccountCard from "../components/AccountCard";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Demo data for both parent and child
const PARENT = {
  id: "parent-1",
  name: "Jamie Parent",
  balance: 2000,
  transactions: [
    { id: 1, amount: 1200, type: "Deposit", date: "2024-04-01" },
    { id: 2, amount: -150, type: "Transfer to Child", date: "2024-04-09" },
  ],
};
const CHILD = {
  id: "child-1",
  name: "Alex Child",
  balance: 350,
  transactions: [
    { id: 1, amount: 300, type: "Deposited by Parent", date: "2024-04-06" },
    { id: 2, amount: 50, type: "Deposit", date: "2024-04-08" },
  ],
};

interface Props {
  userType: "parent" | "child";
}
const BankDashboard: React.FC<Props> = ({ userType }) => {
  const navigate = useNavigate();

  // Demo state - ideally, accounts would be fetched uniquely for parent/child after login
  const [parent, setParent] = useState({ ...PARENT });
  const [child, setChild] = useState({ ...CHILD });

  // For parent, which account to view
  const [currentAccount, setCurrentAccount] = useState<"parent" | "child">(userType);

  // Deposit/Withdraw/Transfer
  const handleChange = (id: "parent" | "child", newBalance: number, newTransaction: any) => {
    if (id === "parent") {
      setParent((p) => ({
        ...p,
        balance: newBalance,
        transactions: [newTransaction, ...p.transactions],
      }));
    } else {
      setChild((c) => ({
        ...c,
        balance: newBalance,
        transactions: [newTransaction, ...c.transactions],
      }));
    }
  };
  // Transfer handler for parent
  const handleTransferToChild = (amount: number) => {
    if (parent.balance < amount) return;
    const parentTx = {
      id: parent.transactions.length + 1,
      amount: -amount,
      type: "Transfer to Child",
      date: new Date().toISOString().slice(0, 10),
    };
    const childTx = {
      id: child.transactions.length + 1,
      amount,
      type: "Received from Parent",
      date: new Date().toISOString().slice(0, 10),
    };
    setParent((p) => ({
      ...p,
      balance: p.balance - amount,
      transactions: [parentTx, ...p.transactions],
    }));
    setChild((c) => ({
      ...c,
      balance: c.balance + amount,
      transactions: [childTx, ...c.transactions],
    }));
  };

  // Logout resets demo (go to home)
  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#FFDEE2] via-[#FDE1D3] to-[#E5DEFF] px-3 py-8">
      <div className="w-full max-w-2xl flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-[#ad4871]">
          {userType === "parent"
            ? currentAccount === "parent"
              ? "Parent Account"
              : "Child Account"
            : "Your Account"}
        </h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 border-[1.5px] border-[#f9a8d4] bg-white/40 glass">
          <LogOut size={20} /> Logout
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        {userType === "parent" && (
          <div className="mb-6 flex gap-3">
            <button
              className={`pastel-gradient-btn rounded-xl px-5 py-2 transition-all ${currentAccount === "parent" ? "opacity-100 shadow-md border border-pink-200" : "opacity-60"}`}
              onClick={() => setCurrentAccount("parent")}
            >
              My Account
            </button>
            <button
              className={`pastel-gradient-btn rounded-xl px-5 py-2 transition-all ${currentAccount === "child" ? "opacity-100 shadow-md border border-pink-200" : "opacity-60"}`}
              onClick={() => setCurrentAccount("child")}
            >
              Child's Account
            </button>
          </div>
        )}

        <AccountCard
          account={currentAccount === "parent" ? parent : child}
          isParent={userType === "parent" && currentAccount === "parent"}
          isChild={userType === "child" || (userType === "parent" && currentAccount === "child")}
          onChange={handleChange}
          onTransfer={handleTransferToChild}
          canTransfer={userType === "parent" && currentAccount === "parent"}
        />
      </div>
      <div className="mt-7 text-xs text-gray-400">
        <span>
          {userType === "parent"
            ? "You see both yours and your child's accounts."
            : "You only see your own account."}
        </span>
      </div>
    </div>
  );
};

export default BankDashboard;
