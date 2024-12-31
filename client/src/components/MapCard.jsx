import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

const MapCard = ({ latitude, longitude }) => {
  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const position = { lat: latitude, lng: longitude };
  return (
    <APIProvider apiKey={apikey}>
      <div className="w-full h-96">
        <Map
          center={position}
          zoom={14}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
          disableDefaultUI={true}
        >
          <AdvancedMarker position={position}>
            <Pin
              background={"red"}
              borderColor={"white"}
              glyphColor={"white"}
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};

MapCard.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MapCard;
