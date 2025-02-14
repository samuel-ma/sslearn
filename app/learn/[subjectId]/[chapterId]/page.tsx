"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Award } from "lucide-react"

// Extended mock data with extra details for "general-knowledge"
const chapterData = {
  "general-knowledge": [
    {
      id: "gk-chapter-1",
      title: "Chapter 1: World Geography",
      content:
        "Explore the diverse physical landscapes of our planet. This chapter covers continents, oceans, mountains, and deserts. Detailed maps and vivid descriptions help you visualize the world.",
      progress: 0,
      image: "/images/gk/chapter1-main.jpg",
      gallery: ["/images/gk/chapter1-1.jpg", "/images/gk/chapter1-2.jpg", "/images/gk/chapter1-3.jpg"],
      keyPoints: ["Continents and Oceans", "Major Mountain Ranges", "Desert and Rainforest Regions"],
      relatedVideos: [
        { title: "World Geography Overview", url: "https://www.youtube.com/embed/videoid1" },
        { title: "Physical Landscapes", url: "https://www.youtube.com/embed/videoid2" },
      ],
      furtherReading: [
        { title: "Geography 101", link: "https://example.com/geography101" },
        { title: "Atlas of the World", link: "https://example.com/atlas" },
      ],
    },
    {
      id: "gk-chapter-2",
      title: "Chapter 2: Famous Literature",
      content: "This chapter reviews influential literary works across different eras.",
      progress: 50,
    },
    {
      id: "gk-chapter-3",
      title: "Chapter 3: Art History",
      content: "An in-depth look at major art movements and notable artists.",
      progress: 100,
    },
    {
      id: "gk-chapter-4",
      title: "Chapter 4: Music & Culture",
      content: "The relationship between music and cultural identity.",
      progress: 75,
    },
    {
      id: "gk-chapter-5",
      title: "Chapter 5: World Cuisines",
      content: "Exploring diverse culinary traditions.",
      progress: 100,
    },
    {
      id: "gk-chapter-6",
      title: "Chapter 6: Scientific Discoveries",
      content: "Breakthroughs that changed human understanding of nature.",
      progress: 40,
    },
    {
      id: "gk-chapter-7",
      title: "Chapter 7: Historic Landmarks",
      content: "Iconic landmarks and their historical significance.",
      progress: 60,
    },
    {
      id: "gk-chapter-8",
      title: "Chapter 8: Global Economies",
      content: "An overview of economic systems worldwide.",
      progress: 80,
    },
    {
      id: "gk-chapter-9",
      title: "Chapter 9: Political Systems",
      content: "Understanding governmental structures and ideologies.",
      progress: 30,
    },
    {
      id: "gk-chapter-10",
      title: "Chapter 10: Modern Technology",
      content: "The impact of technology on modern life.",
      progress: 10,
    },
  ],
  math: [
    {
      id: 1,
      title: "Chapter 1: Algebra Basics",
      content: "Introduction to algebraic expressions and equations.",
      progress: 100,
    },
    {
      id: 2,
      title: "Chapter 2: Calculus",
      content: "Fundamentals of differential and integral calculus.",
      progress: 45,
    },
  ],
  science: [
    { id: 1, title: "Chapter 1: Physics", content: "Basic laws of motion and energy.", progress: 0 },
    { id: 2, title: "Chapter 2: Chemistry", content: "Atomic structure and chemical reactions.", progress: 80 },
  ],
  history: [
    { id: 1, title: "Chapter 1: Ancient History", content: "Early civilizations and empires." },
    { id: 2, title: "Chapter 2: Modern History", content: "The rise of nation-states and global conflicts." },
  ],
  geography: [
    { id: 1, title: "Chapter 1: Physical Geography", content: "Landforms, climate, and ecosystems." },
    { id: 2, title: "Chapter 2: Human Geography", content: "Population, culture, and urbanization." },
  ],
  literature: [
    { id: 1, title: "Chapter 1: Classic Literature", content: "Analysis of famous literary works." },
    { id: 2, title: "Chapter 2: Contemporary Literature", content: "Modern novels, poems, and plays." },
  ],
  biology: [
    { id: 1, title: "Chapter 1: Cell Biology", content: "Structure and function of cells." },
    { id: 2, title: "Chapter 2: Genetics", content: "Principles of heredity and variation." },
  ],
}

