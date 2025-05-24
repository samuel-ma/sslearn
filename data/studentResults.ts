export interface SubjectResult {
  subject: string;
  grade: string;
  marks: number;
}

export interface StudentResult {
  indexNumber: string;
  name: string;
  school: string;
  subjects: SubjectResult[];
  totalMarks: number;
  average: number;
  division: string;
}

export const dummyResults: StudentResult[] = [
  {
    indexNumber: "123456",
    name: "John Doe",
    school: "St. Mary's High School",
    subjects: [
      { subject: "Mathematics", grade: "A", marks: 95 },
      { subject: "English", grade: "A", marks: 92 },
      { subject: "Physics", grade: "A", marks: 90 },
      { subject: "Chemistry", grade: "A", marks: 88 },
      { subject: "Biology", grade: "A", marks: 94 },
      { subject: "History", grade: "A", marks: 91 },
    ],
    totalMarks: 550,
    average: 91.67,
    division: "First Division"
  },
  {
    indexNumber: "789012",
    name: "Jane Smith",
    school: "City High School",
    subjects: [
      { subject: "Mathematics", grade: "B", marks: 82 },
      { subject: "English", grade: "A", marks: 90 },
      { subject: "Physics", grade: "B", marks: 85 },
      { subject: "Chemistry", grade: "B", marks: 83 },
      { subject: "Biology", grade: "A", marks: 92 },
      { subject: "History", grade: "B", marks: 84 },
    ],
    totalMarks: 516,
    average: 86,
    division: "Second Division"
  }
]; 