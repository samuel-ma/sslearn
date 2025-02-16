"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { PDFReader } from "@/components/PDFReader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { AlertCircle, BookmarkPlus, Menu, PenLine, Search } from "lucide-react"

interface Note {
  id: string
  pageNumber: number
  content: string
  timestamp: Date
}

interface Bookmark {
  id: string
  pageNumber: number
  title: string
  timestamp: Date
}

export default function StudyMaterialPage() {
  const params = useParams()
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [readProgress, setReadProgress] = useState(0)
  const [showNoteInput, setShowNoteInput] = useState(false)
  const [noteContent, setNoteContent] = useState("")
  
  const material = getStudyMaterial(params.subjectId as string)

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${material.id}`)
    if (savedProgress) {
      setReadProgress(parseInt(savedProgress))
    }
  }, [material.id])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    const progress = Math.round((pageNumber / material.totalPages) * 100)
    setReadProgress(progress)
    localStorage.setItem(`progress-${material.id}`, progress.toString())
  }

  const addBookmark = () => {
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      pageNumber: currentPage,
      title: `Page ${currentPage}`,
      timestamp: new Date()
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  const addNote = () => {
    if (!noteContent.trim()) return
    
    const newNote: Note = {
      id: Date.now().toString(),
      pageNumber: currentPage,
      content: noteContent,
      timestamp: new Date()
    }
    setNotes([...notes, newNote])
    setNoteContent("")
    setShowNoteInput(false)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">{material.title}</h1>
          <Progress value={readProgress} className="w-48 h-2 mt-2" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={addBookmark}>
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowNoteInput(!showNoteInput)}>
            <PenLine className="h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Study Tools</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notes and bookmarks..."
                    className="mb-4 pl-9"
                  />
                </div>
                <Separator className="my-4" />
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {bookmarks.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Bookmarks</h3>
                      {bookmarks.map((bookmark) => (
                        <Button
                          key={bookmark.id}
                          variant="ghost"
                          className="w-full justify-start text-left mb-1"
                          onClick={() => setCurrentPage(bookmark.pageNumber)}
                        >
                          {bookmark.title}
                        </Button>
                      ))}
                    </div>
                  )}
                  {notes.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      {notes.map((note) => (
                        <div key={note.id} className="mb-3 p-3 bg-muted rounded-lg">
                          <div className="text-sm font-medium mb-1">Page {note.pageNumber}</div>
                          <p className="text-sm text-muted-foreground">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Note Input */}
      {showNoteInput && (
        <div className="p-4 border-b">
          <div className="flex gap-2">
            <Input
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Add a note for this page..."
              className="flex-1"
            />
            <Button onClick={addNote} disabled={!noteContent.trim()}>
              Save
            </Button>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <PDFReader
            url={material.pdfUrl}
            onPageChange={handlePageChange}
            onError={(err) => setError(err.message)}
          />
        )}
      </div>
    </div>
  )
}

// Helper function to get study material details
function getStudyMaterial(subjectId: string) {
  const [subject, classNum] = subjectId.split('-')
  const capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1)
  
  return {
    id: subjectId,
    title: `${capitalizedSubject} Class ${classNum}`,
    description: `Study material for ${capitalizedSubject} - Class ${classNum}`,
    pdfUrl: `/data/study-material/Secondary_${capitalizedSubject}_${classNum}_Student_Textbook.pdf`,
    totalPages: 100, // This should be updated with actual page count
  }
}
