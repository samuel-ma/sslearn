"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Flag,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Eye,
  EyeOff,
  Share2,
  Download,
  Printer,
  BarChart,
  BookOpen,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Timer,
} from "lucide-react";
import confetti from "canvas-confetti";

// Sample exam data
const exams = {
  "ple-2022": {
    title: "PLE Mathematics 2022",
    description: "Primary Leaving Examination for Mathematics from 2022",
    country: "Uganda",
    type: "PLE",
    subject: "Mathematics",
    year: 2022,
    duration: "2 hours",
    difficulty: "Intermediate",
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is the value of 3/4 + 1/2?",
        options: ["1", "1 1/4", "1 1/2", "2"],
        correctAnswer: "1 1/4",
        explanation:
          "To add fractions with different denominators, find a common denominator. 3/4 = 6/8 and 1/2 = 4/8, so 3/4 + 1/2 = 6/8 + 4/8 = 10/8 = 1 2/8 = 1 1/4.",
      },
      {
        id: 2,
        question:
          "If a rectangle has a length of 8 cm and a width of 5 cm, what is its area?",
        options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
        correctAnswer: "40 cm²",
        explanation:
          "The area of a rectangle is calculated by multiplying length by width. Area = 8 cm × 5 cm = 40 cm².",
      },
      {
        id: 3,
        question: "What is the next number in the sequence: 2, 4, 8, 16, ...?",
        options: ["24", "32", "64", "128"],
        correctAnswer: "32",
        explanation:
          "This is a geometric sequence where each term is multiplied by 2 to get the next term. So, 16 × 2 = 32.",
      },
      {
        id: 4,
        question: "If 5x = 20, what is the value of x?",
        options: ["4", "5", "15", "25"],
        correctAnswer: "4",
        explanation:
          "To solve for x, divide both sides of the equation by 5: x = 20 ÷ 5 = 4.",
      },
      {
        id: 5,
        question: "What is the perimeter of a square with sides of 7 cm?",
        options: ["14 cm", "21 cm", "28 cm", "49 cm"],
        correctAnswer: "28 cm",
        explanation:
          "The perimeter of a square is calculated as 4 times the length of one side. Perimeter = 4 × 7 cm = 28 cm.",
      },
      {
        id: 6,
        question: "Which fraction is equivalent to 0.25?",
        options: ["1/2", "1/4", "2/5", "3/4"],
        correctAnswer: "1/4",
        explanation:
          "0.25 can be written as 25/100, which simplifies to 1/4 when divided by the common factor 25.",
      },
      {
        id: 7,
        question:
          "If a car travels at 60 km/h, how far will it travel in 2.5 hours?",
        options: ["120 km", "150 km", "180 km", "200 km"],
        correctAnswer: "150 km",
        explanation:
          "Distance = Speed × Time. Distance = 60 km/h × 2.5 h = 150 km.",
      },
      {
        id: 8,
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: "180°",
        explanation:
          "The sum of the interior angles in any triangle is always 180 degrees.",
      },
      {
        id: 9,
        question: "If 3/5 of a number is 24, what is the number?",
        options: ["30", "35", "40", "45"],
        correctAnswer: "40",
        explanation:
          "Let the number be x. Then 3/5 × x = 24. Multiply both sides by 5/3: x = 24 × 5/3 = 40.",
      },
      {
        id: 10,
        question: "What is the value of 2³?",
        options: ["6", "8", "9", "16"],
        correctAnswer: "8",
        explanation: "2³ means 2 multiplied by itself 3 times: 2 × 2 × 2 = 8.",
      },
    ],
  },
  "sat-2022": {
    title: "SAT Mathematics 2022",
    description: "Scholastic Assessment Test for Mathematics from 2022",
    country: "USA",
    type: "SAT",
    subject: "Mathematics",
    year: 2022,
    duration: "3 hours",
    difficulty: "Advanced",
    passingScore: 65,
    questions: [
      {
        id: 1,
        question: "If f(x) = 2x² + 3x - 5, what is f(2)?",
        options: ["3", "5", "7", "9"],
        correctAnswer: "7",
        explanation:
          "Substitute x = 2 into the function: f(2) = 2(2)² + 3(2) - 5 = 2(4) + 6 - 5 = 8 + 6 - 5 = 9 - 5 = 7.",
      },
      {
        id: 2,
        question: "Solve for x: 2x - 5 = 3x + 7",
        options: ["-12", "-2", "2", "12"],
        correctAnswer: "-12",
        explanation: "2x - 5 = 3x + 7\n2x - 3x = 7 + 5\n-x = 12\nx = -12",
      },
      {
        id: 3,
        question:
          "What is the slope of the line passing through points (2, 3) and (4, 7)?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2",
        explanation:
          "The slope is calculated using the formula (y₂ - y₁)/(x₂ - x₁). Slope = (7 - 3)/(4 - 2) = 4/2 = 2.",
      },
      {
        id: 4,
        question: "If the radius of a circle is 6 cm, what is its area?",
        options: ["12π cm²", "36π cm²", "72π cm²", "144π cm²"],
        correctAnswer: "36π cm²",
        explanation:
          "The area of a circle is calculated using the formula A = πr². Area = π × 6² = 36π cm².",
      },
      {
        id: 5,
        question: "What is the value of sin(30°)?",
        options: ["1/4", "1/3", "1/2", "√3/2"],
        correctAnswer: "1/2",
        explanation:
          "The sine of 30° is 1/2. This is a standard trigonometric value that should be memorized.",
      },
      {
        id: 6,
        question: "If log₁₀(x) = 2, what is x?",
        options: ["20", "100", "200", "1000"],
        correctAnswer: "100",
        explanation: "If log₁₀(x) = 2, then x = 10². Therefore, x = 100.",
      },
      {
        id: 7,
        question: "What is the solution to the equation x² - 4x - 5 = 0?",
        options: ["x = -1, 5", "x = 1, 5", "x = -1, -5", "x = 1, -5"],
        correctAnswer: "x = -1, 5",
        explanation:
          "Using the quadratic formula: x = (-b ± √(b² - 4ac))/2a where a=1, b=-4, c=-5.\nx = (4 ± √(16 + 20))/2 = (4 ± √36)/2 = (4 ± 6)/2\nSo x = 10/2 = 5 or x = -2/2 = -1",
      },
      {
        id: 8,
        question:
          "If a triangle has sides of lengths 3, 4, and 5, what is its area?",
        options: ["6", "7.5", "10", "12"],
        correctAnswer: "6",
        explanation:
          "This is a right triangle (3-4-5 triangle). The area can be calculated using A = (1/2) × base × height. Area = (1/2) × 3 × 4 = 6.",
      },
      {
        id: 9,
        question: "What is the value of 5! (5 factorial)?",
        options: ["25", "60", "120", "720"],
        correctAnswer: "120",
        explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120",
      },
      {
        id: 10,
        question:
          "If the probability of an event occurring is 0.3, what is the probability of it not occurring?",
        options: ["0.3", "0.7", "0.6", "1.3"],
        correctAnswer: "0.7",
        explanation:
          "The probability of an event not occurring is 1 minus the probability of it occurring. So, 1 - 0.3 = 0.7.",
      },
    ],
  },
  "ssple-2022": {
    title: "SSPLE Physics 2022",
    description:
      "Senior Secondary Primary Leaving Examination for Physics from 2022",
    country: "South Sudan",
    type: "SSPLE",
    subject: "Physics",
    year: 2022,
    duration: "2.5 hours",
    difficulty: "Advanced",
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: "Newton",
        explanation:
          "The SI unit of force is the Newton (N), named after Sir Isaac Newton.",
      },
      {
        id: 2,
        question: "Which of the following is a vector quantity?",
        options: ["Mass", "Time", "Velocity", "Temperature"],
        correctAnswer: "Velocity",
        explanation:
          "Velocity is a vector quantity because it has both magnitude (speed) and direction. Mass, time, and temperature are scalar quantities.",
      },
      {
        id: 3,
        question: "What is the formula for kinetic energy?",
        options: ["KE = mgh", "KE = 1/2mv²", "KE = Fd", "KE = mv"],
        correctAnswer: "KE = 1/2mv²",
        explanation:
          "The kinetic energy of an object is calculated using the formula KE = (1/2)mv², where m is the mass and v is the velocity.",
      },
      {
        id: 4,
        question:
          "Which law of motion states that for every action, there is an equal and opposite reaction?",
        options: ["First law", "Second law", "Third law", "Fourth law"],
        correctAnswer: "Third law",
        explanation:
          "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction.",
      },
      {
        id: 5,
        question: "What is the speed of light in vacuum?",
        options: ["3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s"],
        correctAnswer: "3 × 10⁸ m/s",
        explanation:
          "The speed of light in a vacuum is approximately 3 × 10⁸ meters per second (or 300,000,000 m/s).",
      },
      {
        id: 6,
        question: "Which of the following is a good conductor of electricity?",
        options: ["Rubber", "Glass", "Copper", "Plastic"],
        correctAnswer: "Copper",
        explanation:
          "Copper is a metal and an excellent conductor of electricity. Rubber, glass, and plastic are insulators.",
      },
      {
        id: 7,
        question: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: "Ohm",
        explanation:
          "The unit of electrical resistance is the Ohm (Ω), named after Georg Simon Ohm.",
      },
      {
        id: 8,
        question:
          "Which type of lens is used to correct myopia (nearsightedness)?",
        options: [
          "Convex lens",
          "Concave lens",
          "Bifocal lens",
          "Cylindrical lens",
        ],
        correctAnswer: "Concave lens",
        explanation:
          "A concave lens (diverging lens) is used to correct myopia (nearsightedness) because it helps focus light properly on the retina.",
      },
      {
        id: 9,
        question: "What is the formula for Ohm's law?",
        options: ["V = IR", "P = VI", "E = mc²", "F = ma"],
        correctAnswer: "V = IR",
        explanation:
          "Ohm's law states that the current through a conductor is directly proportional to the voltage and inversely proportional to the resistance. The formula is V = IR, where V is voltage, I is current, and R is resistance.",
      },
      {
        id: 10,
        question:
          "Which of the following is not a type of electromagnetic radiation?",
        options: ["X-rays", "Gamma rays", "Sound waves", "Ultraviolet rays"],
        correctAnswer: "Sound waves",
        explanation:
          "Sound waves are mechanical waves that require a medium to travel through, unlike electromagnetic waves which can travel through a vacuum. X-rays, gamma rays, and ultraviolet rays are all types of electromagnetic radiation.",
      },
    ],
  },
};

