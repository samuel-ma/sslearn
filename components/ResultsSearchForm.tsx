import { useState } from 'react';

interface ResultsSearchFormProps {
  onSearch: (indexNumber: string) => void;
}

export default function ResultsSearchForm({ onSearch }: ResultsSearchFormProps) {
  const [indexNumber, setIndexNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(indexNumber);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Search Results</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="indexNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Index Number
          </label>
          <input
            type="text"
            id="indexNumber"
            value={indexNumber}
            onChange={(e) => setIndexNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 123456"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search Results
        </button>
      </form>
    </div>
  );
} 