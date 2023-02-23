import React from 'react'
import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import MapStyle from './MapStyle';
import './map.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
    RulerControl,
    StylesControl,
    CompassControl,
    ZoomControl,
} from 'mapbox-gl-controls';
import 'mapbox-gl-controls/lib/controls.css';
import swal from 'sweetalert';


function EventHomeMap(props) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA';
    const apiKey = 'pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(props.longitude);
    const [lat, setLat] = useState(props.latitude);
    const [zoom, setZoom] = useState(7);
    const classes = MapStyle();

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            positionOptions: {
                enableHighAccuracy: true
            },
            center: [lng, lat],
            trackUserLocation: true,
            zoom: zoom,
            showUserHeading: true
        });

        var directions = new MapboxDirections({
            accessToken: apiKey,
            unit: 'metric',
            profile: 'mapbox/driving'
        });

        // direction
        map.addControl(directions, 'top-left');
        // Ruler
        map.addControl(new RulerControl(), 'top-right');
        map.on('ruler.on', () => console.log('ruler: on'));
        map.on('ruler.off', () => console.log('ruler: off'));

        // Styles
        map.addControl(new StylesControl(), 'bottom-left');

        // Compass
        map.addControl(new CompassControl(), 'top-right');

        // Zoom
        map.addControl(new ZoomControl(), 'top-right');

        map.on('load',  function() {
            // directions.setOrigin([lng, lat]); // can be address in form setOrigin("12, Elm Street, NY")
            directions.setOrigin([props.userLongitude, props.userLatitude]); // can be address in form setOrigin("12, Elm Street, NY")
            directions.setDestination('Kpalimé, Plateaux, Togo'); // can be address
        })

        console.log("props", "Long :" , props.userLongitude, "lat :" ,props.userLatitude)

        },[]);

        
return (
    <div>
        <div className={classes.sideBar}>
            Votre position à {props.ville}
        </div>
        <div ref={mapContainer}  className="mapWrapper" id="map" />
    </div>
  )
}

export default EventHomeMap