"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { Search, BookOpen, Brain, Video, FileText, Trophy, X, Clock, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SearchResult {
  id: number
  title: string
  url: string
  category?: string
  description?: string
  type?: 'course' | 'quiz' | 'video' | 'document' | 'achievement'
  keyValue?: string
}

const recentSearches = [
  { query: "Advanced Physics", timestamp: "2 hours ago" },
  { query: "Data Structures Quiz", timestamp: "1 day ago" },
  { query: "Machine Learning", timestamp: "3 days ago" },
  { query: "Biology Exam Prep", timestamp: "1 week ago" },
]

const popularContent = [
  { 
    id: 1,
    title: "Chemistry Fundamentals", 
    type: "course" as const,
    icon: BookOpen,
    category: "Science",
    description: "Learn the basics of chemistry with interactive lessons",
    url: "/learn/chemistry-fundamentals"
  },
  { 
    id: 2,
    title: "Python Programming", 
    type: "quiz" as const,
    icon: Brain,
    category: "Programming",
    description: "Test your Python knowledge with challenging questions",
    url: "/quizzes/python-programming"
  },
  { 
    id: 3,
    title: "Calculus 101", 
    type: "video" as const,
    icon: Video,
    category: "Mathematics",
    description: "Comprehensive video series on calculus fundamentals",
    url: "/learn/calculus-101"
  },
  { 
    id: 4,
    title: "History of Science", 
    type: "document" as const,
    icon: FileText,
    category: "History",
    description: "Detailed document covering major scientific discoveries",
    url: "/resources/history-of-science"
  },
]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!open) {
      setQuery("")
      setResults([])
      setError(null)
      setActiveIndex(-1)
    } else {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Simulate search functionality
  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.length < 2) {
        setResults([])
        setError(null)
        setActiveIndex(-1)
        return
      }

      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Filter popular content based on query
        const filteredResults = popularContent.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
        ).map(item => ({
          ...item,
          url: item.url
        }))

        setResults(filteredResults)
      } catch (error) {
        console.error("Error fetching search results:", error)
        setError("Failed to load search results. Please try again.")
      } finally {
        setIsLoading(false)
        setActiveIndex(-1)
      }
    }

    const debounceTimer = setTimeout(fetchResults, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (results.length > 0) {
          setActiveIndex(prevIndex => (prevIndex + 1) % results.length)
        } else if (!query && popularContent.length > 0) {
          setActiveIndex(prevIndex => (prevIndex + 1) % popularContent.length)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (results.length > 0) {
          setActiveIndex(prevIndex => (prevIndex - 1 + results.length) % results.length)
        } else if (!query && popularContent.length > 0) {
          setActiveIndex(prevIndex => (prevIndex - 1 + popularContent.length) % popularContent.length)
        }
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        if (results.length > 0) {
          handleSelect(results[activeIndex])
        } else if (!query && popularContent.length > 0) {
          handleSelect(popularContent[activeIndex])
        }
      } else if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, activeIndex, onOpenChange, query])

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false)
    // Here you would typically navigate to the result URL
    console.log("Navigating to:", result.url)
  }

  const getIconForType = (type?: string) => {
    switch(type) {
      case 'course': return <BookOpen className="h-5 w-5 text-green-500" />
      case 'quiz': return <Brain className="h-5 w-5 text-purple-500" />
      case 'video': return <Video className="h-5 w-5 text-red-500" />
      case 'document': return <FileText className="h-5 w-5 text-orange-500" />
      case 'achievement': return <Trophy className="h-5 w-5 text-yellow-500" />
      default: return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  // Group results by category
  const groupedResults = results.reduce((groups, item) => {
    const category = item.category || 'Other'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
    return groups
  }, {} as Record<string, SearchResult[]>)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="backdrop-blur-sm" />
      <DialogContent className="p-0 border-none max-w-2xl mx-auto">
        <DialogTitle className="sr-only">Search Learning Materials</DialogTitle>
        <div className="mx-auto w-full max-w-3xl divide-y divide-gray-100 overflow-hidden rounded-xl bg-white">
          {/* Search Input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              className="h-12 w-full border-0 bg-transparent pl-11 pr-12 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Search for courses, quizzes, videos, and documents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isLoading && <Loader2 className="absolute right-12 top-3.5 h-5 w-5 animate-spin text-gray-400" />}
          </div>

          {/* Results Area */}
          <div className="max-h-[70vh] overflow-y-auto">
            {error && (
              <div className="p-6 text-center min-h-[200px] flex flex-col items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
                <p className="text-sm font-medium text-red-600 mb-1">Search Error</p>
                <p className="text-sm text-gray-500">{error}</p>
              </div>
            )}

            {!error && query.length > 0 && query.length < 2 && (
              <div className="p-6 text-center min-h-[200px] flex flex-col items-center justify-center">
                <p className="text-sm text-gray-500">
                  Keep typing to see results... (min. 2 characters)
                </p>
              </div>
            )}

            {!error && query.length >= 2 && !isLoading && results.length === 0 && (
              <div className="p-10 text-center min-h-[200px] flex flex-col items-center justify-center">
                <Search className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-lg font-medium text-gray-900">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-sm text-gray-500">Try different keywords or browse popular content below.</p>
              </div>
            )}

            {isLoading && (
              <div className="p-10 text-center min-h-[200px] flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-gray-400 mb-3 animate-spin" />
                <p className="text-lg font-medium text-gray-900">Searching...</p>
                <p className="text-sm text-gray-500">Looking for results matching &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {results.length > 0 && !error && !isLoading && (
              <div className="max-h-[60vh] overflow-y-auto min-h-[200px]">
                {Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="mb-4 last:mb-0">
                    <h3 className="text-xs font-medium text-gray-500 px-4 py-2 border-b border-gray-100">
                      {category}
                    </h3>
                    <ul className="py-1">
                      {items.map((item) => {
                        const isActive = activeIndex === results.findIndex(r => r.id === item.id)
                        return (
                          <li
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={cn(
                              "flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-blue-50/60",
                              isActive && "bg-blue-50 border-l-2 border-blue-500"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 p-1.5 rounded-md bg-gray-50 border border-gray-100">
                                {getIconForType(item.type)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                {item.description && (
                                  <p className="text-xs text-gray-500">{item.description}</p>
                                )}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Default content when no search query */}
            {!query && !error && (
              <div className="p-6 space-y-8">
                {/* Recent Searches */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 px-0 py-2 border-b border-gray-100 mb-3">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Recent Searches
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between"
                        onClick={() => setQuery(search.query)}
                      >
                        <span>{search.query}</span>
                        <span className="text-xs text-gray-400">{search.timestamp}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Content */}
                <div>
                  <h3 className="text-xs font-medium text-gray-500 px-0 py-2 border-b border-gray-100 mb-3">
                    <Trophy className="h-4 w-4 inline mr-2" />
                    Popular Content
                  </h3>
                  <ul className="space-y-1">
                    {popularContent.map((item, index) => {
                      const isActive = !query && activeIndex === index
                      return (
                        <li
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className={cn(
                            "flex cursor-pointer items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-md transition-colors",
                            isActive && "bg-blue-50 border-l-2 border-blue-500"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 p-1.5 rounded-md bg-gray-50 border border-gray-100">
                              {getIconForType(item.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-6 py-3 text-xs text-gray-500 bg-gray-50 border-t">
            <span className="inline-flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-md mr-1 font-mono text-gray-700">Esc</kbd> to close
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-md mr-1 font-mono text-gray-700">↑↓</kbd> to navigate
            </span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-md mr-1 font-mono text-gray-700">↵</kbd> to select
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}