export default function ChapterPage() {
  const { subjectId, chapterId } = useParams()
  const chapters = chapterData[subjectId as keyof typeof chapterData] || []
  const chapter = chapters.find((ch) => String(ch.id) === chapterId)
  if (!chapter) return <div>Chapter not found</div>

  // Prevent hydration errors
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // New state to track scroll progress
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (scrollTop / scrollHeight) * 100
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine next chapter if present
  const currentIndex = chapters.indexOf(chapter)
  const nextChapter = chapters[currentIndex + 1]

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Top navigation */}
      <Link href={`/learn/${subjectId}`}>
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chapters
        </Button>
      </Link>

      {/* Hero Header */}
      <div className="relative mb-8">
        <img
          src={chapter.image || "/placeholder.svg"}
          alt={chapter.title}
          className="w-full h-80 object-cover rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md">
          <h1 className="text-4xl font-bold text-white">{chapter.title}</h1>
        </div>
      </div>

      {/* Progress bar tracking scroll position */}
      <div className="mb-6">
        <Progress value={scrollProgress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">{Math.round(scrollProgress)}% read</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent>
              <p className="text-lg mb-4">{chapter.content}</p>
              {/* Additional Media Section for gk-chapter-1 */}
              {subjectId === "general-knowledge" && chapter.id === "gk-chapter-1" && (
                <>
                  <section className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">Image Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {chapter.gallery?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      ))}
                    </div>
                  </section>
                  {/* Removed related videos section */}
                </>
              )}
            </CardContent>
          </Card>

          {/* In-Depth Analysis with additional text */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">In-Depth Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Explore a detailed examination of the subject through historical context, analysis, and current
                viewpoints. This section is designed to give you insights and practical connections to real-world
                scenarios.
              </p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus
                ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
                mauris.
              </p>
              <p className="mb-4">
                Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.
                Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula
                vel nunc egestas porttitor.
              </p>
              {/* Comments Section */}
              <section>
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                <div className="space-y-2">
                  <div className="p-2 border rounded">
                    <p className="text-sm">
                      <strong>User1:</strong> This analysis deepens my understanding of the topic.
                    </p>
                  </div>
                  <div className="p-2 border rounded">
                    <p className="text-sm">
                      <strong>User2:</strong> Really insightful details and commentary here.
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Key Concepts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                {chapter.keyPoints?.map((point, idx) => (
                  <li key={idx} className="mb-1 text-lg">
                    {point}
                  </li>
                )) || <li className="text-lg">No key points available.</li>}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-lg">
                <span>Progress:</span>
                <span>{chapter.progress}%</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Duration:</span>
                <span>Approx. 45 min</span>
              </div>
            </CardContent>
          </Card>
          {chapter.furtherReading && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Further Reading</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-decimal pl-5">
                  {chapter.furtherReading.map((ref, idx) => (
                    <li key={idx} className="mb-1">
                      <a
                        href={ref.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-lg"
                      >
                        {ref.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Link href={`/learn/${subjectId}/${String(chapters[currentIndex - 1]?.id)}`}>
          <Button variant="outline" disabled={currentIndex === 0}>
            Previous Chapter
          </Button>
        </Link>
        <Link href={`/learn/${subjectId}/${String(nextChapter?.id)}`}>
          <Button variant="outline" disabled={!nextChapter}>
            Next Chapter
          </Button>
        </Link>
      </div>

      {/* Fresh end-of-chapter overlay */}
      {mounted && !nextChapter && scrollProgress > 90 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
            {/* Accent icon (top center) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-blue-500 rounded-full p-4 shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Amazing Job!</h2>
              <p className="mt-2 text-gray-600">
                You've finished this chapter. Celebrate your achievement and explore more resources below.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Link href={`/learn/${subjectId}`}>
                  <Button className="px-4 py-2">Return to Course</Button>
                </Link>
                <Link href={`/quiz/${subjectId}`}>
                  <Button variant="outline" className="px-4 py-2">
                    Take Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

