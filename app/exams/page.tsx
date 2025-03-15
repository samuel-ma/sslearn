"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ExamCard } from "@/components/ExamCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  BookOpen,
  GraduationCap,
  Clock,
  Calendar,
  Sparkles,
  BarChart,
  TrendingUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample exam data with additional fields
const exams = [
  {
    id: "ple-2022",
    title: "PLE Mathematics 2022",
    description: "Primary Leaving Examination for Mathematics from 2022",
    country: "Uganda",
    type: "PLE",
    subject: "Mathematics",
    year: 2022,
    questions: 10,
    duration: "2 hours",
    difficulty: "Intermediate",
    popularity: 95,
    passingRate: 68,
    featured: true,
    level: "Primary",
    educationSystem: "Primary",
  },
  {
    id: "ple-2021",
    title: "PLE Science 2021",
    description: "Primary Leaving Examination for Science from 2021",
    country: "Uganda",
    type: "PLE",
    subject: "Science",
    year: 2021,
    questions: 10,
    duration: "2 hours",
    difficulty: "Intermediate",
    popularity: 87,
    passingRate: 72,
    featured: false,
    level: "Primary",
    educationSystem: "Primary",
  },
  {
    id: "sat-2022",
    title: "SAT Mathematics 2022",
    description: "Scholastic Assessment Test for Mathematics from 2022",
    country: "USA",
    type: "SAT",
    subject: "Mathematics",
    year: 2022,
    questions: 10,
    duration: "3 hours",
    difficulty: "Advanced",
    popularity: 98,
    passingRate: 65,
    featured: true,
    level: "High School",
    educationSystem: "Secondary",
  },
  {
    id: "sat-2021",
    title: "SAT English 2021",
    description: "Scholastic Assessment Test for English from 2021",
    country: "USA",
    type: "SAT",
    subject: "English",
    year: 2021,
    questions: 10,
    duration: "3 hours",
    difficulty: "Advanced",
    popularity: 92,
    passingRate: 70,
    featured: false,
    level: "High School",
    educationSystem: "Secondary",
  },
  {
    id: "ssple-2022",
    title: "SSPLE Physics 2022",
    description:
      "Senior Secondary Primary Leaving Examination for Physics from 2022",
    country: "South Sudan",
    type: "SSPLE",
    subject: "Physics",
    year: 2022,
    questions: 10,
    duration: "2.5 hours",
    difficulty: "Advanced",
    popularity: 85,
    passingRate: 62,
    featured: true,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "ssple-2021",
    title: "SSPLE Chemistry 2021",
    description:
      "Senior Secondary Primary Leaving Examination for Chemistry from 2021",
    country: "South Sudan",
    type: "SSPLE",
    subject: "Chemistry",
    year: 2021,
    questions: 10,
    duration: "2.5 hours",
    difficulty: "Advanced",
    popularity: 80,
    passingRate: 58,
    featured: false,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "kcse-2022",
    title: "KCSE Mathematics 2022",
    description:
      "Kenya Certificate of Secondary Education for Mathematics from 2022",
    country: "Kenya",
    type: "KCSE",
    subject: "Mathematics",
    year: 2022,
    questions: 10,
    duration: "2 hours",
    difficulty: "Advanced",
    popularity: 90,
    passingRate: 67,
    featured: true,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "kcse-2021",
    title: "KCSE Biology 2021",
    description:
      "Kenya Certificate of Secondary Education for Biology from 2021",
    country: "Kenya",
    type: "KCSE",
    subject: "Biology",
    year: 2021,
    questions: 10,
    duration: "2 hours",
    difficulty: "Advanced",
    popularity: 88,
    passingRate: 71,
    featured: false,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "igcse-2022",
    title: "IGCSE Mathematics 2022",
    description:
      "International General Certificate of Secondary Education for Mathematics",
    country: "International",
    type: "IGCSE",
    subject: "Mathematics",
    year: 2022,
    questions: 12,
    duration: "2.5 hours",
    difficulty: "Intermediate",
    popularity: 94,
    passingRate: 75,
    featured: true,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "igcse-2021",
    title: "IGCSE Physics 2021",
    description:
      "International General Certificate of Secondary Education for Physics",
    country: "International",
    type: "IGCSE",
    subject: "Physics",
    year: 2021,
    questions: 12,
    duration: "2.5 hours",
    difficulty: "Intermediate",
    popularity: 89,
    passingRate: 72,
    featured: false,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "waec-2022",
    title: "WAEC Mathematics 2022",
    description: "West African Examinations Council Mathematics Examination",
    country: "Nigeria",
    type: "WAEC",
    subject: "Mathematics",
    year: 2022,
    questions: 15,
    duration: "3 hours",
    difficulty: "Intermediate",
    popularity: 91,
    passingRate: 68,
    featured: true,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "waec-2021",
    title: "WAEC English 2021",
    description:
      "West African Examinations Council English Language Examination",
    country: "Ghana",
    type: "WAEC",
    subject: "English",
    year: 2021,
    questions: 15,
    duration: "3 hours",
    difficulty: "Intermediate",
    popularity: 87,
    passingRate: 74,
    featured: false,
    level: "Secondary",
    educationSystem: "Secondary",
  },
  {
    id: "kindergarten-2023",
    title: "Kindergarten Basics 2023",
    description: "Basic skills assessment for kindergarten students",
    country: "USA",
    type: "KG",
    subject: "General",
    year: 2023,
    questions: 8,
    duration: "30 minutes",
    difficulty: "Beginner",
    popularity: 82,
    passingRate: 90,
    featured: true,
    level: "Kindergarten",
    educationSystem: "Pre-Primary",
  },
  {
    id: "preschool-2023",
    title: "Preschool Learning 2023",
    description: "Early learning assessment for preschool children",
    country: "UK",
    type: "Preschool",
    subject: "Early Learning",
    year: 2023,
    questions: 6,
    duration: "20 minutes",
    difficulty: "Beginner",
    popularity: 78,
    passingRate: 95,
    featured: false,
    level: "Preschool",
    educationSystem: "Pre-Primary",
  },
];

