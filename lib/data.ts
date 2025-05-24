import { StudentResult, dummyResults } from "@/data/studentResults";

export function getStudentByIndexNumber(indexNumber: string): StudentResult | undefined {
  return dummyResults.find(student => student.indexNumber === indexNumber);
} 