"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface DialogProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const Dialog = ({ open, onClose, children }: DialogProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscapeKey)
    return () => window.removeEventListener("keydown", handleEscapeKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg">{children}</div>
    </div>
  )
}

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold">{children}</h2>
    <Button variant="ghost" onClick={() => {}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  </div>
)

export const DialogBody = ({ children }: { children: React.ReactNode }) => <div>{children}</div>

export const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex justify-end">{children}</div>
)
"

