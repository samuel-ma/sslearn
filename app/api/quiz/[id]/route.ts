import { NextResponse } from "next/server"

const quizzes = {
  "1": [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      id: 4,
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      id: 5,
      question: "Which country is home to the kangaroo?",
      options: ["New Zealand", "South Africa", "Australia", "Brazil"],
      correctAnswer: "Australia",
    },
    {
      id: 6,
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correctAnswer: "Au",
    },
    {
      id: 7,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: "William Shakespeare",
    },
    {
      id: 8,
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter",
    },
    {
      id: 9,
      question: "Which country is home to the Great Barrier Reef?",
      options: ["Brazil", "Australia", "Thailand", "Mexico"],
      correctAnswer: "Australia",
    },
    {
      id: 10,
      question: "What is the main ingredient in guacamole?",
      options: ["Tomato", "Avocado", "Onion", "Lime"],
      correctAnswer: "Avocado",
    },
  ],
  "2": [
    {
      id: 1,
      question: "What is the chemical symbol for water?",
      options: ["Wa", "H2O", "Wt", "Aq"],
      correctAnswer: "H2O",
    },
    {
      id: 2,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
      correctAnswer: "Mitochondria",
    },
    {
      id: 3,
      question: "What is the speed of light?",
      options: ["299,792 km/s", "150,000 km/s", "200,000 km/s", "300,000 km/s"],
      correctAnswer: "299,792 km/s",
    },
    {
      id: 4,
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Titanium"],
      correctAnswer: "Diamond",
    },
    {
      id: 5,
      question: "Which of these is not a type of rock?",
      options: ["Igneous", "Sedimentary", "Metamorphic", "Plasmatic"],
      correctAnswer: "Plasmatic",
    },
    {
      id: 6,
      question: "What is the largest organ in the human body?",
      options: ["Brain", "Liver", "Skin", "Heart"],
      correctAnswer: "Skin",
    },
    {
      id: 7,
      question: "What is the chemical symbol for table salt?",
      options: ["NaCl", "H2O", "CO2", "O2"],
      correctAnswer: "NaCl",
    },
    {
      id: 8,
      question: "Which planet is closest to the sun?",
      options: ["Venus", "Mars", "Mercury", "Earth"],
      correctAnswer: "Mercury",
    },
    {
      id: 9,
      question: "What is the process by which plants make their own food?",
      options: ["Photosynthesis", "Respiration", "Fermentation", "Digestion"],
      correctAnswer: "Photosynthesis",
    },
    {
      id: 10,
      question: "What is the unit of electrical resistance?",
      options: ["Volt", "Ampere", "Watt", "Ohm"],
      correctAnswer: "Ohm",
    },
  ],
  "3": [
    {
      id: 1,
      question: "In which year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      correctAnswer: "1945",
    },
    {
      id: 2,
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
      correctAnswer: "George Washington",
    },
    {
      id: 3,
      question: "In which year did the Berlin Wall fall?",
      options: ["1987", "1989", "1991", "1993"],
      correctAnswer: "1989",
    },
    {
      id: 4,
      question: "Who was the first woman to fly solo across the Atlantic?",
      options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
      correctAnswer: "Amelia Earhart",
    },
    {
      id: 5,
      question: "Which ancient wonder was located in Alexandria, Egypt?",
      options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
      correctAnswer: "Lighthouse of Alexandria",
    },
    {
      id: 6,
      question: "Who wrote the Declaration of Independence?",
      options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
      correctAnswer: "Thomas Jefferson",
    },
    {
      id: 7,
      question: "In which year did the Titanic sink?",
      options: ["1910", "1912", "1914", "1916"],
      correctAnswer: "1912",
    },
    {
      id: 8,
      question: "Who was the first man to walk on the moon?",
      options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
      correctAnswer: "Neil Armstrong",
    },
    {
      id: 9,
      question: "Which country was the first to circumnavigate the globe?",
      options: ["England", "Spain", "Portugal", "Netherlands"],
      correctAnswer: "Spain",
    },
    {
      id: 10,
      question: "Who painted the Sistine Chapel ceiling?",
      options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
      correctAnswer: "Michelangelo",
    },
  ],
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const questions = quizzes[id as keyof typeof quizzes] || []

  return NextResponse.json({ questions })
}

