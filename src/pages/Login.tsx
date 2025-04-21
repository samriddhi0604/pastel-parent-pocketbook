
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    username: "",
    password: "",
    userType: location.state?.userType ?? "parent",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRadio = (v: "parent" | "child") => {
    setForm((f) => ({ ...f, userType: v }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.userType === "parent") {
      navigate("/dashboard/parent");
    } else {
      navigate("/dashboard/child");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDEE2] via-[#FDE1D3] to-[#E5DEFF] px-2">
      <div className="max-w-lg w-full glass card-shadow px-8 py-10 mt-10">
        <div className="flex flex-col items-center mb-5">
          <div className="rounded-full bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 flex items-center justify-center h-20 w-20 shadow-lg mb-2 border-4 border-white/60">
            {form.userType === "parent" ? (
              <Users color="#ad4871" size={42} />
            ) : (
              <User color="#ad4871" size={42} />
            )}
          </div>
          <h2 className="text-3xl font-extrabold text-[#ad4871] font-sans mb-1">
            {isSignup ? "Sign Up" : "Login"} to FamBank
          </h2>
          <div className="text-xs uppercase tracking-wider text-[#d492b2] font-semibold pb-2">
            {isSignup ? "Create your family's pastel bank account" : "Welcome back to your pastel pocketbook"}
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <div className="flex justify-center gap-3 mb-3">
            <button
              type="button"
              className={`pastel-gradient-btn rounded-lg px-4 py-1 font-semibold border ${form.userType === "parent" ? "opacity-100 shadow border-pink-200" : "opacity-70 border-transparent"}`}
              onClick={() => handleRadio("parent")}
            >
              <Users size={18} className="inline mr-1" />
              Parent
            </button>
            <button
              type="button"
              className={`pastel-gradient-btn rounded-lg px-4 py-1 font-semibold border ${form.userType === "child" ? "opacity-100 shadow border-pink-200" : "opacity-70 border-transparent"}`}
              onClick={() => handleRadio("child")}
            >
              <User size={18} className="inline mr-1" />
              Child
            </button>
          </div>
          <label className="text-left text-sm text-[#ad4871] font-semibold flex items-center gap-2">
            Username
            <Input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={form.username}
              onChange={handleInput}
              className="mt-1"
            />
          </label>
          <label className="text-left text-sm text-[#ad4871] font-semibold flex items-center gap-2">
            Password
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleInput}
              className="mt-1"
            />
            <Lock size={18} className="ml-1 text-[#d492b2]" />
          </label>
          {/* Show Sign Up / Login Toggle for Demo */}
          <div className="flex justify-between text-xs text-[#b993a7] mt-2">
            <span>
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                type="button"
                className="ml-1 font-semibold underline hover:text-[#ad4871] transition"
                onClick={() => setIsSignup((v) => !v)}
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </span>
          </div>
          <Button
            type="submit"
            className="mt-2 pastel-gradient-btn rounded-xl px-5 py-3 text-lg shadow-lg font-bold transition hover:scale-105"
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className="mt-6 text-xs text-gray-500 text-center">
          <span>
            {isSignup
              ? "This is a simulated signup — account creation is not persistent."
              : "This is a demo login — accounts are for example only."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

