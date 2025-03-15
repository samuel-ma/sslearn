"use client"

import { useState, useEffect, useRef, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Keyboard, Book, GraduationCap, Library } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Sample data - replace with your actual data source
const allSearchableItems = [
  { id: "1", title: "JavaScript Fundamentals", type: "quiz", group: "Popular Quizzes" },
  { id: "2", title: "Python Programming", type: "quiz", group: "Popular Quizzes" },
  { id: "3", title: "Mathematics Quiz", type: "quiz", group: "Popular Quizzes" },
  { id: "history", title: "World History", type: "subject", group: "Subjects" },
  { id: "biology", title: "Biology", type: "subject", group: "Subjects" },
  { id: "chemistry", title: "Chemistry", type: "subject", group: "Subjects" },
  { id: "physics", title: "Physics", type: "subject", group: "Subjects" },
  { id: "ple", title: "PLE Practice Exam", type: "exam", group: "Exams" },
  { id: "sat", title: "SAT Exams", type: "exam", group: "Exams" },
  { id: "ssple", title: "SSPLE Exams", type: "exam", group: "Exams" },
]

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
}

export default function SearchAutocomplete({
  placeholder = "Search...",
  className = "",
}: SearchAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<typeof allSearchableItems>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter suggestions based on search query
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredItems = allSearchableItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filteredItems.slice(0, 6)); // Limit to 6 suggestions
  }, [searchQuery]);

  useEffect(() => {
    // Close suggestions when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (
    suggestion: (typeof allSearchableItems)[0]
  ) => {
    setSearchQuery("");
    setShowSuggestions(false);

    // Navigate based on suggestion type
    if (suggestion.type === "quiz") {
      router.push(`/quiz/${suggestion.id}`);
    } else if (suggestion.type === "subject") {
      router.push(`/study-materials/${suggestion.id}`);
    } else if (suggestion.type === "exam") {
      router.push(`/exams/${suggestion.id}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          handleSearch(e as any);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "quiz": return "📝"
      case "subject": return "📚"
      case "exam": return "✍️"
      default: return "🔍"
    }
  }

  // Group suggestions by type
  const groupedSuggestions = suggestions.reduce((acc, item) => {
    acc[item.group] = [...(acc[item.group] || []), item]
    return acc
  }, {} as Record<string, typeof suggestions>)

  return (
    <div className={cn("relative", className)} ref={wrapperRef}>
      <div className="relative group w-[360px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder={"Search exams..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-8 h-9"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:opacity-70">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-50 w-[360px] mt-2 bg-background rounded-md border shadow-sm"
          >
            {suggestions.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                className={cn(
                  "p-2 cursor-pointer flex items-center gap-4 text-sm",
                  index === selectedIndex ? "bg-accent" : "hover:bg-accent/50"
                )}
                onClick={() => handleSuggestionClick(item)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="text-xs">{getIcon(item.type)}</span>
                <span className="font-medium truncate flex-1">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.type}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
