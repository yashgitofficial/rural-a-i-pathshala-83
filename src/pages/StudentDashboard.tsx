import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Trophy, MessageCircle, LogOut, TreePine, Play, Star, Clock, Home, Download } from "lucide-react";
import { ChatBot } from "@/components/ChatBot";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const StudentDashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const { t } = useTranslation();
  
  const studentData = {
    name: "Priya Sharma",
    avatar: "👧",
    completedCourses: 3,
    totalCourses: 8,
    overallProgress: 65,
    recentQuizScore: 85,
    streak: 7
  };

  const recentCourses = [
    {
      id: 1,
      title: "Mathematics - Class 8",
      teacher: "Mr. Rajesh Kumar",
      progress: 75,
      nextLesson: "Algebra Basics",
      difficulty: "Medium",
      duration: "45 min"
    },
    {
      id: 2,
      title: "Science - Biology",
      teacher: "Ms. Sunita Devi",
      progress: 60,
      nextLesson: "Plant Structure",
      difficulty: "Easy",
      duration: "30 min"
    },
    {
      id: 3,
      title: "Hindi Literature",
      teacher: "Mr. Ashok Pandey",
      progress: 45,
      nextLesson: "Poetry Analysis",
      difficulty: "Medium",
      duration: "35 min"
    }
  ];

  const achievements = [
    { title: "First Quiz Completed", icon: "🎯", date: "2 days ago" },
    { title: "7-Day Streak", icon: "🔥", date: "Today" },
    { title: "Math Champion", icon: "🏆", date: "1 week ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">{t('common.home')}</span>
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <TreePine className="h-8 w-8" />
              <h1 className="text-2xl font-bold">नभा Nabha</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex lg:items-center lg:gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm opacity-90">{t('dashboard.welcome')},</p>
              <p className="font-semibold">{studentData.name}</p>
            </div>
            <div className="text-2xl">{studentData.avatar}</div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-card rounded-xl p-6 shadow-card animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Learn Today? 📚</h2>
              <p className="text-muted-foreground">
                You're doing great! Keep up the momentum with your studies.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">{studentData.streak} Day Streak!</span>
              </div>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {studentData.overallProgress}% Complete
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-semibold text-lg">{studentData.completedCourses}</p>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-lg">{studentData.recentQuizScore}%</p>
                <p className="text-sm text-muted-foreground">Last Quiz Score</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-semibold text-lg">{studentData.totalCourses}</p>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
                <CardDescription>
                  Pick up where you left off
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {course.teacher}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {course.difficulty}
                          </Badge>
                        </div>
                       </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Notes
                        </Button>
                        <Link to={`/lesson/${course.id}`}>
                          <Button variant="hero" size="sm">
                            Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Next: {course.nextLesson}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/courses">
                <Button variant="village" size="xl" className="h-20 flex-col w-full">
                  <BookOpen className="h-6 w-6 mb-2" />
                  Browse All Courses
                </Button>
              </Link>
              <Link to="/quick-quiz">
                <Button variant="sky" size="xl" className="h-20 flex-col w-full">
                  <Brain className="h-6 w-6 mb-2" />
                  Take a Quick Quiz
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="shadow-card bg-gradient-hero text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Learning Assistant
                </CardTitle>
                <CardDescription className="text-white/80">
                  Get help with your studies anytime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={() => setShowChatBot(true)}
                >
                  Ask AI for Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <Button
        variant="hero"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow animate-gentle-bounce z-50"
        onClick={() => setShowChatBot(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* ChatBot Component */}
      <ChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
    </div>
  );
};

export default StudentDashboard;