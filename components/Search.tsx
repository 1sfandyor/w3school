'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search } from "lucide-react"

const localTopics = [
  "HTML Tutorial",
  "CSS Tutorial",
  "JavaScript Tutorial",
  "SQL Tutorial",
  "Python Tutorial",
  "PHP Tutorial",
  "Java Tutorial",
  "C++ Tutorial",
  "C# Tutorial",
  "jQuery Tutorial",
  "W3.CSS Tutorial",
  "Bootstrap Tutorial",
  "React Tutorial",
  "Node.js Tutorial",
  "XML Tutorial",
  "JSON Tutorial",
  "AngularJS Tutorial",
  "MySQL Tutorial",
  "TypeScript Tutorial",
  "Vue.js Tutorial",
]

export default function SearchComponent() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [searchResults, setSearchResults] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (query) {
      const filteredTopics = localTopics
        .filter(topic => topic.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 7)  // Limit to 7 suggestions
      setSuggestions(filteredTopics.length > 0 ? [...filteredTopics, 'Search W3Schools'] : ['Search W3Schools'])
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      if (suggestions.length > 1 || (suggestions.length === 1 && suggestions[0] !== 'Search W3Schools')) {
        // Local search result found
        const section = suggestions[0].split(' ')[0].toLowerCase()
        router.push(`/${section}`)
      } else {
        // Simulate external search
        const externalResults = await simulateExternalSearch(query)
        setSearchResults(externalResults)
        setShowModal(true)
      }
    }
  }

  const simulateExternalSearch = async (query: string): Promise<string> => {
    // In a real application, this would be an actual API call
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    return `External search results for "${query}":\n` +
      `1. Result 1 for ${query}\n` +
      `2. Result 2 for ${query}\n` +
      `3. Result 3 for ${query}\n` +
      `Search for ${query} on Google`
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === 'Search W3Schools') {
      // Fixing the type conversion issue by creating a custom event
      const customEvent = new Event('submit', { bubbles: true }) as unknown as React.FormEvent;
      handleSearch(customEvent);
    } else {
      const section = suggestion.split(' ')[0].toLowerCase()
      router.push(`/${section}`)
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? <div key={index} className="text-red-500 font-semibold">{part}</div>:part
    );
  }

  
  return (
    <div className="w-full max-w-md mx-auto relative text-black-1">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10 rounded-full bg-white-2  dark:bg-gray-800/90 border-green-500 focus:ring-green-500 focus:border-green-500"
        />
        <Button
          type="submit"
          className="absolute right-0 top-0 h-full px-3 rounded-full border-none bg-transparent hover:bg-transparent shadow-none "
          aria-label="Search"
        >
          <Search className="h-4 w-4 text-black-1" />
        </Button>
      </form>
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 px-3 bg-pink-50 border border-pink-200 rounded-md shadow-lg overflow-hidden" role="listbox">
          {suggestions.map((suggestion, index) => (
            <li key={index} role="option" aria-selected={false} className="w-full text-left  flex py-2 hover:bg-pink-100 hover:text-black-1" onClick={() => handleSuggestionClick(suggestion)}>
                {highlightMatch(suggestion, query)}
            </li>
          ))}
        </ul>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
          </DialogHeader>
          <div className="mt-2 whitespace-pre-wrap">{searchResults}</div>
          <Button 
            onClick={() => window.open(`https://www.w3uzbek.uz/#gsc.tab=0&gsc.q=${encodeURIComponent(query)}`, '_blank')}
            className="mt-4"
          >
            Search on W3Uzbek
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
