"use client"; // Important: This is ALSO a client component

import React, { useRef, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

L.Icon.Default.imagePath = '/_next/static/media/'; // Correct path for Next.js public dir

interface LocationInfo {
    url: string;
    city: string;
    name: string
}

interface ClientSideLeafletWrapperProps {
    locationUrls: LocationInfo[];
    selectedLocation: LocationInfo | null; // Receive selectedLocation prop
    onMarkerClick: (location: LocationInfo) => void; // Receive onMarkerClick prop
}

const ClientSideLeafletWrapper: React.FC<ClientSideLeafletWrapperProps> = ({ locationUrls, selectedLocation, onMarkerClick }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("ClientSideLeafletWrapper useEffect is running"); // Log when useEffect runs
        console.log("locationUrls prop received:", locationUrls); // Log locationUrls prop

        if (!mapRef.current) {
            console.log("mapRef.current is null, component likely not yet mounted");
            return; // Exit if mapRef is not yet available
        }

        const map = L.map(mapRef.current).setView([20, 78], 5); // Centered on India, zoom level 5
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const markersGroup = L.featureGroup();

        if (locationUrls && locationUrls.length > 0) {
            locationUrls.forEach(locationInfo => {
                const { url, name } = locationInfo; // Use name from locationInfo directly
                const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
                const match = url.match(regex);

                if (match && match.length === 3) {
                    const lat = parseFloat(match[1]);
                    const lng = parseFloat(match[2]);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        console.log(`Creating marker for ${name} at [${lat}, ${lng}]`); // Log marker creation

                        const marker = L.marker([lat, lng])
                            .bindPopup(`${name}: <a href="${url}" target="_blank" rel="noopener noreferrer">View on Google Maps</a>`)
                            .on('click', () => onMarkerClick(locationInfo)); // Handle marker click

                        markersGroup.addLayer(marker);

                        if (selectedLocation && selectedLocation.url === url) {
                            marker.openPopup(); // Open popup if it's the selected location
                        }


                    } else {
                        console.warn("Invalid coordinates extracted from URL:", url);
                    }
                } else {
                    console.warn("Could not extract coordinates from URL:", url);
                }
            });
        } else {
            console.log("locationUrls is empty or null, no markers to add"); // Log if no locations
        }


        if (markersGroup.getLayers().length > 0) {
            map.fitBounds(markersGroup.getBounds(), { padding: [50, 50] });
        } else {
            console.log("No markers to fit bounds to.");
        }
        map.addLayer(markersGroup);


        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [locationUrls, selectedLocation, onMarkerClick]); // Added selectedLocation and onMarkerClick to dependencies


    return <div id="leaflet-map" ref={mapRef} style={{ height: '100%' }} />;
};

export default ClientSideLeafletWrapper;