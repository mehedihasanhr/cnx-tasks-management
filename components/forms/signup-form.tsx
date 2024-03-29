"use client";

import { createAccountWithEmailPassword } from "@/actions/auth";
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
import { KeyRound, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
  const [isLoading, setIsLoading] = React.useState(false);

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
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const data = await createAccountWithEmailPassword(formData);

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
                <Input
                  type="email"
                  placeholder="Email"
                  icon={<Mail />}
                  {...field}
                />
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
                  type="password"
                  icon={<KeyRound />}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>

        <p className="text-sm text-base-300">
          Already have an account?{" "}
          <Link
            href="/login"
            prefetch={false}
            className="text-red-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignUpForm;
