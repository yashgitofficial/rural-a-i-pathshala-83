import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen } from "lucide-react";

const LessonPage = () => {
  const { lessonId } = useParams();

  const lessonsData: Record<string, any> = {
    "1": {
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
    },
    "2": {
      title: "Plant Structure",
      course: "Science - Biology",
      teacher: "Ms. Sunita Devi",
      duration: "30 min",
      difficulty: "Easy",
      description: "Explore the fundamental structure of plants, including roots, stems, leaves, and their functions.",
      topics: [
        "Parts of a plant and their functions",
        "Root systems and types",
        "Stem structure and functions",
        "Leaf anatomy and photosynthesis",
        "Plant tissue types"
      ],
      learningOutcomes: [
        "Identify different parts of a plant",
        "Understand the function of roots, stems, and leaves",
        "Explain the process of photosynthesis",
        "Differentiate between types of root systems",
        "Recognize various plant tissues"
      ]
    },
    "3": {
      title: "Poetry Analysis",
      course: "Hindi Literature",
      teacher: "Mr. Ashok Pandey",
      duration: "35 min",
      difficulty: "Medium",
      description: "Learn to analyze and appreciate Hindi poetry through various literary devices and techniques.",
      topics: [
        "Understanding poetic devices (अलंकार)",
        "Rhythm and meter (छंद)",
        "Theme and meaning interpretation",
        "Poet's perspective and context",
        "Emotional expression in poetry"
      ],
      learningOutcomes: [
        "Identify poetic devices in Hindi poems",
        "Analyze the theme and meaning of poems",
        "Understand the poet's perspective",
        "Appreciate rhythmic patterns",
        "Express emotional interpretation of poetry"
      ]
    }
  };

  const lesson = lessonsData[lessonId || "1"] || lessonsData["1"];

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
