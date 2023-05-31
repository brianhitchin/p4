/* global google */
import React, { useEffect } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import "./index.css"

export default function Home() {

    useEffect(() => {
        document.title = 'NA | Groups';
      }, []);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const markers = [
        { lat: 33.4934, lng: -117.1488 },
        { lat: 47.6062, lng: -122.3321 },
        { lat: 37.7749, lng: -122.4194 },
    ];

    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds, 10);
    };

    return (
        <div className="allstorymain">
            <div className="allstorytop">
                <div>
                    <span className="bigfont2">Groups</span>
                    <span>Expand your network, share more stories!</span>
                </div>
            </div>
            <div className="agbot">
                <div className="border">
                    {!isLoaded ? (
                        <h1>Loading...</h1>
                    ) : (
                        <GoogleMap mapContainerClassName="map-container" onLoad={onLoad}>
                            {markers.map(({ lat, lng }) => (
                                <Marker position={{ lat, lng }} />
                            ))}
                        </GoogleMap>
                    )}
                </div>
                <div className="glist">
                    Groups will be added soon!
                </div>
            </div>
        </div>
    )
}