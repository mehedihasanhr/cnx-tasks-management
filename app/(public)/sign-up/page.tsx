import React from "react";
import SignUpForm from "@/components/forms/signup-form";

function SignUp() {
  return (
    <div className="inset-0 grid h-screen place-items-center">
      <div className="w-full max-w-[450px] rounded-2xl border border-[rgba(255,255,255,.1)] bg-gradient-service-card p-10">
        <h1 className="mb-10 text-center text-2xl">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
