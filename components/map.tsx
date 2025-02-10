"use client"
import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type * as L from 'leaflet'; // Still keep type definitions

const DynamicLeafletComponent = dynamic( // Rename DynamicLeaflet to DynamicLeafletComponent
    () => import('./ClientSideLeafletWrapper'), // Import a wrapper component (defined below)
    { ssr: false, loading: () => <p>Map loading...</p> } // Optional loading indicator
);

interface LocationInfo { // Make sure this LocationInfo interface is also present in this file, OR import it if you have it defined elsewhere
    url: string;
    city: string;
    name: string;
}

interface LeafletMapProps {
    locationUrls: LocationInfo[];
    onMarkerClick: (location: LocationInfo) => void; // <--- ADD THIS LINE: Define onMarkerClick prop
    selectedLocation: LocationInfo | null;      // <--- ADD THIS LINE: Define selectedLocation prop
}
const LeafletMap: React.FC<LeafletMapProps> = ({ locationUrls }) => {
    return (
        <div style={{ height: '500px' }}>
            <DynamicLeafletComponent locationUrls={locationUrls} selectedLocation={null} onMarkerClick={function (location: LocationInfo): void {
                throw new Error('Function not implemented.');
            } } />
        </div>
    );
};

export default LeafletMap;


// Create a separate component to wrap Leaflet logic (ClientSideLeafletWrapper.tsx)
// Create a new file: components/ClientSideLeafletWrapper.tsx