import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen } from "lucide-react";

const LessonPage = () => {
  const lesson = {
    title: "Algebra Basics",
    course: "Mathematics - Class 8",
    teacher: "Mr. Rajesh Kumar",
    duration: "45 min",
    difficulty: "Medium",
    description: "Introduction to fundamental algebraic concepts including variables, expressions, and basic equations.",
    topics: [
      "Understanding variables and constants",
      "Algebraic expressions and terms",
      "Simplifying expressions",
      "Introduction to equations",
      "Solving simple linear equations"
    ],
    learningOutcomes: [
      "Identify and work with algebraic variables",
      "Write and simplify algebraic expressions",
      "Understand the concept of equations",
      "Solve basic linear equations step by step",
      "Apply algebraic thinking to real-world problems"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white p-4 shadow-soft">
        <div className="max-w-5xl mx-auto">
          <Link to="/student-dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-white/90">{lesson.course} • {lesson.teacher}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {lesson.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Video Player */}
        <Card className="shadow-card overflow-hidden">
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group cursor-pointer hover:from-primary/30 hover:to-secondary/30 transition-smooth">
            {/* Video Thumbnail Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
            
            {/* Play Button */}
            <div className="relative z-10 bg-white rounded-full p-8 shadow-glow group-hover:scale-110 transition-smooth">
              <Play className="h-16 w-16 text-primary fill-primary" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold text-foreground">Lesson 1</p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Topics Covered */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Topics Covered
              </CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lesson.topics.map((topic, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm">{topic}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-secondary" />
                Learning Outcomes
              </CardTitle>
              <CardDescription>What you'll be able to do after this lesson</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lesson.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{outcome}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="hero" size="lg" className="flex-1">
            <Play className="h-5 w-5 mr-2" />
            Start Lesson
          </Button>
          <Button variant="outline" size="lg">
            Download Notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
