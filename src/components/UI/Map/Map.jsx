import robot from "@assets/img/robot_svg/2.png";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Suspense, useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

const MapSkeleton = () => (
  <div style={{ width: "100%", height: "500px" }}>
    <Skeleton height="100%" />
  </div>
);
const marker = document.createElement("div");
marker.style.width = "70px";
marker.style.height = "70px";
marker.style.backgroundImage = `url(${robot})`;
marker.style.backgroundSize = "cover";
marker.style.borderRadius = "50%";
marker.style.border = "2px solid white";

function MapContent({ address }) {
  const mapContainerRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
          )}&format=json&addressdetails=1&limit=1`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates([parseFloat(lon), parseFloat(lat)]);
        } else {
          setError("Location not found");
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setError("Error loading map data");
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      geocodeAddress();
    }
  }, [address]);

  useEffect(() => {
    if (coordinates && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates,
        zoom: 15,
      });

      new mapboxgl.Marker({ element: marker })
        .setLngLat(coordinates)
        .addTo(map);

      return () => map.remove();
    }
  }, [coordinates]);

  if (isLoading) return <MapSkeleton />;
  if (error) return;

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}

export default function MapboxWithGeocoding({ address }) {
  return (
    <Suspense fallback={<MapSkeleton />}>
      <MapContent address={address} />
    </Suspense>
  );
}
