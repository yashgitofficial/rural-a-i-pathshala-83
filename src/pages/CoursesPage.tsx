import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, Users, Star, Search, Filter, ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const CoursesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Mathematics - Class 8",
      teacher: "Mr. Rajesh Kumar",
      description: "Master fundamental math concepts including algebra, geometry, and problem-solving techniques designed for rural students.",
      category: "Mathematics",
      level: "Class 8",
      duration: "6 weeks",
      lessons: 24,
      students: 156,
      rating: 4.8,
      difficulty: "Medium",
      status: "popular",
      image: "🔢"
    },
    {
      id: 2,
      title: "Science - Biology Basics",
      teacher: "Ms. Sunita Devi",
      description: "Explore the fascinating world of life sciences with practical examples from rural environments and local ecosystems.",
      category: "Science",
      level: "Class 9",
      duration: "8 weeks",
      lessons: 32,
      students: 203,
      rating: 4.9,
      difficulty: "Easy",
      status: "new",
      image: "🌱"
    },
    {
      id: 3,
      title: "Hindi Literature",
      teacher: "Mr. Ashok Pandey",
      description: "Dive deep into Hindi poetry, stories, and grammar with cultural context that resonates with rural traditions.",
      category: "Language",
      level: "Class 10",
      duration: "10 weeks",
      lessons: 28,
      students: 89,
      rating: 4.7,
      difficulty: "Medium",
      status: "trending",
      image: "📚"
    },
    {
      id: 4,
      title: "Environmental Science",
      teacher: "Dr. Priya Sharma",
      description: "Learn about environmental conservation, sustainability, and how rural communities can lead in protecting nature.",
      category: "Science",
      level: "Class 11",
      duration: "5 weeks",
      lessons: 20,
      students: 134,
      rating: 4.6,
      difficulty: "Easy",
      status: "popular",
      image: "🌍"
    },
    {
      id: 5,
      title: "Computer Basics",
      teacher: "Mr. Vikash Singh",
      description: "Introduction to computers, internet, and digital literacy designed specifically for first-time users in rural areas.",
      category: "Technology",
      level: "Beginner",
      duration: "4 weeks",
      lessons: 16,
      students: 78,
      rating: 4.5,
      difficulty: "Easy",
      status: "new",
      image: "💻"
    },
    {
      id: 6,
      title: "Agriculture & Farming",
      teacher: "Dr. Ramesh Yadav",
      description: "Modern farming techniques, crop management, and sustainable agriculture practices for rural communities.",
      category: "Agriculture",
      level: "Intermediate",
      duration: "12 weeks",
      lessons: 40,
      students: 267,
      rating: 4.9,
      difficulty: "Medium",
      status: "popular",
      image: "🌾"
    }
  ];

  const categories = ["all", "Mathematics", "Science", "Language", "Technology", "Agriculture"];
  const levels = ["all", "Beginner", "Class 8", "Class 9", "Class 10", "Class 11", "Intermediate"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-village-green text-white";
      case "popular": return "bg-secondary text-secondary-foreground";
      case "trending": return "bg-sky-blue text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-village-green";
      case "Medium": return "text-secondary";
      case "Hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{t('courses.title')}</h1>
                <p className="opacity-90">Discover knowledge that empowers rural communities</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, teachers, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-card transition-smooth cursor-pointer group">
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl mb-2">{course.image}</div>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
                
                <CardTitle className="group-hover:text-primary transition-smooth">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  by {course.teacher}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>

                <Button 
                  variant="hero" 
                  className="w-full group-hover:shadow-glow transition-smooth"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more courses.
            </p>
            <Button variant="hero" onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedLevel("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;