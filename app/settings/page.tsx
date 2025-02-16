"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [theme, setTheme] = useState("light"); // Default theme
  const [isDark, setIsDark] = useState(false);
  const [themeColor, setThemeColor] = useState("zinc"); // Default theme color

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    // Update multiple CSS variables
    document.documentElement.style.setProperty("--theme-color", themeColor);
    switch (themeColor) {
      case "red":
        document.documentElement.style.setProperty("--primary", "0 100% 50%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 10%");
        break;
      case "rose":
        document.documentElement.style.setProperty("--primary", "330 100% 70%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 10%");
        break;
      case "orange":
        document.documentElement.style.setProperty("--primary", "30 100% 60%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 10%");
        break;
      case "green":
        document.documentElement.style.setProperty("--primary", "160 60% 45%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%");
        break;
      case "blue":
        document.documentElement.style.setProperty("--primary", "220 70% 50%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 100%");
        break;
      case "yellow":
        document.documentElement.style.setProperty("--primary", "50 100% 50%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 10%");
        break;
      case "violet":
        document.documentElement.style.setProperty("--primary", "280 100% 70%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 10%");
        break;
      case "zinc":
        document.documentElement.style.setProperty("--primary", "240 10% 3.9%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 98%");
        break;
      default:
        document.documentElement.style.setProperty("--primary", "240 10% 3.9%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 98%");
        break;
    }
  }, [themeColor]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleThemeColorClick = (color: string) => {
    setThemeColor(color);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Tabs defaultValue="account">
        <TabsList className="mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button>Change Avatar</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Web developer and tech enthusiast" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Toggle dark mode on or off</p>
                </div>
                <Switch id="dark-mode" checked={isDark} onCheckedChange={toggleTheme} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Theme Color</Label>
                <div className="flex space-x-2">
                  <Button
                    className={`w-8 h-8 rounded-full bg-red-500 ${themeColor === "red" ? "ring-2 ring-red-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("red")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-rose-500 ${themeColor === "rose" ? "ring-2 ring-rose-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("rose")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-orange-500 ${themeColor === "orange" ? "ring-2 ring-orange-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("orange")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-green-500 ${themeColor === "green" ? "ring-2 ring-green-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("green")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-blue-500 ${themeColor === "blue" ? "ring-2 ring-blue-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("blue")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-yellow-500 ${themeColor === "yellow" ? "ring-2 ring-yellow-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("yellow")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-violet-500 ${themeColor === "violet" ? "ring-2 ring-violet-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("violet")}
                  />
                  <Button
                    className={`w-8 h-8 rounded-full bg-zinc-500 ${themeColor === "zinc" ? "ring-2 ring-zinc-500 ring-offset-1" : ""}`}
                    onClick={() => handleThemeColorClick("zinc")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Notification Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="course-updates" />
                    <Label htmlFor="course-updates">Course Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="quiz-reminders" />
                    <Label htmlFor="quiz-reminders">Quiz Reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="community-activity" />
                    <Label htmlFor="community-activity">Community Activity</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="two-factor" checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              <Button>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

