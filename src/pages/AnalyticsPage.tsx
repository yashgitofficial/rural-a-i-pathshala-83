import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock,
  FileText,
  Award,
  Download,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all");

  // Simulate real-time data updates
  const [realtimeStats, setRealtimeStats] = useState({
    assignmentsSubmitted: 45,
    coursesCompleted: 23,
    quizzesCompleted: 89,
    activeStudents: 134
  });

  useEffect(() => {
    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      setRealtimeStats(prev => ({
        assignmentsSubmitted: prev.assignmentsSubmitted + Math.floor(Math.random() * 3),
        coursesCompleted: prev.coursesCompleted + Math.floor(Math.random() * 2),
        quizzesCompleted: prev.quizzesCompleted + Math.floor(Math.random() * 4),
        activeStudents: 130 + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Assignment submissions data
  const assignmentData = [
    { week: "Week 1", submitted: 32, pending: 8, late: 3 },
    { week: "Week 2", submitted: 38, pending: 5, late: 2 },
    { week: "Week 3", submitted: 41, pending: 4, late: 1 },
    { week: "Week 4", submitted: 45, pending: 2, late: 1 },
  ];

  // Course completion data
  const courseCompletionData = [
    { course: "Biology", completed: 28, inProgress: 12 },
    { course: "Chemistry", completed: 22, inProgress: 15 },
    { course: "Physics", completed: 19, inProgress: 18 },
    { course: "Math", completed: 25, inProgress: 14 },
    { course: "English", completed: 30, inProgress: 10 },
  ];

  // Quiz performance data
  const quizPerformanceData = [
    { name: "Excellent (90-100%)", value: 35, color: "#10b981" },
    { name: "Good (75-89%)", value: 42, color: "#3b82f6" },
    { name: "Average (60-74%)", value: 28, color: "#f59e0b" },
    { name: "Needs Help (<60%)", value: 15, color: "#ef4444" },
  ];

  // Recent submissions
  const recentSubmissions = [
    { 
      student: "Priya Sharma", 
      type: "Assignment", 
      title: "Photosynthesis Lab Report", 
      score: 95, 
      time: "5 min ago",
      status: "excellent"
    },
    { 
      student: "Rahul Kumar", 
      type: "Quiz", 
      title: "Chemical Reactions Quiz", 
      score: 82, 
      time: "12 min ago",
      status: "good"
    },
    { 
      student: "Anjali Singh", 
      type: "Course", 
      title: "Biology Basics", 
      score: 100, 
      time: "23 min ago",
      status: "completed"
    },
    { 
      student: "Vikash Yadav", 
      type: "Assignment", 
      title: "Newton's Laws Essay", 
      score: 78, 
      time: "34 min ago",
      status: "good"
    },
    { 
      student: "Sneha Patel", 
      type: "Quiz", 
      title: "Algebra Fundamentals", 
      score: 65, 
      time: "1 hour ago",
      status: "average"
    },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-warm text-white p-4 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/teacher-dashboard")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Real-Time Analytics Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in-up">
          <Card className="shadow-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="animate-pulse">Live</Badge>
              </div>
              <p className="text-3xl font-bold text-primary">{realtimeStats.assignmentsSubmitted}</p>
              <p className="text-sm text-muted-foreground mt-1">Assignments Submitted</p>
              <p className="text-xs text-village-green mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-secondary" />
                <Badge variant="secondary" className="animate-pulse">Live</Badge>
              </div>
              <p className="text-3xl font-bold text-secondary">{realtimeStats.coursesCompleted}</p>
              <p className="text-sm text-muted-foreground mt-1">Courses Completed</p>
              <p className="text-xs text-village-green mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-sky-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-8 w-8 text-sky-blue" />
                <Badge variant="secondary" className="animate-pulse">Live</Badge>
              </div>
              <p className="text-3xl font-bold text-sky-blue">{realtimeStats.quizzesCompleted}</p>
              <p className="text-sm text-muted-foreground mt-1">Quizzes Completed</p>
              <p className="text-xs text-village-green mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15% this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card border-l-4 border-l-village-green">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-village-green" />
                <Badge variant="secondary" className="animate-pulse">Live</Badge>
              </div>
              <p className="text-3xl font-bold text-village-green">{realtimeStats.activeStudents}</p>
              <p className="text-sm text-muted-foreground mt-1">Active Students</p>
              <p className="text-xs text-village-green mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5% this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Assignment Submissions Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Assignment Submissions Trend
              </CardTitle>
              <CardDescription>Weekly submission statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={assignmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="submitted" fill="hsl(var(--primary))" name="Submitted" />
                  <Bar dataKey="pending" fill="hsl(var(--secondary))" name="Pending" />
                  <Bar dataKey="late" fill="#ef4444" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Completion Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-secondary" />
                Course Completion Status
              </CardTitle>
              <CardDescription>Student progress across courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseCompletionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="course" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="hsl(var(--village-green))" name="Completed" />
                  <Bar dataKey="inProgress" fill="hsl(var(--sky-blue))" name="In Progress" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quiz Performance Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-sky-blue" />
                Quiz Performance Distribution
              </CardTitle>
              <CardDescription>Student score ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={quizPerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {quizPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-village-green" />
                    Recent Submissions
                  </CardTitle>
                  <CardDescription>Live feed of student activities</CardDescription>
                </div>
                <Badge variant="secondary" className="animate-pulse">
                  Auto-updating
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
              {recentSubmissions.map((submission, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-smooth animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{submission.student}</p>
                      <p className="text-sm text-muted-foreground">{submission.title}</p>
                    </div>
                    <Badge variant={
                      submission.status === "excellent" ? "default" :
                      submission.status === "good" ? "secondary" :
                      submission.status === "completed" ? "default" : "outline"
                    }>
                      {submission.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {submission.type !== "Course" && (
                        <>
                          <span className="text-sm font-medium">Score:</span>
                          <Progress value={submission.score} className="w-20 h-2" />
                          <span className="text-sm font-semibold">{submission.score}%</span>
                        </>
                      )}
                      {submission.type === "Course" && (
                        <span className="text-sm font-medium text-village-green">✓ Completed</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{submission.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
