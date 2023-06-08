/* global google */
import React, { useEffect } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useDispatch, useSelector } from "react-redux";
import { AllGroupThunk } from "../../store/group";
import "./index.css"
import t1 from './t1.png'
import t2 from './t2.png'

export default function Home() {

    const dispatch = useDispatch()
    const groupstate = useSelector(state => state.group.all_groups)

    useEffect(() => {
        document.title = 'NA | Groups';
        dispatch(AllGroupThunk())
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

    const translate = (val) => {
        switch (val) {
            case "1":
                return 'Seattle, WA'
            case "2":
                return 'San Francisco, CA'
            default:
                return 'Temecula, CA'
        }
    }

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
                    <div className="underlineme">Please contact the admin to have your group added.</div>
                    {groupstate && Object.keys(groupstate).map((groupid) => {
                        const group = groupstate[groupid]
                        return (
                            <div className="innerg">
                                <div><span className="boldme">Name: </span>{group.title}</div>
                                <div className="centerme"><span className="boldme">About: </span><img src={group.topicId == 1 ? t1 : t2} alt="tag" className="tagimg"></img></div>
                                <div><span className="boldme">Location: </span>{translate(groupid)} / <span className="boldme">Members #: </span>{group.members.length}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}