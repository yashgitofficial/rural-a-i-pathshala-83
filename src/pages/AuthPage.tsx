import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, TreePine, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImage from "@/assets/hero-village-learning.jpg";

const AuthPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);

  const handleLogin = (role: "student" | "teacher") => {
    // In a real app, this would validate credentials
    navigate(role === "student" ? "/student-dashboard" : "/teacher-dashboard");
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col relative p-4">
        {/* Top Navigation */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between mb-4">
          <Button
            variant="secondary"
            className="shadow-soft"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4 mr-2" />
            ← {t('nav.home')}
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-8 animate-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-6">
                <TreePine className="h-12 w-12 text-white animate-gentle-bounce" />
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  नभा
                  <span className="block text-xl md:text-2xl font-normal opacity-90">
                    {t('hero.title')}
                  </span>
                </h1>
              </div>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                {t('hero.description')}
              </p>
            </div>

            {/* Role Selection */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card 
                className="cursor-pointer hover:shadow-glow transition-bounce bg-card/95 backdrop-blur-sm border-none"
                onClick={() => setUserRole("student")}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-primary">{t('dashboard.student.title')}</CardTitle>
                  <CardDescription className="text-base">
                    Access courses, take quizzes, and learn with AI assistance
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-glow transition-bounce bg-card/95 backdrop-blur-sm border-none"
                onClick={() => setUserRole("teacher")}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-secondary">{t('dashboard.teacher.title')}</CardTitle>
                  <CardDescription className="text-base">
                    Manage courses, track progress, and support students
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={() => navigate("/")}
        >
          <Home className="h-4 w-4 mr-2" />
          {t('nav.home')}
        </Button>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="w-full max-w-md">
        <Card className="bg-card/95 backdrop-blur-sm border-none shadow-glow">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TreePine className="h-8 w-8 text-primary" />
              <Button
                variant="ghost"
                size="sm"
                className="text-sm"
                onClick={() => navigate("/")}
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Button>
            </div>
            <h2 className="text-2xl font-bold">नभा Nabha</h2>
            <CardTitle className="text-xl">
              {userRole === "student" ? t('auth.login.title') + " - Student" : t('auth.login.title') + " - Teacher"}
            </CardTitle>
            <CardDescription>
              Welcome back! Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or Phone</Label>
                  <Input id="email" type="email" placeholder="Enter your email or phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" />
                </div>
                <Button 
                  className="w-full" 
                  variant={userRole === "student" ? "hero" : "warm"}
                  size="lg"
                  onClick={() => handleLogin(userRole)}
                >
                  Login as {userRole === "student" ? "Student" : "Teacher"}
                </Button>
                <Button variant="link" className="w-full text-sm">
                  Forgot Password?
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email or Phone</Label>
                  <Input id="signup-email" type="email" placeholder="Enter your email or phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Create a password" />
                </div>
                <Button 
                  className="w-full" 
                  variant={userRole === "student" ? "hero" : "warm"}
                  size="lg"
                >
                  Create {userRole === "student" ? "Student" : "Teacher"} Account
                </Button>
              </TabsContent>
            </Tabs>
            
            <Button 
              variant="ghost" 
              className="w-full mt-4" 
              onClick={() => setUserRole(null)}
            >
              ← Back to Role Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;