"use client";

import LeafletMap from '@/components/map';
import LocationList from '@/components/LocationList';
import React, { useState, useMemo, useCallback } from 'react';

export interface LocationInfo {
    url: string;
    city: string;
    name: string;
}


const locationData: LocationInfo[] = [
    {
        url: "https://www.google.com/maps/search/Sir+Ganga+Ram+Hospital/@28.638134,77.18936,25z",
        city: "Delhi",
        name: "Sir Ganga Ram Hospital"
    },
    {
        url: "https://www.google.com/maps/search/BLK-Max+Super+Speciality+Hospital/@28.64363,77.17953,25z",
        city: "Delhi",
        name: "BLK-Max Super Speciality Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital+-+Saket+East+Wing/@28.52774,77.21141,25z",
        city: "Delhi",
        name: "Max Super Speciality Hospital - Saket East Wing"
    },
    {
        url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital/@28.63317,77.30993,25z",
        city: "Delhi",
        name: "Max Super Speciality Hospital (East Delhi)"
    },
    {
        url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital/@28.72789,77.15278,25z",
        city: "Delhi",
        name: "Max Super Speciality Hospital (North West Delhi)"
    },
    {
        url: "https://www.google.com/maps/search/Aashlok+Hospital/@28.566555,77.19855,25z",
        city: "Delhi",
        name: "Aashlok Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Ayushman+Hospital+&amp;+Health+Services/@28.59755,77.06795,25z",
        city: "Delhi",
        name: "Ayushman Hospital & Health Services"
    },
    {
        url: "https://www.google.com/maps/search/Manipal+Hospital/@28.593605,77.07052,25z",
        city: "Delhi",
        name: "Manipal Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Max+Smart+Superspeciality+Hospital/@28.52745,77.2139,25z",
        city: "Delhi",
        name: "Max Smart Superspeciality Hospital"
    },
    {
        url: "https://www.google.com/maps/search/CK+Birla+Hospital/@28.667227,77.13206,25z",
        city: "Delhi",
        name: "CK Birla Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Dharamshila+Hospital/@28.613121,77.20827,25z",
        city: "Delhi",
        name: "Dharamshila Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Metro+Hospital+and+Cancer+Institute/@28.638304,77.29521,25z",
        city: "Delhi",
        name: "Metro Hospital and Cancer Institute"
    },
    {
        url: "https://www.google.com/maps/search/Aakash+Health+Care/@28.60496,77.05461,25z",
        city: "Delhi",
        name: "Aakash Health Care"
    },
    {
        url: "https://www.google.com/maps/search/Kalpavriksh+Super+Speciality+Center/@28.597918,77.035126,25z",
        city: "Delhi",
        name: "Kalpavriksh Super Speciality Center"
    },
    {
        url: "https://www.google.com/maps/search/Artemis+Hospitals/@28.568287,77.06276,25z",
        city: "Delhi",
        name: "Artemis Hospitals"
    },
    {
        url: "https://www.google.com/maps/search/Indraprastha+Apollo+Hospitals/@28.54092,77.28346,25z",
        city: "Delhi",
        name: "Indraprastha Apollo Hospitals"
    },
    {
        url: "https://www.google.com/maps/search/Fortis+Hospital/@28.70971,77.16998,25z",
        city: "Delhi",
        name: "Fortis Hospital (North Delhi)"
    },
    {
        url: "https://www.google.com/maps/search/Pushpawati+Singhania+Research+Institute+(PSRI+Hospital)/@28.533442,77.22538,25z",
        city: "Delhi",
        name: "Pushpawati Singhania Research Institute (PSRI Hospital)"
    },
    {
        url: "https://www.google.com/maps/search/Batra+Hospital+&amp;+Medical+Research+Centre/@28.513548,77.24582,25z",
        city: "Delhi",
        name: "Batra Hospital & Medical Research Centre"
    },
    {
        url: "https://www.google.com/maps/search/Delhi+Heart+&amp;+Lung+Institute/@28.641478,77.20489,25z",
        city: "Delhi",
        name: "Delhi Heart & Lung Institute"
    },
    {
        url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital/@28.63475,77.33286,25z",
        city: "Uttar Pradesh",
        name: "Max Super Speciality Hospital (Ghaziabad)" // Added clarification for name and location
    },
    {
        url: "https://www.google.com/maps/search/Regency+Hospital/@26.480335,80.29954,25z",
        city: "Uttar Pradesh",
        name: "Regency Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Apollomedics+Super+Speciality+Hospital/@26.798061,80.90151,25z",
        city: "Uttar Pradesh",
        name: "Apollomedics Super Speciality Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Cosmos+Hospital/@28.894056,78.72906,25z",
        city: "Uttar Pradesh",
        name: "Cosmos Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Max+Multi+Speciality+Centre/@28.57437,77.32293,25z",
        city: "Uttar Pradesh",
        name: "Max Multi Speciality Centre"
    },
    {
        url: "https://www.google.com/maps/search/Fortis+Hospital+Noida/@28.618372,77.3727,25z",
        city: "Uttar Pradesh",
        name: "Fortis Hospital Noida"
    },
    {
        url: "https://www.google.com/maps/search/Surbhi+Hospital/@28.579132,77.36124,25z",
        city: "Uttar Pradesh",
        name: "Surbhi Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Metro+Multispeciality+Hospital/@28.59737,77.33596,25z",
        city: "Uttar Pradesh",
        name: "Metro Multispeciality Hospital"
    },
    {
        url: "https://www.google.com/maps/search/Apollo+Hospitals/@28.579113,77.33434,25z",
        city: "Uttar Pradesh",
        name: "Apollo Hospitals (Noida)" // Added clarification for name and location
    },
    {
        url: "https://www.google.com/maps/search/Hospital+NCC/@28.5778,77.3593,25z",
        city: "Uttar Pradesh",
        name: "Hospital NCC"
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
                <div className="map-container-selector w-full md:w-3/5 **h-auto** md:h-full md:pr-4 mb-4 md:mb-0"> {/* Map height to auto on mobile */}
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
                        <LocationList locationUrls={filteredLocations} selectedLocation={null} />
                    </div>
                </div>

            </div>
        </div>
    );
}