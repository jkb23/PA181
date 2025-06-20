"use client";
import {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  MutableRefObject,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon, LatLngExpression, LeafletEvent } from "leaflet";
import { useTranslation } from "../app/providers";

import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/styles";

const brnoCenter: LatLngExpression = [49.1951, 16.6068];

const greenIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const blueIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Location button component
function LocationButton() {
  const map = useMap();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [accuracyCircle, setAccuracyCircle] = useState<L.Circle | null>(null);

  const handleLocationFound = (position: GeolocationPosition) => {
    const { latitude, longitude, accuracy } = position.coords;
    console.log("Location found:", { latitude, longitude, accuracy });

    setUserLocation([latitude, longitude]);
    setLocationAccuracy(accuracy);

    // Remove old accuracy circle if it exists
    if (accuracyCircle) {
      accuracyCircle.remove();
    }

    // Add accuracy circle
    const circle = L.circle([latitude, longitude], {
      radius: accuracy,
      weight: 1,
      color: "#3388ff",
      fillColor: "#3388ff",
      fillOpacity: 0.1,
    }).addTo(map);

    setAccuracyCircle(circle);

    // Zoom level based on accuracy
    let zoomLevel = 18;
    if (accuracy > 500) zoomLevel = 15;
    else if (accuracy > 200) zoomLevel = 16;
    else if (accuracy > 100) zoomLevel = 17;

    map.setView([latitude, longitude], zoomLevel);
    setLoading(false);

    // Show accuracy warning if it's too high
    if (accuracy > 100) {
      alert(
        `Upozornění: Přesnost lokace je nízká (±${Math.round(
          accuracy
        )}m). Pro lepší přesnost:\n` +
          "1. Povolte přesnou polohu v nastavení prohlížeče\n" +
          "2. Používejte zařízení s GPS\n" +
          "3. Buďte venku nebo blízko okna"
      );
    }
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    console.error("Location error:", error);
    let errorMessage = "";

    switch (error.code) {
      case 1:
        errorMessage =
          "Přístup k poloze byl zamítnut. Povolte přístup k poloze v nastavení prohlížeče.";
        break;
      case 2:
        errorMessage =
          "Polohu nelze určit. Zkontrolujte, zda máte zapnuté polohové služby.";
        break;
      case 3:
        errorMessage =
          "Vypršel časový limit pro získání polohy. Zkuste to znovu.";
        break;
      default:
        errorMessage = "Nepodařilo se získat polohu. Zkuste to znovu.";
    }

    alert(errorMessage);
    setLoading(false);
  };

  const findLocation = () => {
    setLoading(true);

    // Clear previous location data
    if (userLocation) {
      setUserLocation(null);
    }
    if (accuracyCircle) {
      accuracyCircle.remove();
      setAccuracyCircle(null);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationFound,
        handleLocationError,
        {
          enableHighAccuracy: true, // Request GPS if available
          timeout: 10000, // 10 second timeout
          maximumAge: 0, // Don't use cached position
        }
      );
    } else {
      alert("Váš prohlížeč nepodporuje geolokaci.");
    }
  };

  return (
    <>
      <button
        onClick={findLocation}
        className="absolute z-[1000] top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t("finding_location") || "Hledám polohu..."}
          </span>
        ) : (
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">
              {t("find_my_location") || "Moje poloha"}
            </span>
          </span>
        )}
      </button>
      {userLocation && (
        <Marker position={userLocation} icon={blueIcon}>
          <Popup>
            <div>
              <strong>Vaše poloha</strong>
              <br />
              {locationAccuracy && (
                <span
                  className={
                    locationAccuracy > 100
                      ? "text-orange-500"
                      : "text-green-500"
                  }
                >
                  Přesnost: ±{Math.round(locationAccuracy)}m
                  {locationAccuracy > 100 && (
                    <div className="text-xs mt-1 text-gray-600">
                      Pro lepší přesnost:
                      <br />
                      • Povolte přesnou polohu
                      <br />
                      • Použijte zařízení s GPS
                      <br />• Buďte venku/u okna
                    </div>
                  )}
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}

function MapInstanceController({
  mapRef,
}: {
  mapRef: MutableRefObject<L.Map | null>;
}) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  }, [map, mapRef]);
  return null;
}

export interface MapControlHandle {
  setWasteType: (type: string) => void;
  searchLocation: (coords: [number, number]) => void;
}

const LeafletMap = forwardRef<MapControlHandle, { selectedWasteType?: string }>(
  ({ selectedWasteType }, ref) => {
    const { t } = useTranslation();
    const [features, setFeatures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const [wasteType, setWasteType] = useState<string | undefined>(
      selectedWasteType
    );
    const [searchMarker, setSearchMarker] = useState<[number, number] | null>(
      null
    );
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      setWasteType(selectedWasteType);
    }, [selectedWasteType]);

    useEffect(() => {
      fetch("/api/containers")
        .then((res) => res.json())
        .then((data) => {
          setFeatures(data.features || []);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load containers");
          setLoading(false);
        });
    }, []);

    const searchLocation = useCallback((coords: [number, number]) => {
      console.log("Updating map location to:", coords);
      if (mapRef.current) {
        mapRef.current.setView(coords, 17);
        setSearchMarker(coords);
      } else {
        console.error("Map reference not available");
      }
    }, []);

    // Expose control functions to parent component
    useImperativeHandle(ref, () => ({
      setWasteType,
      searchLocation,
    }));

    // Filter features by waste type
    const filteredFeatures = useMemo(
      () =>
        wasteType
          ? features.filter(
              (f) => f.properties?.komodita_odpad_separovany === wasteType
            )
          : features,
      [features, wasteType]
    );

    const redIcon = useMemo(
      () =>
        new Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        }),
      []
    );

    return (
      <div className="h-[600px] bg-gray-200 rounded-lg dark:bg-gray-900 relative">
        {isClient && (
          <MapContainer
            center={brnoCenter}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", minHeight: 500 }}
            className="rounded-lg"
          >
            <MapInstanceController mapRef={mapRef} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationButton />
            {searchMarker && (
              <Marker position={searchMarker} icon={redIcon}>
                <Popup>Hledaná lokalita</Popup>
              </Marker>
            )}
            <MarkerClusterGroup chunkedLoading>
              {filteredFeatures.map((feature, idx) => {
                if (feature.geometry.type !== "Point") return null;
                const [lng, lat] = feature.geometry.coordinates;
                return (
                  <Marker key={idx} position={[lat, lng]} icon={greenIcon}>
                    <Popup>
                      {t("waste_type")}:{" "}
                      {feature.properties?.komodita_odpad_separovany || "-"}
                      <br />
                      {t("location")}: {feature.properties?.ulice || "-"}
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>
        )}
        {loading && (
          <p className="text-center text-gray-500 mt-4 dark:text-gray-300">
            {t("loading_map")}
          </p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    );
  }
);

LeafletMap.displayName = "LeafletMap";

export default LeafletMap;
