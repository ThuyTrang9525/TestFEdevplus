export interface SearchSectionProps {
  onSearch: (location: string) => void;
  onSearchChange: (value: string) => void;
  searchResults: string[];
  onSelectLocation: (location: string) => void;
  loading: boolean;
}
