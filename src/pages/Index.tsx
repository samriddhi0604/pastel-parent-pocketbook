
import { useNavigate } from "react-router-dom";
import { Users, User, Home } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFDEE2] via-[#FDE1D3] to-[#E5DEFF] px-2">
      <div className="max-w-lg w-full glass card-shadow text-center px-6 py-10 mt-10">
        <div className="flex flex-col items-center mb-4">
          {/* Pastel circular logo with Users icon */}
          <div className="rounded-full bg-gradient-to-br from-pink-200 via-pink-100 to-pink-300 flex items-center justify-center h-24 w-24 shadow-lg mb-2 border-4 border-white/60">
            <Users color="#ad4871" size={54} />
          </div>
          <h1 className="text-4xl font-extrabold mb-1 text-[#ad4871] font-sans tracking-tight">FamBank</h1>
          <div className="text-xs uppercase tracking-wider text-[#d492b2] font-semibold pb-2">Your family's pastel pocketbook</div>
        </div>
        {/* Hero Accent Image */}
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
          alt="Happy family banking"
          className="w-full max-w-xs mx-auto rounded-2xl mb-6 object-cover shadow"
          style={{ border: "4px solid #ffe9f3" }}
        />
        <p className="text-lg text-pink-900 mb-8">
          Manage parent and child bank accounts together—in perfect pastel harmony.
          <span className="block mt-2 text-sm text-[#c589b8]">Secure, simple, and made for families.</span>
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-2">
          <button
            className="w-full md:w-2/5 pastel-gradient-btn rounded-2xl px-6 py-5 text-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition font-semibold"
            onClick={() => navigate("/login", { state: { userType: "parent" } })}
          >
            <Users size={28} /> Login as Parent
          </button>
          <button
            className="w-full md:w-2/5 pastel-gradient-btn rounded-2xl px-6 py-5 text-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition font-semibold"
            onClick={() => navigate("/login", { state: { userType: "child" } })}
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
