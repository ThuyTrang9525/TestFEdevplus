"use client";
// src/app/page.tsx (hoặc src/App.tsx)

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react"; 
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import WeatherContent from "./components/WeatherContent";
import { fetchWeatherData, LocationNotFoundError, WeatherData } from "./utils/weatherApi";

export default function Page() {
    const router = useRouter(); 
    const searchParams = useSearchParams();
    
    const urlLocation = searchParams.get('location');
    const urlUnit = searchParams.get('unit');

    const initialDay: string = new Date().toLocaleDateString('en-US', { weekday: 'long' }); 
    
    const [unit, setUnit] = useState<'metric' | 'imperial'>(
        (urlUnit as 'metric' | 'imperial') || "metric"
    );
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    
    const [selectedDay, setSelectedDay] = useState<string>(initialDay); 

    const handleSearch = useCallback(
        async (location: string) => {
            setLoading(true);
            setError(null);

            const searchLocation: string = location || urlLocation || "Berlin, Germany"; 

            try {
                const data: WeatherData = await fetchWeatherData(searchLocation, unit);
                
                setWeatherData(data);
                setSearchResults([]);
                setSelectedDay(initialDay); 

                if (data?.location) {
                    const encodedLocation = encodeURIComponent(data.location);
                    router.replace(`/?location=${encodedLocation}&unit=${unit}`);
                }

            } catch (err) {
                console.error("API Error:", err); 
                
                if (err instanceof LocationNotFoundError) {
                    setWeatherData(null); 
                    setError(null); 
                } else {
                    setError("We couldn't get the weather data. Please try another city or check your API key."); 
                    setWeatherData(null); 
                }
                
            } finally {
                setLoading(false);
            }
        },
        [unit, router, urlLocation]
    );
    
    useEffect(() => {
        if (!weatherData && !loading) {
            const defaultSearchLocation: string = urlLocation || "Berlin, Germany";
            handleSearch(defaultSearchLocation);
        }
    }, [handleSearch, weatherData, loading, urlLocation]); 

    const handleSearchChange = (value: string) => {
        if (value.trim()) {
            setSearchResults([
                `${value}`,
                `${value}, France`,
                `${value}, Germany`,
                `${value}, USA`,
            ]);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectLocation = (location: string) => {
        setSearchResults([]);
        handleSearch(location);
    };

    const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
        if (newUnit !== unit) {
            setUnit(newUnit);
            
            const locationToRefetch: string = weatherData?.location || urlLocation || "Berlin, Germany";
            const encodedLocation = encodeURIComponent(locationToRefetch);
            router.replace(`/?location=${encodedLocation}&unit=${newUnit}`); 
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            <Header unit={unit} onUnitChange={handleUnitChange} />
            <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                <SearchSection
                    onSearch={handleSearch}
                    onSearchChange={handleSearchChange}
                    searchResults={searchResults}
                    onSelectLocation={handleSelectLocation}
                    loading={loading}
                />
                <WeatherContent
                    weatherData={weatherData}
                    loading={loading}
                    error={error}
                    onRetry={() => handleSearch(weatherData?.location || urlLocation || "Berlin, Germany")}
                    selectedDay={selectedDay}
                    onSelectDay={setSelectedDay}
                />
            </main>
        </div>
    );
}