"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched({ ...touched, [field]: true });

    if (field === "email") {
      if (!email) {
        setErrors({ ...errors, email: "Email is required" });
      } else if (!validateEmail(email)) {
        setErrors({ ...errors, email: "Please enter a valid email" });
      } else {
        setErrors({ ...errors, email: undefined });
      }
    }

    if (field === "password") {
      if (!password) {
        setErrors({ ...errors, password: "Password is required" });
      } else if (!validatePassword(password)) {
        setErrors({
          ...errors,
          password: "Password must be at least 6 characters",
        });
      } else {
        setErrors({ ...errors, password: undefined });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    setTouched({ email: true, password: true });

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    // Here you would typically handle authentication
    // For now, we'll just simulate a login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  const getInputClassName = (field: "email" | "password") => {
    if (!touched[field]) return "";
    return errors[field]
      ? "border-red-500 focus-visible:ring-red-500"
      : "border-green-500 focus-visible:ring-green-500";
  };

  return (
    <div className="flex items-center justify-center mt-16">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-4xl">ت</span>
          </div>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-gray-400">
            Welcome back! Sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="default" className="w-full" type="button">
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 font-bold bg-background">
                  Or continue With
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                    required
                    className={getInputClassName("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="">
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-blue-500 hover:text-blue-400"
                    >
                      Forgot your Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                    required
                    className={getInputClassName("password")}
                  />
                  {touched.password && errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Continue"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-500 hover:text-blue-400"
            >
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
