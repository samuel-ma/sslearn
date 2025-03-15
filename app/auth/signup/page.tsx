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
import { IoLogoFacebook } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});
  const [touched, setTouched] = useState<{
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    password?: boolean;
  }>({});
  const router = useRouter();

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleBlur = (
    field: "firstName" | "lastName" | "email" | "password",
  ) => {
    setTouched({ ...touched, [field]: true });

    if (field === "firstName") {
      if (!firstName) {
        setErrors({ ...errors, firstName: "First name is required" });
      } else if (!validateName(firstName)) {
        setErrors({
          ...errors,
          firstName: "First name must be at least 2 characters",
        });
      } else {
        setErrors({ ...errors, firstName: undefined });
      }
    }

    if (field === "lastName") {
      if (!lastName) {
        setErrors({ ...errors, lastName: "Last name is required" });
      } else if (!validateName(lastName)) {
        setErrors({
          ...errors,
          lastName: "Last name must be at least 2 characters",
        });
      } else {
        setErrors({ ...errors, lastName: undefined });
      }
    }

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
          password:
            "Password must be at least 8 characters with 1 uppercase letter, 1 lowercase letter, and 1 number",
        });
      } else {
        setErrors({ ...errors, password: undefined });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
    } = {};

    if (!firstName) {
      newErrors.firstName = "First name is required";
    } else if (!validateName(firstName)) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
    } else if (!validateName(lastName)) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters with 1 uppercase letter, 1 lowercase letter, and 1 number";
    }

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    // Here you would typically handle registration
    // For now, we'll just simulate a signup
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
  };

  const getInputClassName = (
    field: "firstName" | "lastName" | "email" | "password",
  ) => {
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
          <CardTitle className="text-2xl font-bold">
            Create an Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Welcome! Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="default" className="w-full" type="button">
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="default" className="w-full" type="button">
                <IoLogoFacebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full " />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 font-bold bg-background">
                  Or continue With
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="">
                      Firstname
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      placeholder="Samuel"
                      onChange={(e) => setFirstName(e.target.value)}
                      onBlur={() => handleBlur("firstName")}
                      required
                      className={getInputClassName("firstName")}
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="">
                      Lastname
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      placeholder="Majok"
                      onChange={(e) => setLastName(e.target.value)}
                      onBlur={() => handleBlur("lastName")}
                      required
                      className={getInputClassName("lastName")}
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="name@example.com"
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
                  <Label htmlFor="password" className="">
                    Password
                  </Label>
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
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-sm text-gray-400">
            Have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:text-blue-400"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
