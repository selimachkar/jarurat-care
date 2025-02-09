"use client"; // Important: This is ALSO a client component

import React, { useRef, useEffect } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.Icon.Default.imagePath = '/images/';

interface LocationInfo {
    url: string;
    city: string;
}

interface ClientSideLeafletWrapperProps {
    locationUrls: LocationInfo[];
}

const ClientSideLeafletWrapper: React.FC<ClientSideLeafletWrapperProps> = ({ locationUrls }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current).setView([20, 0], 5); // Zoom level 5 for India view
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const markersGroup = L.featureGroup();

        const addMarkerFromUrl = (locationInfo: LocationInfo) => {
            const { url } = locationInfo;
            const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
            const match = url.match(regex);

            if (match && match.length === 3) {
                const lat = parseFloat(match[1]);
                const lng = parseFloat(match[2]);

                if (!isNaN(lat) && !isNaN(lng)) {
                    let locationName = "Location";
                    try {
                        const urlPath = new URL(url).pathname;
                        const pathParts = urlPath.split('/place/');
                        if (pathParts.length > 1) {
                            locationName = decodeURIComponent(pathParts[1].split('/@')[0].replace(/\+/g, ' '));
                        }
                    } catch (nameError) {
                        console.warn("Could not extract location name from URL:", url, nameError);
                    }

                    const popupContent = `${locationName}: <a href="${url}" target="_blank" rel="noopener noreferrer">View on Google Maps</a>`;
                    const marker = L.marker([lat, lng])
                        .bindPopup(popupContent);
                    markersGroup.addLayer(marker);
                    console.log("Marker added to group:", { lat, lng, name: locationName });
                } else {
                    console.warn("Extracted coordinates are not valid numbers from URL:", url);
                }
            } else {
                console.warn("Could not extract coordinates from URL:", url);
            }
        };

        if (locationUrls && locationUrls.length > 0) {
            locationUrls.forEach(locationInfo => addMarkerFromUrl(locationInfo));
        }

        map.addLayer(markersGroup);
        console.log("Number of layers in marker group:", markersGroup.getLayers().length);
        if (markersGroup.getLayers().length > 0) {
            console.log("Marker group bounds before fitBounds:", markersGroup.getBounds());
            map.fitBounds(markersGroup.getBounds(), { padding: [50, 50] });
            console.log("fitBounds called");
        } else {
            console.log("No markers in group, fitBounds not called.");
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [locationUrls]);

    return <div id="leaflet-map" ref={mapRef} style={{ height: '100%' }} />;
};

export default ClientSideLeafletWrapper;