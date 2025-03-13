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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would typically handle registration
    // For now, we'll just simulate a signup
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 1000);
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
                <span className="px-2 font-bold">
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
                      required
                      className=""
                    />
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
                      required
                      className=""
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className=""
                  />
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
                    required
                    className=""
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
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
