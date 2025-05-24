import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch?: (indexNumber: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [indexNumber, setIndexNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(indexNumber);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="indexNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Index Number
        </label>
        <Input
          type="text"
          id="indexNumber"
          value={indexNumber}
          onChange={(e) => setIndexNumber(e.target.value)}
          placeholder="e.g., S1234/2023"
          className="w-full"
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#078930] hover:bg-[#067026] text-white"
      >
        Search Results
      </Button>
    </form>
  );
} 