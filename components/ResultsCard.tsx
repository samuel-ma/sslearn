import { StudentResult } from "@/data/studentResults";

interface ResultsCardProps {
  student: StudentResult;
}

export function ResultsCard({ student }: ResultsCardProps) {
  return (
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

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Index Number</p>
          <p className="text-lg font-semibold">{student.indexNumber}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Name</p>
          <p className="text-lg font-semibold">{student.name}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">School</p>
          <p className="text-lg font-semibold">{student.school}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Division</p>
          <p className="text-lg font-semibold text-green-600">{student.division}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Subject Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Marks</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects.map((subject, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3 px-4">{subject.subject}</td>
                  <td className="py-3 px-4 text-center font-semibold">{subject.grade}</td>
                  <td className="py-3 px-4 text-center">{subject.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Total Marks</p>
          <p className="text-2xl font-bold text-blue-600">{student.totalMarks}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Average</p>
          <p className="text-2xl font-bold text-green-600">{student.average.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
} 