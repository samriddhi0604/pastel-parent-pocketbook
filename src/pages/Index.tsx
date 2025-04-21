
import { useNavigate } from "react-router-dom";
import { Users, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDEE2] via-[#FDE1D3] to-[#E5DEFF] px-2">
      <div className="max-w-lg w-full glass card-shadow text-center px-6 py-10">
        <h1 className="text-4xl font-extrabold mb-2 text-[#ad4871]">Pastel Parent Pocketbook</h1>
        <p className="text-lg text-pink-900 mb-8">
          Manage parent and child bank accounts in perfect pink pastel harmony.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button
            className="w-full md:w-2/5 pastel-gradient-btn rounded-2xl px-6 py-5 text-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition"
            onClick={() => navigate("/dashboard/parent")}
          >
            <Users size={28} /> Login as Parent
          </button>
          <button
            className="w-full md:w-2/5 pastel-gradient-btn rounded-2xl px-6 py-5 text-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition"
            onClick={() => navigate("/dashboard/child")}
          >
            <User size={28} /> Login as Child
          </button>
        </div>
        <div className="mt-7 text-xs text-gray-500">Demo app — all data is simulated</div>
      </div>
    </div>
  );
};

export default Index;
