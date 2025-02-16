"use client"

import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

// Set worker configuration
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFReaderProps {
  url: string
  title?: string
  onError?: (error: Error) => void
  onPageChange?: (pageNumber: number) => void
}

export function PDFReader({ url, title, onError, onPageChange }: PDFReaderProps) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.2)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const handleError = (error: Error) => {
    setIsLoading(false)
    console.error('PDF Load Error:', error)
    onError?.(error)
  }

  useEffect(() => {
    if (onPageChange) {
      onPageChange(pageNumber)
    }
  }, [pageNumber, onPageChange])

  return (
    <div className="flex flex-col h-full">
      {/* Controls Bar */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale(s => Math.max(0.7, s - 0.1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span>{Math.round(scale * 100)}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale(s => Math.min(2, s + 0.1))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Prev
          </Button>
          <span className="min-w-[80px] text-center">
            {pageNumber} / {numPages || '-'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="min-h-full flex items-center justify-center p-4">
          <Document
            file={url}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleError}
            loading={
              <div className="flex items-center justify-center">
                <Skeleton className="w-[600px] h-[800px]" />
              </div>
            }
          >
            {!isLoading && (
              <div className="flex justify-center">
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={
                    <div className="flex items-center justify-center">
                      <Skeleton className="w-[600px] h-[800px]" />
                    </div>
                  }
                  className="shadow-lg bg-white"
                />
              </div>
            )}
          </Document>
        </div>
      </div>
    </div>
  )
}
