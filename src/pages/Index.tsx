import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePine, BookOpen, Users, Brain, Star, ArrowRight, Play, MessageCircle, Trophy, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import heroImage from "@/assets/hero-village-learning.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Interactive Courses",
      description: "Learn with videos, documents, and hands-on activities designed for rural contexts"
    },
    {
      icon: <Brain className="h-8 w-8 text-secondary" />,
      title: "AI-Powered Learning",
      description: "Get personalized help and answers to your questions 24/7 with our smart chatbot"
    },
    {
      icon: <Users className="h-8 w-8 text-village-green" />,
      title: "Community Driven",
      description: "Connect with teachers and students from rural communities across the region"
    },
    {
      icon: <Globe className="h-8 w-8 text-sky-blue" />,
      title: "Local Language Support",
      description: "Learn in both English and your local language for better understanding"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Learning", icon: "👩‍🎓" },
    { number: "500+", label: "Expert Teachers", icon: "👨‍🏫" },
    { number: "100+", label: "Courses Available", icon: "📚" },
    { number: "50+", label: "Villages Connected", icon: "🏘️" }
  ];

  const popularCourses = [
    {
      title: "Mathematics Class 8",
      teacher: "Mr. Rajesh Kumar",
      students: 156,
      rating: 4.8,
      image: "🔢",
      level: "Class 8"
    },
    {
      title: "Science Biology",
      teacher: "Ms. Sunita Devi", 
      students: 203,
      rating: 4.9,
      image: "🌱",
      level: "Class 9"
    },
    {
      title: "Agriculture & Farming",
      teacher: "Dr. Ramesh Yadav",
      students: 267,
      rating: 4.9,
      image: "🌾",
      level: "Intermediate"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          {/* Language Switcher */}
          <div className="absolute top-4 right-4">
            <LanguageSwitcher />
          </div>
          
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <TreePine className="h-16 w-16 text-white animate-gentle-bounce" />
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-2">
                  नभा
                </h1>
                <p className="text-xl md:text-2xl opacity-90 font-medium">
                  {t('hero.title')}
                </p>
              </div>
            </div>

            <h2 className="text-2xl md:text-4xl font-semibold mb-6">
              {t('hero.subtitle')}
            </h2>
            
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="default" 
                size="xl" 
                onClick={() => navigate("/auth")}
                className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm shadow-xl border border-white/20 transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full"
              >
                <Play className="h-5 w-5 mr-2" />
                {t('auth.login.submit')} - Student
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="bg-amber-600/90 hover:bg-amber-700 text-white border-white/30 backdrop-blur-sm shadow-xl transition-all duration-300 px-8 py-4 text-lg font-medium rounded-full"
                onClick={() => navigate("/auth")}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                {t('auth.login.submit')} - Educator
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Nabha?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges of rural education and have built a platform that truly works for your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-card hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-card rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Courses
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of students already learning with these top-rated courses
              </p>
            </div>
            <Button variant="hero" onClick={() => navigate("/courses")}>
              View All Courses
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-card transition-smooth cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{course.image}</div>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-smooth">
                    {course.title}
                  </CardTitle>
                  <CardDescription>by {course.teacher}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-warm text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Join the Nabha community today and discover the power of AI-enhanced rural education. 
            Whether you're a student eager to learn or a teacher ready to inspire, we're here for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => navigate("/auth")}
            >
              <Users className="h-5 w-5 mr-2" />
              Join as Student
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={() => navigate("/auth")}
            >
              <Trophy className="h-5 w-5 mr-2" />
              Join as Teacher
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <TreePine className="h-8 w-8" />
                <h3 className="text-2xl font-bold">नभा Nabha</h3>
              </div>
              <p className="mb-4 opacity-90">
                Empowering rural communities through accessible, AI-enhanced education. 
                Building bridges between traditional wisdom and modern learning.
              </p>
              <Button variant="secondary">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="/courses" className="hover:underline">Browse Courses</a></li>
                <li><a href="/auth" className="hover:underline">Sign Up</a></li>
                <li><a href="#" className="hover:underline">Mobile App</a></li>
                <li><a href="#" className="hover:underline">Study Tips</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Teachers</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="/auth" className="hover:underline">Teacher Portal</a></li>
                <li><a href="#" className="hover:underline">Create Course</a></li>
                <li><a href="#" className="hover:underline">Resources</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-75">
            <p>&copy; 2024 Nabha Rural Learning Platform. Made with ❤️ for rural communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
