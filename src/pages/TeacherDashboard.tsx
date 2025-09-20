import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, BarChart3, Settings, LogOut, TreePine, MessageCircle, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { ChatBot } from "@/components/ChatBot";

const TeacherDashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  
  const teacherData = {
    name: "Dr. Sunita Devi",
    avatar: "👩‍🏫",
    totalStudents: 156,
    activeCourses: 5,
    avgCompletion: 72,
    totalQuizzes: 28
  };

  const recentCourses = [
    {
      id: 1,
      title: "Science - Biology Class 9",
      students: 34,
      completion: 78,
      lastUpdated: "2 days ago",
      status: "active",
      avgScore: 82
    },
    {
      id: 2,
      title: "Chemistry Basics",
      students: 28,
      completion: 65,
      lastUpdated: "1 week ago",
      status: "active",
      avgScore: 75
    },
    {
      id: 3,
      title: "Environmental Science",
      students: 45,
      completion: 45,
      lastUpdated: "3 days ago",
      status: "draft",
      avgScore: 68
    }
  ];

  const studentPerformance = [
    { name: "Priya Sharma", course: "Biology", score: 95, status: "excellent" },
    { name: "Rahul Kumar", course: "Chemistry", score: 78, status: "good" },
    { name: "Anjali Singh", course: "Biology", score: 65, status: "needs-help" },
    { name: "Vikash Yadav", course: "Environmental", score: 88, status: "excellent" }
  ];

  const recentActivity = [
    { action: "New quiz completed", student: "Priya Sharma", time: "2 hours ago" },
    { action: "Course enrollment", student: "5 new students", time: "1 day ago" },
    { action: "Assignment submitted", student: "Rahul Kumar", time: "2 days ago" },
    { action: "Help request", student: "Anjali Singh", time: "3 days ago" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-warm text-white p-4 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TreePine className="h-8 w-8" />
            <h1 className="text-2xl font-bold">नभा Nabha - Teacher Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm opacity-90">Welcome back,</p>
              <p className="font-semibold">{teacherData.name}</p>
            </div>
            <div className="text-2xl">{teacherData.avatar}</div>
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
              <h2 className="text-2xl font-bold mb-2">Good Morning, Dr. Sunita! 🌅</h2>
              <p className="text-muted-foreground">
                Your students are making great progress. Here's your daily overview.
              </p>
            </div>
            <Button variant="warm" size="lg" className="hidden md:flex">
              <Plus className="h-5 w-5 mr-2" />
              Create New Course
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold text-lg">{teacherData.totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p className="font-semibold text-lg">{teacherData.activeCourses}</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-village-green mx-auto mb-2" />
                <p className="font-semibold text-lg">{teacherData.avgCompletion}%</p>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
              </CardContent>
            </Card>
            
            <Card className="border-none bg-white/50">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 text-sky-blue mx-auto mb-2" />
                <p className="font-semibold text-lg">{teacherData.totalQuizzes}</p>
                <p className="text-sm text-muted-foreground">Quizzes Created</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Management */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Your Courses
                    </CardTitle>
                    <CardDescription>
                      Manage and track your course progress
                    </CardDescription>
                  </div>
                  <Button variant="warm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <Badge 
                            variant={course.status === "active" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Updated {course.lastUpdated}
                          </span>
                          <span>Avg Score: {course.avgScore}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="warm" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Course Completion</span>
                        <span>{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Student Performance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  Student Performance Overview
                </CardTitle>
                <CardDescription>
                  Recent student achievements and areas needing attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentPerformance.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{student.score}%</span>
                        <Badge 
                          variant={
                            student.status === "excellent" ? "default" :
                            student.status === "good" ? "secondary" : "destructive"
                          }
                        >
                          {student.status === "excellent" ? "Excellent" :
                           student.status === "good" ? "Good" : "Needs Help"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="village" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
                <Button variant="sky" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="earth" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Course Settings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-3 py-2">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.student}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="shadow-card bg-gradient-warm text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Teaching Assistant
                </CardTitle>
                <CardDescription className="text-white/80">
                  Get help with course creation and student management
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
        variant="warm"
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

export default TeacherDashboard;