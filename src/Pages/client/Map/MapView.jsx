import React, { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert';
import axios from 'axios';
import MapStyle from '../../../components/client/map/MapStyle';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
    RulerControl,
    StylesControl,
    CompassControl,
    ZoomControl,
} from 'mapbox-gl-controls';

import LinearLoading from '../../../components/loader/LinearLoading';

function distance(latitude1, longitude1, latitude2, longitude2) {
    const RayonTerre = 6371; // rayon de la terre
    const degreLatitude = deg2rad(latitude2 - latitude1);
    const degreLongite = deg2rad(longitude2 - longitude1);
    const a =
    Math.sin(degreLatitude / 2) * Math.sin(degreLatitude / 2) +
    Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) *
    Math.sin(degreLongite / 2) * Math.sin(degreLongite / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = RayonTerre * c ; // distance en km
    return dist;
  }

  {/*Fonction de conersion des angles de latitude et de 
  longitude des coordonnées degrés en radians,*/}
  function deg2rad(degre) {
    return degre * (Math.PI/180)
  }

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA';

const MapView = (props) => {
    const id = props.match.params.id;
    const BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL;
    
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [userCoords, setUserCoords] = useState({ lat: null, lng: null });
    const [pointCoords, setPointCoords] = useState({ lat: null, lng: null });
    const [distance, setDistance] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = MapStyle();

    useEffect(() => {
        // Récupérer la position de l'utilisateur
        navigator.geolocation.getCurrentPosition(
            position => {
            setUserCoords({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            },
            error => {
            console.log('Erreur de géolocalisation :', error);
            }
        );
        }, []);

        useEffect(() => {
        // Récupérer les coordonnées du point depuis l'API
        axios.get(`api/user/event/${id}/info`).then(response=> {
            // const { lat, lng } = response.data.ticket; 
            const lat = response.data.ticket.latitude;
            const lng  = response.data.ticket.longitude // Assurez-vous que la structure de réponse est correcte
            setPointCoords({ lat, lng });
            })
            .catch(error => {
            console.log('Erreur lors de la récupération des coordonnées du point :', error);
            });
        }, []);

        useEffect(() => {
        // Initialiser la carte lorsque les coordonnées de l'utilisateur et du point sont disponibles
            if (userCoords.lat && userCoords.lng && pointCoords.lat && pointCoords.lng) {
                map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [userCoords.lng, userCoords.lat],
                zoom: 8,
                });
        
                const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                unit: 'metric',
                profile: 'mapbox/driving',
                });
        
                map.current.addControl(directions, 'top-left');
        
                directions.on('route', e => {
                const route = e.route[0];
                const dist = route.distance / 1000; // Distance en kilomètres
                setDistance(dist.toFixed(2)); // Fixer la distance à 2 décimales
                });

        
                directions.setOrigin([userCoords.lng, userCoords.lat]);
                directions.setDestination([pointCoords.lng, pointCoords.lat]);

                map.current.on('load', () => {
                    setLoading(true);
                    directions.setOrigin([userCoords.lng, userCoords.lat]);
                    directions.setDestination([pointCoords.lng, pointCoords.lat]);
                    // Styles
                    // map.current.addControl(new StylesControl(), 'bottom-left');

                    // // Compass
                    // map.current.addControl(new CompassControl(), 'top-right');
                });
            
            }
        
        
        }, [userCoords, pointCoords]);

        console.log(userCoords.lat, userCoords.lng,"***" , pointCoords.lat , pointCoords.lng, "***Distance" , distance);
    
        
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


return (
    // <div>
    //     {loading ? (
    //         <>
            <div>
                <div className={classes.sideBar}>
                        de votre position à   <br />
                        Environ {distance} Kms
                </div>
                <div ref={mapContainer}  className="mapWrapper" id="map"/>
            </div>
    //         </>
    //         ): (<LinearLoading/>)
    //     }
    // </div>
)
}

export default MapView