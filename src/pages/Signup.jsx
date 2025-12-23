import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const Signup = () => {
    const { navigate } = useAppContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");

        try {
            const res = await axios.post("https://blog-backend-topaz-seven.vercel.app/api/auth/signup",
                {
                    name,
                    email,
                    password,
                    confirmPassword
                }
            )
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            console.log(res.data);
            navigate("/login");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword(""); 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] px-4">
            <div className="w-full max-w-md bg-slate-950/80 border border-slate-800/70 rounded-2xl shadow-2xl px-6 py-8 sm:px-8 sm:py-10 text-slate-100">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    Create Account ✨
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    Join{" "}
                    <span className="text-sky-400 font-semibold">BlogSpace</span> and
                    start writing today
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="name"
                            className="text-xs font-medium text-slate-300"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="email"
                            className="text-xs font-medium text-slate-300"
                        >
                            Email
                        </label>
                        <input
                            id="email"
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
                            htmlFor="password"
                            className="text-xs font-medium text-slate-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <label
                            htmlFor="confirmPassword"
                            className="text-xs font-medium text-slate-300"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-400 mt-1">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:opacity-95 active:scale-[0.98] transition"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-sky-400 font-medium hover:text-sky-300 hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
