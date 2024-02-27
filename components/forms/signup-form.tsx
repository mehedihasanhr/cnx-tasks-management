"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { config } from "@/config";
import { KeyRound, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// form schema
const formSchema = z
  .object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password Contain at least 6 Character" }),
    confirm_password: z.string().optional(),
  })
  .refine((data) => data.password && data.password === data.confirm_password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
  });

// Component Render
function SignUpForm() {
  const route = useRouter();
  const { toast } = useToast();
  // Form Instance
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // on submit function
  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    try {
      fetch(`${config.API}/auth/signup`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          toast({
            variant: "destructive",
            title: res.message,
          });
          route.push("/dashboard");
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" icon={<User />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" icon={<Mail />} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  icon={<KeyRound />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Re-type Password"
                  icon={<KeyRound />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Sign Up</Button>

        <p className="text-sm text-base-300">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignUpForm;
