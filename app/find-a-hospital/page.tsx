"use client";

import LeafletMap from '@/components/map';
import LocationList from '@/components/LocationList';
import React, { useState, useMemo, useCallback } from 'react';

interface LocationInfo {
    url: string;
    city: string;
    name: string;
}

const locationData: LocationInfo[] = [
    {
        url: "https://www.google.com/maps/place/Max+Hospital,+Saket/@28.538283,77.213543,17z",
        city: "Delhi",
        name: "Max Hospital Saket",
    },
    {
        url: "https://www.google.com/maps/place/Fortis+Hospital,+Gurgaon/@28.41884,77.07188,17z",
        city: "Gurgaon",
        name: "Fortis Hospital Gurgaon",
    },
    {
        url: "https://www.google.com/maps/place/Apollo+Hospitals,+Bangalore/@12.97701,77.64373,17z",
        city: "Bangalore",
        name: "Apollo Hospitals Bangalore",
    },
    {
        url: "https://www.google.com/maps/place/Kauvery+Hospital+Chennai/@13.0418,80.2589,17z",
        city: "Chennai",
        name: "Kauvery Hospital Chennai",
    },
    {
        url: "https://www.google.com/maps/place/Apollo+Gleneagles+Hospitals/@22.5465,88.3903,17z",
        city: "Kolkata",
        name: "Apollo Gleneagles Hospitals Kolkata",
    },
    {
        url: "https://www.google.com/maps/place/Lilavati+Hospital+%26+Research+Centre/@19.0572,72.8216,17z",
        city: "Mumbai",
        name: "Lilavati Hospital Mumbai",
    },
    {
        url: "https://www.google.com/maps/place/Christian+Medical+College,+Vellore/@12.9250,79.1320,17z",
        city: "Vellore",
        name: "Christian Medical College Vellore",
    }
];

export default function HomePage() {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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
            return cityFiltered;
        }

        const searchLower = searchTerm.toLowerCase();
        return cityFiltered.filter(location =>
            location.name.toLowerCase().includes(searchLower)
        );
    }, [locationData, selectedCity, searchTerm]);

    const handleCityChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value === "all" ? null : event.target.value);
    }, []);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-4">Indian Hospitals</h1>

            <div className="flex flex-col md:flex-row **h-auto** md:h-[600px]"> {/* Flex container height to auto on mobile */}

                {/* Left side - Map */}
                <div className="w-full md:w-3/5 **h-auto** md:h-full md:pr-4 mb-4 md:mb-0"> {/* Map height to auto on mobile */}
                    <LeafletMap locationUrls={filteredLocations} />
                </div>

                {/* Right side - City Filter and Location List */}
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

                    <div className="mt-4 max-h-none md:max-h-[calc(100%-150px)] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-2">Hospital List</h2>
                        <LocationList locationUrls={filteredLocations} />
                    </div>
                </div>

            </div>
        </div>
    );
}