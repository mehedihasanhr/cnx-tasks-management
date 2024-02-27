import * as React from "react";
import LoginForm from "@/components/forms/login-form";

export default function Login() {
  return (
    <div className="inset-0 grid h-screen place-items-center">
      <div className="w-full max-w-[400px] rounded-2xl border border-[rgba(255,255,255,.1)] bg-gradient-service-card p-10">
        <h1 className="mb-10 text-center text-2xl">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