// Unique filter options
const countries = [...new Set(exams.map((exam) => exam.country))];
const examTypes = [...new Set(exams.map((exam) => exam.type))];
const subjects = [...new Set(exams.map((exam) => exam.subject))];
const years = [...new Set(exams.map((exam) => exam.year))].sort(
  (a, b) => b - a,
); // Sort years in descending order
const difficulties = [...new Set(exams.map((exam) => exam.difficulty))];
const levels = [...new Set(exams.map((exam) => exam.level))];
const educationSystems = [
  ...new Set(exams.map((exam) => exam.educationSystem)),
];

export default function ExamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedEducationSystem, setSelectedEducationSystem] =
    useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update active filters for display
  useEffect(() => {
    const filters: string[] = [];
    if (selectedCountry) filters.push(`Country: ${selectedCountry}`);
    if (selectedType) filters.push(`Type: ${selectedType}`);
    if (selectedSubject) filters.push(`Subject: ${selectedSubject}`);
    if (selectedYear) filters.push(`Year: ${selectedYear}`);
    if (selectedDifficulty) filters.push(`Difficulty: ${selectedDifficulty}`);
    if (selectedLevel) filters.push(`Level: ${selectedLevel}`);
    if (selectedEducationSystem)
      filters.push(`Education System: ${selectedEducationSystem}`);
    setActiveFilters(filters);
  }, [
    selectedCountry,
    selectedType,
    selectedSubject,
    selectedYear,
    selectedDifficulty,
    selectedLevel,
    selectedEducationSystem,
  ]);

  // Filter exams based on search and filter criteria
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountry
      ? exam.country === selectedCountry
      : true;
    const matchesType = selectedType ? exam.type === selectedType : true;
    const matchesSubject = selectedSubject
      ? exam.subject === selectedSubject
      : true;
    const matchesYear = selectedYear ? exam.year === selectedYear : true;
    const matchesDifficulty = selectedDifficulty
      ? exam.difficulty === selectedDifficulty
      : true;
    const matchesLevel = selectedLevel ? exam.level === selectedLevel : true;
    const matchesEducationSystem = selectedEducationSystem
      ? exam.educationSystem === selectedEducationSystem
      : true;

    return (
      matchesSearch &&
      matchesCountry &&
      matchesType &&
      matchesSubject &&
      matchesYear &&
      matchesDifficulty &&
      matchesLevel &&
      matchesEducationSystem
    );
  });

  // Get exams for different tabs
  const popularExams = [...filteredExams]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 6);
  const recentExams = [...filteredExams]
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);
  const featuredExams = filteredExams
    .filter((exam) => exam.featured)
    .slice(0, 6);

  const resetFilters = () => {
    setSelectedCountry("");
    setSelectedType("");
    setSelectedSubject("");
    setSelectedYear("");
    setSelectedDifficulty("");
    setSelectedLevel("");
    setSelectedEducationSystem("");
  };

  const removeFilter = (filter: string) => {
    if (filter.startsWith("Country:")) setSelectedCountry("");
    if (filter.startsWith("Type:")) setSelectedType("");
    if (filter.startsWith("Subject:")) setSelectedSubject("");
    if (filter.startsWith("Year:")) setSelectedYear("");
    if (filter.startsWith("Difficulty:")) setSelectedDifficulty("");
    if (filter.startsWith("Level:")) setSelectedLevel("");
    if (filter.startsWith("Education System:")) setSelectedEducationSystem("");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Past Exams</h1>
            <p className="text-muted-foreground mt-2">
              Practice with real past examination papers from various countries
              and examination boards
            </p>
          </div>
        </div>

        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-muted rounded-md w-full max-w-md"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Past Exams</h1>
          <p className="text-muted-foreground mt-2">
            Practice with real past examination papers from various countries
            and examination boards
          </p>
        </div>
        <Button
          variant="outline"
          className="mt-4 md:mt-0 flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <X className="h-4 w-4" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md mx-auto md:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search exams by title or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Active filters display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="px-3 py-1">
              {filter}
              <button
                className="ml-2 hover:text-primary"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-accent/50 rounded-lg p-4 mb-8 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Exam Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={selectedSubject}
                  onValueChange={setSelectedSubject}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="year">Year</Label>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) =>
                    setSelectedYear(value ? parseInt(value) : "")
                  }
                >
                  <SelectTrigger id="year">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Difficulties</SelectItem>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Class Level</Label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="educationSystem">Education System</Label>
                <Select
                  value={selectedEducationSystem}
                  onValueChange={setSelectedEducationSystem}
                >
                  <SelectTrigger id="educationSystem">
                    <SelectValue placeholder="All Education Systems" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Education Systems</SelectItem>
                    {educationSystems.map((system) => (
                      <SelectItem key={system} value={system}>
                        {system}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={resetFilters} className="mr-2">
                Reset Filters
              </Button>
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-6"
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="featured">
            <Sparkles className="h-4 w-4 mr-1" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="popular">
            <TrendingUp className="h-4 w-4 mr-1" />
            Popular
          </TabsTrigger>
          <TabsTrigger value="recent">
            <Clock className="h-4 w-4 mr-1" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-0">
          {filteredExams.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                No exams found matching your criteria
              </p>
              <Button variant="outline" onClick={resetFilters} className="mt-4">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam, index) => (
                <ExamCard key={exam.id} exam={exam} index={index} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExams.length > 0 ? (
              featuredExams.map((exam, index) => (
                <ExamCard key={exam.id} exam={exam} index={index} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-lg">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  No featured exams match your current filters
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularExams.length > 0 ? (
              popularExams.map((exam, index) => (
                <ExamCard key={exam.id} exam={exam} index={index} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-lg">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  No popular exams match your current filters
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentExams.length > 0 ? (
              recentExams.map((exam, index) => (
                <ExamCard key={exam.id} exam={exam} index={index} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-muted/30 rounded-lg">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">
                  No recent exams match your current filters
                </p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-accent/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Exam Preparation Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              Study Strategies
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Create a study schedule and stick to it</li>
              <li>Use active recall techniques instead of passive reading</li>
              <li>Take regular breaks using the Pomodoro technique</li>
              <li>Join study groups for collaborative learning</li>
            </ul>
          </div>
          <div className="bg-background rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Exam Day Tips
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Get a good night's sleep before the exam</li>
              <li>Eat a balanced meal to maintain energy levels</li>
              <li>Arrive early to reduce stress and anxiety</li>
              <li>Read all instructions carefully before starting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
