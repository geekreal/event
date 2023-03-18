import { MapOutlined } from '@mui/icons-material';
import React from 'react'
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

const DistanceCalc = ({latitude1, longitude1, latitude2, longitude2}) => {
    // calcul de la distance
    const dist1 = distance(latitude1, longitude1, latitude2 , longitude2);
    const dist2 = dist1.toFixed(2);
    // console.log("lat1" , latitude1, "long1", longitude1, "lat2" ,latitude2 , "long2" ,longitude2)

  return (
    <div style={{display: 'flex', alignItems: 'center', alignContent:'center', color: 'white'}}><MapOutlined/>à {dist2} Km</div>
  )
}

export default DistanceCalc