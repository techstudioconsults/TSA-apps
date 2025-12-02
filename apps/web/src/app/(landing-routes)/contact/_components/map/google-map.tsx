"use client";

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface GoogleMapProperties {
  location: Location;
  apiKey: string;
}

export const GoogleMap = ({ location, apiKey }: GoogleMapProperties) => {
  const mapReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: apiKey,
        version: "weekly",
        libraries: ["places"],
      });

      try {
        const google = await loader.load();

        if (mapReference.current) {
          const { lat, lng, address } = location;

          const map = new google.maps.Map(mapReference.current, {
            center: { lat, lng },
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });

          // Create a custom marker
          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: address,
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z" fill="#FF4444"/>
                  <circle cx="20" cy="14" r="6" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40),
            },
          });

          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: `<div className="max-w-[200px] p-2 overflow-hidden hide-scrollbar">
                          <h5 style="margin: 0 0 5px 0; font-weight: 600; color: #333; text-align: center;">Techstudio Academy</h5>
                          <p style="margin: 0; color: #666; font-size: 14px;">${address}</p>
                      </div>`,
          });

          // Add click listener to marker
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          // Open info window by default
          infoWindow.open(map, marker);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error loading Google Maps:", error);
      }
    };

    if (location.lat && location.lng) {
      initMap();
    }
  }, [location, apiKey]);

  if (!location.lat || !location.lng) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">Invalid location data</p>
      </div>
    );
  }

  return (
    <div
      ref={mapReference}
      className="h-[400px] w-full rounded-lg shadow-lg lg:h-[500px] lg:rounded-none"
      style={{ minHeight: "400px" }}
    />
  );
};
