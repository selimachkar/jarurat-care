"use client"
import LeafletMap from '@/components/map';
import LocationList from '@/components/LocationList';
import React, { useState, useMemo, useCallback, useEffect } from 'react';

export interface LocationInfo {
    url: string;
    city: string;
    name: string;
}

export default function HomePage() {
    const [locationData, setLocationData] = useState<LocationInfo[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchHospitals = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/GetHospitals');
                if (!res.ok) {
                    throw new Error(`API request failed with status ${res.status}`);
                }
                const hospitals = await res.json();
                setLocationData(hospitals);
                console.log("locationData state UPDATED:", hospitals); 
            } catch (e: any) {
                console.error("Error fetching data from API:", e);
                setError("Failed to load hospital data. Please try again later.");
                setLocationData([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHospitals();
    }, []);

    const uniqueCities = useMemo(() => {
        if (!locationData || locationData.length === 0) {
            return []; 
        }
        const cities = new Set<string>();
        locationData.forEach(location => {
            if (location.city) { 
                cities.add(location.city);
            }
        });
        return Array.from(cities).sort(); 
    }, [locationData]);

    const filteredLocations = useMemo(() => {
        let cityFiltered = locationData;
        if (selectedCity) {
            cityFiltered = locationData.filter(location => location.city === selectedCity);
        }

        if (!searchTerm) {
            return cityFiltered;
        }

        const searchLower = searchTerm.toLowerCase();
        return cityFiltered.filter(location =>
            location.name.toLowerCase().includes(searchLower)
        );
    }, [locationData, selectedCity, searchTerm]);

    const handleCityChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value === "all" ? null : event.target.value);
        setSelectedLocation(null);
    }, []);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setSelectedLocation(null);
    }, []);

    const handleMarkerClick = useCallback((location: LocationInfo) => {
        setSelectedLocation(location);
    }, []);

    if (loading) {
        return <div className="h-screen container mx-auto p-4 text-center">Loading hospitals...</div>; // Loading indicator
    }

    if (error) {
        return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>; // Error message
    }


    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4 mx-auto">Hospitals</h1>

            <div className="flex flex-col md:flex-row h-auto md:h-[600px]">
                <div className="map-container-selector w-full md:w-3/5 h-auto md:h-full md:pr-4 mb-4 md:mb-0">
                    <LeafletMap 
                        locationUrls={filteredLocations}
                        onMarkerClick={handleMarkerClick}
                        selectedLocation={selectedLocation} 
                    />
                </div>

                <div className="w-full md:w-2/5 h-auto md:h-full md:pl-4 md:border-l md:border-gray-300">
                    <div className="mb-4">
                        <label htmlFor="city-filter" className="block mb-2 font-semibold">
                            Filter by City:
                        </label>
                        <select
                            id="city-filter"
                            value={selectedCity || 'all'}
                            onChange={handleCityChange}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                        >
                            <option value="all">All Cities</option>
                            {uniqueCities.map(city => (
                                <option key={city} value={city} className="text-black">
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location-search" className="block mb-2 font-semibold">Search Location:</label>
                        <input
                            type="text"
                            id="location-search"
                            placeholder="Enter location name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
                        />
                    </div>

                    <div className="mt-4 max-h-none md:max-h-[calc(100%-150px)] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-2">Hospital List</h2>
                        <LocationList
                            locationUrls={filteredLocations}
                            selectedLocation={selectedLocation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}