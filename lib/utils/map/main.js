import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useRouter } from "next/router";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const iconTarget = new L.Icon({
    iconUrl: 'target_icon.png',
    iconAnchor: [12, 40],
    popupAnchor: [0, -34]
});

const Map = () => {
  const { query } = useRouter();
  const user_coords = [query.user_latitude || 50.5, query.user_longitude || 30.5];
  const target_coords = [query.target_latitude || 50.51, query.target_longitude || 30.51];
  const target_type = query.target_type || "General";
  return (
    <MapContainer
      scrollWheelZoom={false}
      style={{height: 700, width: "100%"}}
      whenCreated={(map) => {map.fitBounds([user_coords, target_coords])}}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
    <Marker position={user_coords}>
      <Popup>
        You are here
      </Popup>
    </Marker>
    <Marker position={target_coords} icon={iconTarget}>
      <Popup>
        This is the closest {target_type} container.
        <br/><br/>
        {target_coords[0]}, {target_coords[1]}
      </Popup>
    </Marker>
    </MapContainer>
  )
}

export default Map

/*
How to use:

  const Map = dynamic(
    () => import('../lib/utils/map/main'),
    { ssr: false }
  )
<Map/>
*/