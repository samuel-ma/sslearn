"use client";

import { notFound } from "next/navigation";
import { getStudentByIndexNumber } from "@/lib/data";
import { ResultsCard } from "@/components/ResultsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { useState } from "react";
import { StudentResult } from "@/data/studentResults";

export default function ResultsPage() {
  const [student, setStudent] = useState<StudentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (indexNumber: string) => {
    const foundStudent = getStudentByIndexNumber(indexNumber);
    if (foundStudent) {
      setStudent(foundStudent);
      setError(null);
    } else {
      setStudent(null);
      setError("No results found for the provided index number.");
    }
  };

  if (student) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6 no-print">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-black text-black"
                onClick={() => setStudent(null)}
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-black text-black"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Print Certificate
              </Button>
            </div>

            <div className="ss-border-pattern rounded">
              <ResultsCard student={student} />
            </div>

            <div className="mt-8 text-center text-sm text-gray-600 bg-white p-4 border border-gray-300 rounded">
              <p className="font-medium">VERIFICATION NOTICE:</p>
              <p>
                This document can be verified at verify.education.gov.ss using the reference number: {student.indexNumber}
                /2023/SSCE
              </p>
              <p className="mt-2 text-xs">Results issued on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="ss-border-pattern rounded">
            <div className="bg-white p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="south-sudan-emblem mb-4">
                  <div className="text-center">
                    <div className="south-sudan-flag mx-auto mb-1"></div>
                    <div className="text-[8px] font-bold">REPUBLIC OF</div>
                    <div className="text-[8px] font-bold">SOUTH SUDAN</div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-center uppercase">Republic of South Sudan</h1>
                <h2 className="text-xl font-bold text-center mb-1">Ministry of General Education and Instruction</h2>
                <p className="text-center text-sm">South Sudan Certificate of Secondary Education</p>
              </div>

              <div className="bg-[#f8fafc] border-l-4 border-[#078930] p-4 text-sm mb-6">
                <p className="font-medium mb-2">IMPORTANT NOTICE:</p>
                <p>
                  This portal is for the verification of South Sudan Certificate of Secondary Education results. Enter
                  your index number in the format provided to access your results.
                </p>
              </div>

              <SearchForm onSearch={handleSearch} />

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <div className="mt-6 bg-[#f8fafc] border border-gray-300 p-4 rounded text-sm">
                <h3 className="font-bold uppercase mb-2 text-xs">Instructions:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Enter your index number in the format S1234/2023.</li>
                  <li>Ensure that the index number matches the one on your examination slip.</li>
                  <li>
                    For any issues accessing your results, contact your school administration or the Ministry of General
                    Education and Instruction.
                  </li>
                  <li>Results displayed on this portal are official and can be printed for reference.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 