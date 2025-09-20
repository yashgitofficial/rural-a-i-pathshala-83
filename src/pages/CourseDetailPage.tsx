import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, FileText, Brain, CheckCircle, Clock, Users, Star, MessageCircle, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatBot } from "@/components/ChatBot";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [showChatBot, setShowChatBot] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: string}>({});

  // Mock course data
  const course = {
    id: courseId,
    title: "Mathematics - Class 8",
    teacher: "Mr. Rajesh Kumar",
    description: "Master fundamental math concepts including algebra, geometry, and problem-solving techniques designed for rural students.",
    category: "Mathematics",
    level: "Class 8",
    duration: "6 weeks",
    totalLessons: 24,
    completedLessons: 8,
    students: 156,
    rating: 4.8,
    difficulty: "Medium",
    image: "🔢",
    progress: 33
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to Algebra",
      type: "video",
      duration: "15 min",
      completed: true,
      description: "Learn the basics of algebra with real-world examples from rural contexts."
    },
    {
      id: 2,
      title: "Solving Linear Equations",
      type: "video",
      duration: "20 min",
      completed: true,
      description: "Step-by-step guide to solving equations using village marketplace examples."
    },
    {
      id: 3,
      title: "Practice Problems - Set 1",
      type: "document",
      duration: "10 min",
      completed: true,
      description: "Practice problems based on farming and daily life scenarios."
    },
    {
      id: 4,
      title: "Geometry Fundamentals",
      type: "video",
      duration: "18 min",
      completed: false,
      description: "Understanding shapes and measurements in rural architecture."
    },
    {
      id: 5,
      title: "Area and Perimeter",
      type: "video",
      duration: "22 min",
      completed: false,
      description: "Calculate areas of fields and perimeters of land plots."
    },
    {
      id: 6,
      title: "Quick Quiz - Geometry",
      type: "quiz",
      duration: "15 min",
      completed: false,
      description: "Test your understanding of geometry concepts."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "If a rectangular field is 20 meters long and 15 meters wide, what is its area?",
      options: ["300 square meters", "280 square meters", "320 square meters", "350 square meters"],
      correct: "300 square meters"
    },
    {
      id: 2,
      question: "What is the perimeter of the same field?",
      options: ["60 meters", "70 meters", "80 meters", "50 meters"],
      correct: "70 meters"
    },
    {
      id: 3,
      question: "In the equation 2x + 5 = 15, what is the value of x?",
      options: ["3", "5", "7", "10"],
      correct: "5"
    }
  ];

  const handleQuizSubmit = () => {
    const score = quizQuestions.reduce((acc, question) => {
      return acc + (quizAnswers[question.id] === question.correct ? 1 : 0);
    }, 0);
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    alert(`Great job! You scored ${score}/${quizQuestions.length} (${percentage}%). ${percentage >= 70 ? 'Excellent work! 🎉' : 'Keep practicing! 💪'}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4 shadow-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{course.image}</span>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                  <p className="opacity-90">by {course.teacher}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm opacity-90">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
                <Badge variant="secondary">{course.difficulty}</Badge>
                <Badge variant="outline" className="text-white border-white/30">
                  {course.level}
                </Badge>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Your Progress</span>
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            </div>
            <Progress value={course.progress} className="h-2 bg-white/20" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="lessons" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lessons" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Lessons
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Quick Quiz
                </TabsTrigger>
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Ask AI
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Course Lessons</CardTitle>
                    <CardDescription>
                      Follow the lessons in order for the best learning experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`border rounded-lg p-4 transition-smooth cursor-pointer ${
                          currentLesson === index ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setCurrentLesson(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.completed ? 'bg-village-green text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                              {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold">{lesson.title}</h3>
                              <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {lesson.type === 'video' && <Play className="h-3 w-3 mr-1" />}
                              {lesson.type === 'document' && <FileText className="h-3 w-3 mr-1" />}
                              {lesson.type === 'quiz' && <Brain className="h-3 w-3 mr-1" />}
                              {lesson.type}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Current Lesson Player */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>{lessons[currentLesson]?.title}</CardTitle>
                    <CardDescription>{lessons[currentLesson]?.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg aspect-video flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          {lessons[currentLesson]?.type === 'video' ? 'Video content would play here' :
                           lessons[currentLesson]?.type === 'document' ? 'Document content would display here' :
                           'Interactive quiz would appear here'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="hero" className="flex-1">
                        {lessons[currentLesson]?.type === 'video' ? 'Play Video' :
                         lessons[currentLesson]?.type === 'document' ? 'Read Document' :
                         'Start Quiz'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="space-y-4">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Quick Knowledge Check</CardTitle>
                    <CardDescription>
                      Test your understanding of the concepts covered so far
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {quizQuestions.map((question, index) => (
                      <div key={question.id} className="space-y-3">
                        <h3 className="font-semibold">
                          {index + 1}. {question.question}
                        </h3>
                        <div className="grid gap-2">
                          {question.options.map((option, optionIndex) => (
                            <label
                              key={optionIndex}
                              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth"
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                onChange={(e) => setQuizAnswers({
                                  ...quizAnswers,
                                  [question.id]: e.target.value
                                })}
                                className="text-primary"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="hero" 
                      className="w-full" 
                      onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    >
                      Submit Quiz
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Course-Specific AI Assistant</CardTitle>
                    <CardDescription>
                      Get help with this specific course content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MessageCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Get personalized help with {course.title}
                      </p>
                      <Button variant="hero" onClick={() => setShowChatBot(true)}>
                        Start Conversation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Lessons</span>
                  <span className="font-medium">{course.totalLessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <Badge variant="outline">{course.difficulty}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="font-medium">{course.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Teacher</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white text-xl">
                    👨‍🏫
                  </div>
                  <div>
                    <h3 className="font-semibold">{course.teacher}</h3>
                    <p className="text-sm text-muted-foreground">Mathematics Expert</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Experienced educator specializing in rural mathematics education with 15+ years of teaching experience.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Teacher
                </Button>
              </CardContent>
            </Card>

            {/* Related Courses */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Related Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border rounded-lg p-3 hover:bg-muted/50 transition-smooth cursor-pointer">
                  <h4 className="font-medium text-sm">Mathematics - Class 9</h4>
                  <p className="text-xs text-muted-foreground">Continue your math journey</p>
                </div>
                <div className="border rounded-lg p-3 hover:bg-muted/50 transition-smooth cursor-pointer">
                  <h4 className="font-medium text-sm">Physics Basics</h4>
                  <p className="text-xs text-muted-foreground">Apply math to science</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ChatBot Component */}
      <ChatBot isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
    </div>
  );
};

export default CourseDetailPage;