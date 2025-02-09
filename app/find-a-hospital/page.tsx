"use client";

import LeafletMap from '@/components/map';
import LocationList from '@/components/LocationList';
import React, { useState, useMemo, useCallback } from 'react'; // Import useCallback

interface LocationInfo {
    url: string;
    city: string;
    name: string; // Add name property to LocationInfo
}

const locationData: LocationInfo[] = [
    {
        url: "https://www.google.com/maps/place/Max+Hospital,+Saket/@28.538283,77.213543,17z",
        city: "Delhi",
        name: "Max Hospital Saket", // Add location name
    },
    {
        url: "https://www.google.com/maps/place/Fortis+Hospital,+Gurgaon/@28.41884,77.07188,17z",
        city: "Gurgaon",
        name: "Fortis Hospital Gurgaon", // Add location name
    },
    {
        url: "https://www.google.com/maps/place/Apollo+Hospitals,+Bangalore/@12.97701,77.64373,17z",
        city: "Bangalore",
        name: "Apollo Hospitals Bangalore", // Add location name
    },
    {
        url: "https://www.google.com/maps/place/Kauvery+Hospital+Chennai/@13.0418,80.2589,17z",
        city: "Chennai",
        name: "Kauvery Hospital Chennai", // Add location name
    },
    {
        url: "https://www.google.com/maps/place/Apollo+Gleneagles+Hospitals/@22.5465,88.3903,17z",
        city: "Kolkata",
        name: "Apollo Gleneagles Hospitals Kolkata", // Add location name
    },
    {
        url: "https://www.google.com/maps/place/Lilavati+Hospital+%26+Research+Centre/@19.0572,72.8216,17z",
        city: "Mumbai",
        name: "Lilavati Hospital Mumbai", // Add location name
    },
    {
        url: "https://www.google.com/maps/place/Christian+Medical+College,+Vellore/@12.9250,79.1320,17z",
        city: "Vellore",
        name: "Christian Medical College Vellore", // Add location name
    }
];

export default function HomePage() {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const uniqueCities = useMemo(() => {
        const cities = new Set<string>();
        locationData.forEach(location => cities.add(location.city));
        return Array.from(cities);
    }, [locationData]);

    const filteredLocations = useMemo(() => {
        let cityFiltered = locationData;
        if (selectedCity) {
            cityFiltered = locationData.filter(location => location.city === selectedCity);
        }

        if (!searchTerm) {
            return cityFiltered; // Return city-filtered if no search term
        }

        const searchLower = searchTerm.toLowerCase();
        return cityFiltered.filter(location =>
            location.name.toLowerCase().includes(searchLower) // Filter by location name
        );
    }, [locationData, selectedCity, searchTerm]);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value === "all" ? null : event.target.value);
    };

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => { // Use useCallback
        setSearchTerm(event.target.value);
    }, []);


    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4">Indian Hospitals</h1>

            <div className="flex flex-row h-[600px]">

                <div className="w-3/5 h-full pr-4">
                    <LeafletMap locationUrls={filteredLocations} />
                </div>

                <div className="w-2/5 h-full pl-4 border-l border-gray-300">
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

                    {/* Search Bar */}
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


                    <div className="mt-4 max-h-[calc(100%-150px)] overflow-y-auto"> {/* Adjusted maxHeight */}
                        <h2 className="text-xl font-semibold mb-2">Hospital List</h2>
                        <LocationList locationUrls={filteredLocations} />
                    </div>
                </div>

            </div>
        </div>
    );
}