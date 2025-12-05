import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";


const Login = () => {
  const { navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login}=useAuthContext();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const data=await axios.post("http://localhost:5000/api/auth/login",{
            email,
            password
        })
        const {token,user}=data.data;
        localStorage.setItem("token",token);
        login(user);
        navigate("/");
        setEmail("");
        setPassword("");

    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] px-4">
      <div className="w-full max-w-md bg-slate-950/80 border border-slate-800/70 rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 text-slate-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">
          Welcome Back 👋
        </h1>
        <h4 className="text-sm text-slate-400 mb-6">
          Sign in to continue to{" "}
          <span className="text-sky-400 font-semibold">BlogSpace</span>
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-xs font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-xs font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:opacity-95 active:scale-[0.98] transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-sky-400 font-medium hover:text-sky-300 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
