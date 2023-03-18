import React from 'react'
import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import MapStyle from './MapStyle';
import './map.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import GeocodingService  from '@mapbox/mapbox-sdk/services/geocoding';

import {
    RulerControl,
    StylesControl,
    CompassControl,
    ZoomControl,
} from 'mapbox-gl-controls';


import swal from 'sweetalert';
import 'mapbox-gl-controls/lib/controls.css';
{/*
    recupération des cordonnées avec MapBox;
    fonction pour calculer la distance entre deux
    coordonnées geographique en format dégré deciaux;
    Auteur: Geek Pro - Edem DOTSEY
*/}

function distance(latitude1, longitude1, latitude2, longitude2) {
    const RayonTerre = 6371; // rayon de la terre
    const degreLatitude = deg2rad(latitude2 - latitude1);
    const degreLongite = deg2rad(longitude2 - longitude1);
    const a =
      Math.sin(degreLatitude / 2) * Math.sin(degreLatitude / 2) +
      Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) *
      Math.sin(degreLongite / 2) * Math.sin(degreLongite / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = RayonTerre * c; // distance en km
    return dist;
  }

  {/*Fonction de conersion des angles de latitude et de 
  longitude des coordonnées degrés en radians,*/}
  function deg2rad(degre) {
    return degre * (Math.PI/180)
  }

function EventHomeMap(props) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA';
    const apiKey = 'pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(props.longitude);
    const [lat, setLat] = useState(props.latitude);
    const [zoom, setZoom] = useState(7);
    const classes = MapStyle();

    const StartItineraire = (directions) => {
        const marker = new mapboxgl.Marker();
        navigator.geolocation.watchPosition(position => {
            const lngi = position.coords.longitude;
            const lati = position.coords.latitude;
          
            // Mettre à jour la position du marqueur sur la carte
            marker.setLngLat([lngi, lati]).addTo(map);
          
            // Mettre à jour l'itinéraire sur la carte
            directions.setOrigin([lngi, lati]);
          });
    }

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
        showUserHeading: true,
        moving: true,
    });


        // console.log("Map ",map);

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

        // console.log("props", "Long :" , props.userLongitude, "lat :" ,props.userLatitude)
        map.on('load',  function() {
            // directions.setOrigin([lng, lat]); // can be address in form setOrigin("12, Elm Street, NY")
            directions.setOrigin([props.userLongitude, props.userLatitude]); // can be address in form setOrigin("12, Elm Street, NY")
            directions.setDestination([props.longitude, props.latitude]); // can be address
        })
    },[]);

    // calcul de la distance
    const dist1 = distance(props.userLatitude, props.userLongitude, props.latitude , props.longitude);
    const dist2 = dist1.toFixed(2);
        
return (
    <div>
        <div className={classes.sideBar}>
            de votre position à {props.ville}  <br />
            Environ {dist2} Kms
        </div>
        <div ref={mapContainer}  className="mapWrapper" id="map" />
    </div>
  )
}

export default EventHomeMap