import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Home, CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const QuickQuizPage = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      correctAnswer: "New Delhi"
    },
    {
      question: "How many sides does a triangle have?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "3"
    },
    {
      question: "What is 5 + 7?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12"
    }
  ];

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero text-white p-4 shadow-soft">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">Quick Quiz Results</h1>
            <Link to="/student-dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-6">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Quiz Completed! 🎉</CardTitle>
              <CardDescription className="text-lg">
                Your Score: {score} out of {questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">
                  {percentage.toFixed(0)}%
                </div>
                <Progress value={percentage} className="h-3 mb-6" />
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground">
                            Your answer: <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                              {selectedAnswers[index] || "Not answered"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-green-600 font-medium">
                              Correct answer: {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Link to="/student-dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                <Button variant="hero" onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                  setShowResults(false);
                }}>
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white p-4 shadow-soft">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quick Quiz</h1>
          <Link to="/student-dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
              <span className="text-sm text-muted-foreground">{progress.toFixed(0)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
              <RadioGroup
                value={selectedAnswers[currentQuestion]}
                onValueChange={handleAnswerSelect}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-smooth cursor-pointer">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion]}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickQuizPage;
