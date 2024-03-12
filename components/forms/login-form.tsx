"use client";

import { loginWithEmailPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
      email: "demo@example.com",
      password: "12345678",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const data = await loginWithEmailPassword(formData);

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
                <Input type="email" placeholder="Email" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
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
          <Link
            href="/sign-up"
            prefetch={false}
            className="text-red-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default LoginForm;
