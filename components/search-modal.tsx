"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Search, BookOpen, Brain, Video, FileText, Trophy, X, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const searchCategories = [
  { id: "all", name: "All", icon: Search },
  { id: "courses", name: "Courses", icon: BookOpen },
  { id: "quizzes", name: "Quizzes", icon: Brain },
  { id: "videos", name: "Videos", icon: Video },
  { id: "documents", name: "Documents", icon: FileText },
  { id: "achievements", name: "Achievements", icon: Trophy },
]

const recentSearches = [
  "Advanced Physics",
  "Data Structures Quiz",
  "Machine Learning Course",
  "Biology Exam Prep",
]

const popularSearches = [
  { 
    title: "Chemistry Fundamentals",
    type: "Course",
    icon: BookOpen,
    url: "/learn/chemistry-fundamentals"
  },
  { 
    title: "Python Programming",
    type: "Quiz",
    icon: Brain,
    url: "/quizzes/python-programming"
  },
  { 
    title: "Calculus 101",
    type: "Video",
    icon: Video,
    url: "/learn/calculus-101"
  },
  { 
    title: "History of Science",
    type: "Document",
    icon: FileText,
    url: "/resources/history-of-science"
  },
]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Clear search when modal closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 border rounded-xl overflow-hidden shadow-lg">
        <div className="relative p-3 border-b bg-muted/30">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search for anything..."
              className="pl-10 pr-10 h-10 bg-background border-muted focus-visible:ring-primary/20 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 hover:bg-muted"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </div>

        <div className="border-b bg-muted/30">
          <div className="flex gap-1 p-2 overflow-x-auto px-3 no-scrollbar">
            {searchCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap rounded-full text-xs h-8 px-3",
                  activeCategory === category.id ? "bg-primary text-primary-foreground" : "bg-background border-muted hover:bg-muted"
                )}
              >
                <category.icon className="h-3 w-3" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="p-3 max-h-[60vh] overflow-y-auto">
          {searchQuery ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground flex items-center">
                  <Search className="h-3.5 w-3.5 mr-1.5" />
                  Results for "{searchQuery}"
                </h3>
                
                {/* Empty state */}
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted/50 p-3 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-medium mb-1">No results found</h3>
                  <p className="text-sm text-muted-foreground max-w-[250px]">
                    Try adjusting your search or filter to find what you're looking for
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recent searches */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  Recent Searches
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start h-9 px-3 text-sm font-normal hover:bg-muted"
                      onClick={() => setSearchQuery(search)}
                    >
                      <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="truncate">{search}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Popular searches */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground flex items-center">
                  <Trophy className="h-3.5 w-3.5 mr-1.5" />
                  Popular Content
                </h3>
                <div className="grid gap-2">
                  {popularSearches.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-2 rounded-lg hover:bg-muted cursor-pointer group"
                      onClick={() => setSearchQuery(item.title)}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary mr-3">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t p-3 flex justify-between items-center text-xs text-muted-foreground bg-muted/30">
          <div className="flex items-center">
            Press <kbd className="mx-1 px-1.5 py-0.5 border rounded text-xs bg-muted">ESC</kbd> to close
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 border rounded text-xs bg-muted">↑</kbd>
            <kbd className="px-1.5 py-0.5 border rounded text-xs bg-muted">↓</kbd>
            to navigate
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 