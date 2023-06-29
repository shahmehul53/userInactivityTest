// /* eslint-disable react-native/no-inline-styles */
// import {StyleSheet, View, Text} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

// const MARKER_COLORS = ['green', 'red', 'pink', 'purple'];

// const MapScreen = () => {
//   const [coords, setCoords] = useState([]);
//   const mapRef = useRef(null);

//   const tokyoRegion = {
//     latitude: 37.6762,
//     longitude: 139.6503,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };

//   // MOCK COORDS data fetch
//   useEffect(() => {
//     const setCoordsTimer = setTimeout(() => {
//       setCoords([
//         {latitude: 35.6762, longitude: 139.6503},
//         {
//           latitude: 35.67714827145542,
//           longitude: 139.6551462687416,
//         },
//         {
//           latitude: 35.67814827145542,
//           longitude: 139.6551462687416,
//         },
//       ]);
//     }, 2000);

//     return () => {
//       clearTimeout(setCoordsTimer);
//     };
//   }, []);

//   // Implement when opening map should auto-zoom on the area where the 3 markers are visible.
//   useEffect(() => {
//     if (coords?.length) {
//       mapRef.current.fitToCoordinates(coords, {
//         edgePadding: {
//           bottom: 200,
//           right: 50,
//           top: 150,
//           left: 50,
//         },
//         animated: true,
//       });
//     }
//   }, [coords]);

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//         style={styles.map}
//         initialRegion={tokyoRegion}>
//         {coords?.length
//           ? coords.map((coord, index) => (
//               <Marker
//                 key={index}
//                 coordinate={coord}
//                 pinColor={MARKER_COLORS[index]}
//                 tracksInfoWindowChanges={true}>
//                 <Callout
//                   key={index}
//                   tooltip={true}
//                   style={{backgroundColor: '#ffffff'}}>
//                   <View style={styles.calloutContent}>
//                     <Text style={{fontWeight: 'bold'}}>{coord?.latitude}</Text>
//                   </View>
//                   <View style={styles.calloutContent}>
//                     <Text style={{fontWeight: 'bold'}}>{coord?.longitude}</Text>
//                   </View>
//                 </Callout>
//               </Marker>
//             ))
//           : null}
//       </MapView>
//     </View>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1, //the container will fill the whole screen.
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MapScreen = () => {
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
