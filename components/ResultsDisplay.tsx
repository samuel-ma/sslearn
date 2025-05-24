import { StudentResult } from '@/data/studentResults';

interface ResultsDisplayProps {
  result: StudentResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Secondary School Final Results</h1>
        <p className="text-gray-600">Academic Year 2023-2024</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">Index Number</p>
          <p className="text-xl font-semibold">{result.indexNumber}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">Name</p>
          <p className="text-xl font-semibold">{result.name}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">School</p>
          <p className="text-xl font-semibold">{result.school}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">Division</p>
          <p className="text-xl font-semibold text-green-600">{result.division}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Subject Results</h2>
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
              {result.subjects.map((subject, index) => (
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
          <p className="text-gray-600">Total Marks</p>
          <p className="text-2xl font-bold text-blue-600">{result.totalMarks}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600">Average</p>
          <p className="text-2xl font-bold text-green-600">{result.average.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
} 