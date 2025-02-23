import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Ensure compatibility with Mapbox GL
const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiYXltYW5hdHRhZiIsImEiOiJjbTdnZWd3eXIwcmhsMmpyMGNlNzE0Mm53In0.rKz0Htwt5p-OmwNcZXDZhw"
});

function MyMap() {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map>
  );
}

export default MyMap;