export default function ExamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAntiCheatWarning, setShowAntiCheatWarning] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showQuestionNav, setShowQuestionNav] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState("Student");

  const examContainerRef = useRef<HTMLDivElement>(null);
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const examId = params.id;
  const exam = exams[examId as keyof typeof exams];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // If exam doesn't exist, redirect to exams page
  useEffect(() => {
    if (!exam && !isLoading) {
      router.push("/exams");
    } else if (exam) {
      // Initialize answers array with nulls
      setAnswers(new Array(exam.questions.length).fill(null));
    }
  }, [exam, router, isLoading]);

  // Timer countdown
  useEffect(() => {
    if (examStarted && !isFinished && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished && examStarted) {
      finishExam();
    }
  }, [timeLeft, isFinished, examStarted]);

  // Anti-cheating: detect tab switching or window blur
  useEffect(() => {
    if (!examStarted || isFinished) return;

    const handleVisibilityChange = () => {
      if (document.hidden && examStarted && !isFinished) {
        // Clear any existing timeout
        if (visibilityTimeoutRef.current) {
          clearTimeout(visibilityTimeoutRef.current);
        }

        // Set a timeout to show the warning after a short delay
        // This prevents warnings for very brief focus losses
        visibilityTimeoutRef.current = setTimeout(() => {
          setShowAntiCheatWarning(true);
          setWarningCount((prev) => prev + 1);

          // Auto-finish exam after 3 warnings
          if (warningCount >= 2) {
            finishExam();
          }
        }, 500);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
    };
  }, [examStarted, isFinished, warningCount]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit
          </Button>
          <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="h-5 w-40 bg-muted animate-pulse rounded"></div>
            <div className="h-5 w-20 bg-muted animate-pulse rounded"></div>
          </div>

          <div className="h-4 w-full bg-muted animate-pulse rounded mb-6"></div>

          <div className="bg-card border rounded-lg mb-6 p-6">
            <div className="h-6 w-full bg-muted animate-pulse rounded mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-muted animate-pulse rounded-full"></div>
                  <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
            <div className="h-10 w-24 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!exam) {
    return null; // Will redirect in useEffect
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowExplanation(false);
    setShowQuestionNav(false);
  };

  const toggleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion)) {
      setFlaggedQuestions(
        flaggedQuestions.filter((q) => q !== currentQuestion),
      );
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion]);
    }
  };

  const startExam = () => {
    setExamStarted(true);
  };

  const finishExam = () => {
    setIsFinished(true);

    // Calculate score
    let correctAnswers = 0;
    exam.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round(
      (correctAnswers / exam.questions.length) * 100,
    );
    setScore(finalScore);

    // Show results
    setShowResults(true);

    // Trigger confetti if score is good
    if (finalScore >= exam.passingScore) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FFA500", "#FF4500"],
      });
    }
  };

  const getQuestionStatus = (index: number) => {
    if (answers[index]) {
      return "answered";
    } else if (flaggedQuestions.includes(index)) {
      return "flagged";
    } else {
      return "unanswered";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-green-500";
      case "flagged":
        return "bg-amber-500";
      default:
        return "bg-gray-300 dark:bg-gray-600";
    }
  };

  const question = exam.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;
  const isQuestionFlagged = flaggedQuestions.includes(currentQuestion);
  const isLastQuestion = currentQuestion === exam.questions.length - 1;
  const unansweredCount = answers.filter((a) => a === null).length;

  if (!examStarted) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{exam.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {exam.description}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  {exam.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <span>
                      <strong>Subject:</strong> {exam.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>
                      <strong>Year:</strong> {exam.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>
                      <strong>Country:</strong> {exam.country}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>
                      <strong>Questions:</strong> {exam.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>
                      <strong>Duration:</strong> {exam.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-muted-foreground" />
                    <span>
                      <strong>Passing Score:</strong> {exam.passingScore}%
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Exam Rules
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>You have {formatTime(timeLeft)} to complete this exam</li>
                  <li>
                    Do not leave the exam page or switch tabs during the exam
                  </li>
                  <li>You can flag questions to review later</li>
                  <li>
                    Once you finish the exam, you cannot retake it immediately
                  </li>
                  <li>
                    You need {exam.passingScore}% or higher to pass this exam
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={startExam} className="w-full">
                Start Exam
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/exams")}
                className="w-full"
              >
                Back to Exams
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-20" ref={examContainerRef}>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={() => setShowExitDialog(true)}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
        <h1 className="text-2xl font-bold">{exam.title}</h1>
      </div>

      {!showResults ? (
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-2"
                onClick={() => setShowQuestionNav(!showQuestionNav)}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Questions
              </Button>
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {exam.questions.length}
              </span>
            </div>
            <div className="flex items-center">
              <Button
                variant={isQuestionFlagged ? "secondary" : "ghost"}
                size="sm"
                onClick={toggleFlagQuestion}
                className="mr-2"
              >
                <Flag
                  className={`h-4 w-4 ${isQuestionFlagged ? "text-amber-500" : "text-muted-foreground"}`}
                />
                <span className="ml-1 sr-only md:not-sr-only">
                  {isQuestionFlagged ? "Unflag" : "Flag"}
                </span>
              </Button>
              <div className="flex items-center text-sm font-medium">
                <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
                <span
                  className={
                    timeLeft < 60
                      ? "text-red-500 animate-pulse"
                      : timeLeft < 180
                        ? "text-amber-500"
                        : ""
                  }
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          <Progress value={progress} className="mb-6" />

          {showQuestionNav && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 bg-card border rounded-lg p-4 overflow-hidden"
            >
              <h3 className="font-medium mb-3">Question Navigator</h3>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <Button
                      key={index}
                      variant={
                        currentQuestion === index ? "default" : "outline"
                      }
                      size="sm"
                      className={`relative ${currentQuestion === index ? "" : "border-2"}`}
                      onClick={() => goToQuestion(index)}
                    >
                      <span>{index + 1}</span>
                      <span
                        className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(status)}`}
                      ></span>
                    </Button>
                  );
                })}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  Answered: {answers.filter((a) => a !== null).length}
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-1"></span>
                  Flagged: {flaggedQuestions.length}
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mr-1"></span>
                  Unanswered: {unansweredCount}
                </div>
              </div>
            </motion.div>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent/50 transition-colors"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-grow cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div>
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              {!isLastQuestion && (
                <Button onClick={goToNextQuestion}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            {isLastQuestion && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={finishExam}
                      className={
                        unansweredCount > 0
                          ? "bg-amber-500 hover:bg-amber-600"
                          : ""
                      }
                    >
                      Finish Exam
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {unansweredCount > 0
                      ? `Warning: You have ${unansweredCount} unanswered questions`
                      : "Submit your exam for grading"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          {showCertificate && score >= exam.passingScore ? (
            <Card className="border-4 border-primary/20 mb-6">
              <CardHeader className="text-center border-b">
                <div className="mx-auto mb-4">
                  <Award className="h-16 w-16 text-primary mx-auto" />
                </div>
                <CardTitle className="text-3xl">
                  Certificate of Achievement
                </CardTitle>
                <CardDescription className="text-lg">
                  This certifies that
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <h2 className="text-2xl font-bold mb-6">{userName}</h2>
                <p className="text-lg mb-2">has successfully completed the</p>
                <p className="text-xl font-semibold mb-6">{exam.title}</p>
                <p className="text-lg mb-2">with a score of</p>
                <p className="text-3xl font-bold text-primary mb-6">{score}%</p>
                <div className="text-sm text-muted-foreground">
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <p>
                    Certificate ID:{" "}
                    {Math.random().toString(36).substring(2, 12).toUpperCase()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center space-x-4 border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCertificate(false)}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Results
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Exam Results</CardTitle>
                <CardDescription>
                  You have completed the {exam.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative mb-6">
                    <div className="text-6xl font-bold">{score}%</div>
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                      {score >= exam.passingScore ? (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          PASSED
                        </Badge>
                      ) : (
                        <Badge variant="destructive">FAILED</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-lg mb-6">
                    {score >= exam.passingScore ? (
                      <span className="text-green-500">
                        Congratulations! You passed the exam.
                      </span>
                    ) : (
                      <span className="text-amber-500">
                        You need more practice. The passing score is{" "}
                        {exam.passingScore}%.
                      </span>
                    )}
                  </div>

                  <div className="w-full max-w-md">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      Question Summary
                    </h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {exam.questions.map((q, index) => {
                        const isCorrect = answers[index] === q.correctAnswer;
                        return (
                          <div
                            key={q.id}
                            className={`p-4 rounded-lg ${isCorrect ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}
                          >
                            <div className="flex items-start">
                              <div className="mr-2 mt-0.5">
                                {isCorrect ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                )}
                              </div>
                              <div className="w-full">
                                <p className="font-medium">{q.question}</p>
                                <p className="text-sm mt-1">
                                  Your answer:{" "}
                                  <span
                                    className={
                                      isCorrect
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }
                                  >
                                    {answers[index] || "Not answered"}
                                  </span>
                                </p>
                                {!isCorrect && (
                                  <p className="text-sm mt-1">
                                    Correct answer:{" "}
                                    <span className="text-green-600 dark:text-green-400">
                                      {q.correctAnswer}
                                    </span>
                                  </p>
                                )}

                                <div className="mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs p-0 h-auto"
                                    onClick={() => {
                                      setCurrentQuestion(index);
                                      setShowExplanation(
                                        !showExplanation &&
                                          currentQuestion === index
                                          ? false
                                          : true,
                                      );
                                    }}
                                  >
                                    {showExplanation &&
                                    currentQuestion === index ? (
                                      <>
                                        <EyeOff className="h-3 w-3 mr-1" />
                                        Hide Explanation
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="h-3 w-3 mr-1" />
                                        Show Explanation
                                      </>
                                    )}
                                  </Button>
                                </div>

                                {showExplanation &&
                                  currentQuestion === index && (
                                    <div className="mt-2 text-sm bg-background p-3 rounded border">
                                      <p className="font-medium mb-1">
                                        Explanation:
                                      </p>
                                      <p>{q.explanation}</p>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={() => router.push("/exams")}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Exams
                </Button>
                <Button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers(new Array(exam.questions.length).fill(null));
                    setTimeLeft(600);
                    setIsFinished(false);
                    setShowResults(false);
                    setFlaggedQuestions([]);
                    setExamStarted(true);
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Retry Exam
                </Button>
                {score >= exam.passingScore && (
                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setShowCertificate(true)}
                  >
                    <Award className="h-4 w-4 mr-1" />
                    View Certificate
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/exams")}>
              Exit Exam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showAntiCheatWarning}
        onOpenChange={setShowAntiCheatWarning}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Anti-Cheating Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have left the exam tab or window. This is considered a
              violation of exam rules.
              {warningCount >= 2 &&
                " This is your final warning. One more violation will end your exam automatically."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAntiCheatWarning(false)}>
              I Understand
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}