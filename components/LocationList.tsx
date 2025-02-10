"use client"
import React, { useRef, useEffect } from 'react';
import { LocationInfo } from '@/app/find-a-hospital/page';

interface LocationListProps {
    locationUrls: LocationInfo[];
    selectedLocation: LocationInfo | null;
}

const LocationList: React.FC<LocationListProps> = ({ locationUrls, selectedLocation }) => {
    const listRef = useRef<HTMLUListElement>(null);
    const selectedLocationRef = useRef<HTMLLIElement>(null);


    useEffect(() => {
        if (selectedLocation && selectedLocationRef.current && listRef.current) {
            selectedLocationRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    }, [selectedLocation]);


    return (
        <ul ref={listRef}>
            {locationUrls.map((location, index) => (
                <li
                    key={index}
                    className={`mb-2 p-2 border-b border-gray-200 last:border-b-0 ${
                        selectedLocation && selectedLocation.url === location.url ? 'highlighted-location bg-blue-50' : ''
                    }`}
                    ref={selectedLocation && selectedLocation.url === location.url ? selectedLocationRef : null}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">{location.name}</h3>
                            {location.city && <p className="text-gray-600">{location.city}</p>}
                        </div>
                        <a
                            href={location.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            View on Google Maps
                        </a>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LocationList;