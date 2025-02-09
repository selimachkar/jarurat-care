import React from 'react';

interface LocationInfo {
    url: string;
    city: string;
}

interface LocationListProps {
    locationUrls: LocationInfo[];
}

const LocationList: React.FC<LocationListProps> = ({ locationUrls }) => {

    if (!locationUrls || locationUrls.length === 0) {
        return <p>No locations to display.</p>;
    }

    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {locationUrls.map((locationInfo, index) => {
                let locationName = "Location";
                try {
                    const urlPath = new URL(locationInfo.url).pathname;
                    const pathParts = urlPath.split('/place/');
                    if (pathParts.length > 1) {
                        locationName = decodeURIComponent(pathParts[1].split('/@')[0].replace(/\+/g, ' '));
                    }
                } catch (nameError) {
                    console.warn("Could not extract location name from URL:", locationInfo.url, nameError);
                }

                return (
                    <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <strong>{locationName}</strong>
                        <br />
                        <a href={locationInfo.url} target="_blank" rel="noopener noreferrer">
                            View on Google Maps
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default LocationList;