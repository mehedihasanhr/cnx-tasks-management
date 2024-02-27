"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/components/ui/use-toast";

// form schema
const formSchema = z.object({
  email: z.string().email({ message: "Incorrect email" }),
  password: z.string().min(6, { message: "Incorrect password" }),
});

// Component Render
function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);

  const route = useRouter();
  const { toast } = useToast();
  // Form Instance
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.API}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      toast({
        variant: "destructive",
        title: data.message,
      });

      setIsLoading(false);

      route.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });

      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>

        <p className="text-sm text-base-300">
          {"Haven't an account? "}
          <Link href="/sign-up" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default LoginForm;
