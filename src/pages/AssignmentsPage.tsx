import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  FileText, 
  Plus, 
  Trash2,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const AssignmentsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [totalPoints, setTotalPoints] = useState(100);

  // Mock data for now (will be replaced with real data from Supabase)
  const assignments = [
    {
      id: "1",
      title: "Photosynthesis Lab Report",
      description: "Write a detailed report on the photosynthesis experiment",
      course_name: "Biology Class 9",
      due_date: "2025-01-25T23:59:00Z",
      total_points: 100,
      submissions_count: 28,
      total_students: 34,
      created_at: "2025-01-10T10:00:00Z"
    },
    {
      id: "2",
      title: "Chemical Reactions Essay",
      description: "Explain different types of chemical reactions with examples",
      course_name: "Chemistry Basics",
      due_date: "2025-01-30T23:59:00Z",
      total_points: 50,
      submissions_count: 15,
      total_students: 28,
      created_at: "2025-01-12T14:00:00Z"
    }
  ];

  const recentSubmissions = [
    {
      id: "1",
      student_name: "Priya Sharma",
      assignment_title: "Photosynthesis Lab Report",
      score: 95,
      status: "graded",
      submitted_at: "2025-01-15T10:30:00Z"
    },
    {
      id: "2",
      student_name: "Rahul Kumar",
      assignment_title: "Photosynthesis Lab Report",
      score: null,
      status: "pending",
      submitted_at: "2025-01-16T14:20:00Z"
    },
    {
      id: "3",
      student_name: "Anjali Singh",
      assignment_title: "Chemical Reactions Essay",
      score: null,
      status: "pending",
      submitted_at: "2025-01-17T09:15:00Z"
    }
  ];

  const handleCreateAssignment = async () => {
    if (!title || !courseName || !dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to create assignments",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('assignments')
        .insert({
          title,
          description,
          course_name: courseName,
          due_date: dueDate,
          total_points: totalPoints,
          created_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Assignment created successfully",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setCourseName("");
      setDueDate("");
      setTotalPoints(100);
      setIsCreateDialogOpen(false);
      
    } catch (error) {
      console.error('Error creating assignment:', error);
      toast({
        title: "Error",
        description: "Failed to create assignment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Graded</Badge>;
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "late":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Late</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
            <h1 className="text-2xl font-bold">Assignments Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Assignment</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new assignment for your students
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Photosynthesis Lab Report"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="course">Course Name *</Label>
                    <Input
                      id="course"
                      placeholder="e.g., Biology Class 9"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide instructions and requirements for the assignment..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date *</Label>
                      <Input
                        id="dueDate"
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="points">Total Points</Label>
                      <Input
                        id="points"
                        type="number"
                        min="1"
                        value={totalPoints}
                        onChange={(e) => setTotalPoints(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAssignment} disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Assignment"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Assignments</p>
                  <p className="text-3xl font-bold text-primary">{assignments.length}</p>
                </div>
                <FileText className="h-10 w-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold text-secondary">
                    {recentSubmissions.filter(s => s.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-10 w-10 text-secondary opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Graded This Week</p>
                  <p className="text-3xl font-bold text-village-green">
                    {recentSubmissions.filter(s => s.status === "graded").length}
                  </p>
                </div>
                <CheckCircle className="h-10 w-10 text-village-green opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Assignments List */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Active Assignments
                </CardTitle>
                <CardDescription>
                  Manage your course assignments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.map((assignment) => {
                  const submissionRate = Math.round((assignment.submissions_count / assignment.total_students) * 100);
                  
                  return (
                    <div key={assignment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <BookOpen className="h-4 w-4" />
                              {assignment.course_name}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              Due: {format(new Date(assignment.due_date), 'MMM dd, yyyy')}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {assignment.submissions_count}/{assignment.total_students} submitted
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Submission Rate</span>
                          <span className="font-medium">{submissionRate}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${submissionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-village-green" />
                  Recent Submissions
                </CardTitle>
                <CardDescription>
                  Latest student submissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="p-3 rounded-lg border bg-card hover:shadow-md transition-smooth">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{submission.student_name}</p>
                        <p className="text-xs text-muted-foreground">{submission.assignment_title}</p>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {format(new Date(submission.submitted_at), 'MMM dd, h:mm a')}
                      </span>
                      {submission.score !== null && (
                        <span className="font-semibold text-primary">{submission.score}/100</span>
                      )}
                    </div>
                    {submission.status === "pending" && (
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Grade Submission
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;
