"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<LoginForm>();

  if (session) {
    router.push("/admin/dashboard");
    return null;
  }

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-gold-400 text-center mb-8">
          Goat Admin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded-lg bg-navy-700 border border-navy-600 px-4 py-3 text-white focus:border-gold-500 focus:outline-none"
          />
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-forest-600 py-3 font-medium text-white transition hover:bg-forest-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
