import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';

interface AddressSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
    road?: string;
    house_number?: string;
  };
}

interface AddressAutocompleteProps {
  onSelect: (address: string, lat: number, lng: number, details: any) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
}

const AddressAutocomplete = ({
  onSelect,
  onChange,
  placeholder = "Search for a location...",
  value = "",
  className = "",
  inputClassName = "",
  dropdownClassName = "",
}: AddressAutocompleteProps) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // Using Nominatim API (free OpenStreetMap geocoding)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'Solar SaaS Platform'
            }
          }
        );
        const data = await response.json();
        setSuggestions(data);
        setHighlightedIndex(-1);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 250);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions || suggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions, suggestions, highlightedIndex]);

  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionsRef.current) {
      const element = suggestionsRef.current.children[highlightedIndex] as HTMLElement;
      if (element) {
        element.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (suggestion: AddressSuggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    
    onSelect(
      suggestion.display_name,
      lat,
      lng,
      {
        address: suggestion.address.road,
        house_number: suggestion.address.house_number,
        city: suggestion.address.city,
        state: suggestion.address.state,
        country: suggestion.address.country,
        postal_code: suggestion.address.postcode
      }
    );
    
    setQuery(suggestion.display_name);
    onChange?.(suggestion.display_name);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    onChange?.('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const formatAddress = (suggestion: AddressSuggestion) => {
    const parts = [];
    if (suggestion.address.road) {
      parts.push(suggestion.address.road);
      if (suggestion.address.house_number) {
        parts.unshift(suggestion.address.house_number);
      }
    }
    if (suggestion.address.city) parts.push(suggestion.address.city);
    if (suggestion.address.state) parts.push(suggestion.address.state);
    if (suggestion.address.country) parts.push(suggestion.address.country);
    return parts.join(', ');
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            const nextValue = e.target.value;
            setQuery(nextValue);
            onChange?.(nextValue);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm ${inputClassName}`.trim()}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <div 
          ref={suggestionsRef}
          className={`absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto ${dropdownClassName}`.trim()}
        >
          {loading && (
            <div className="px-4 py-8 flex items-center justify-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span className="text-sm">Searching locations...</span>
            </div>
          )}
          
          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <div className="px-4 py-8 text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <span className="text-sm">No locations found</span>
            </div>
          )}
          
          {!loading && suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                index === highlightedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              } border-b border-gray-100 last:border-b-0`}
            >
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.address.road || suggestion.address.city || suggestion.address.country || 'Unknown Location'}
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-1">
                    {formatAddress(suggestion)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
