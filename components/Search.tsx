'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/utils'

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

export default function SearchComponent({className, btn = false}: {className?: string, btn?: boolean}) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [searchResults, setSearchResults] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (query) {
      const filteredTopics = localTopics
        .filter(topic => topic.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 7)
      setSuggestions(filteredTopics.length > 0 ? [...filteredTopics, 'Search W3Schools'] : ['Search W3Schools'])
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query) {
      if (suggestions.length > 1 || (suggestions.length === 1 && suggestions[0] !== 'Search W3Schools')) {
        
        const section = suggestions[0].split(' ')[0].toLowerCase()
        router.push(`/${section}`)
      } else {
        
        const externalResults = await simulateExternalSearch(query)
        setSearchResults(externalResults)
        setShowModal(true)
      }
    }
  }

  const simulateExternalSearch = async (query: string): Promise<string> => {
    
    await new Promise(resolve => setTimeout(resolve, 1000))
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
      <form className="relative" onSubmit={handleSearch}>
        <Input
          className={cn("!leading-normal rounded-full bg-white-2 dark:bg-gray-800/90", className)}
          placeholder="Qidirish..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          aria-label="Search"
          className={cn("absolute right-0 top-0 h-full px-3 w-fit rounded-full  border-none bg-transparent hover:bg-transparent shadow-none ", btn && "w-[20%] bg-green-1 rounded-l-none hover:bg-green-1/90")}
          type="submit"
        >
          <FontAwesomeIcon icon={faSearch} className={cn("text-black-2 w-5 h-5", btn && "text-white-2")} size="lg"/>    
        </Button>
      </form>
      
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 px-3 bg-pink-50 border border-pink-200 rounded-md shadow-lg overflow-hidden" role="listbox">
          {suggestions.map((suggestion, index) => (
            <li key={index} 
              aria-selected={false} 
              className="w-full text-left flex py-2 hover:bg-pink-100 hover:text-black-1" 
              role="option" 
              tabIndex={0}
              onClick={() => handleSuggestionClick(suggestion)}
              onKeyDown={(e) => e.key === 'Enter' && handleSuggestionClick(suggestion)}
            >
                {highlightMatch(suggestion, query)}
            </li>
          ))}
        </ul>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Qidiruv natijalari</DialogTitle>
          </DialogHeader>
          <div className="mt-2 whitespace-pre-wrap">{searchResults}</div>
          <Button 
            className="mt-4"
            onClick={() => window.open(`https://www.w3uzbek.uz/#gsc.tab=0&gsc.q=${encodeURIComponent(query)}`, '_blank')}
            >
            W3Schools.uz da qidirish
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
