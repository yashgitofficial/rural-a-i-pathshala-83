import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const ClassSelectionPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const classes = [4, 5, 6, 7, 8, 9, 10];

  const handleClassSelect = (classNum: number) => {
    setSelectedClass(classNum);
    // Store selected class in localStorage
    localStorage.setItem("studentClass", classNum.toString());
    // Redirect to student dashboard
    setTimeout(() => {
      navigate("/student-dashboard");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col relative p-4">
      {/* Top Navigation */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-end mb-4">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GraduationCap className="h-12 w-12 text-white animate-gentle-bounce" />
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {t('classSelection.title', 'Select Your Class')}
              </h1>
            </div>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              {t('classSelection.description', 'Choose your current class to get personalized learning content')}
            </p>
          </div>

          {/* Class Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-5xl mx-auto">
            {classes.map((classNum) => (
              <Card
                key={classNum}
                className={`cursor-pointer transition-all duration-300 bg-card/95 backdrop-blur-sm border-2 hover:shadow-glow hover:scale-105 ${
                  selectedClass === classNum
                    ? "border-primary shadow-glow scale-105"
                    : "border-transparent"
                }`}
                onClick={() => handleClassSelect(classNum)}
              >
                <CardHeader className="text-center p-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-white">{classNum}</span>
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {t('classSelection.class', 'Class')} {classNum}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {t('classSelection.grade', 'Grade')} {classNum}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/80 text-sm">
              {t('classSelection.note', 'You can change your class anytime from settings')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSelectionPage;
