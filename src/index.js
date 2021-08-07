import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import {
  useColorScheme,
  useFitToBounds,
  useMapMetadata,
  usePanToSelected,
} from "./hooks";

import {
  AppointmentLayer,
  LinkLayer,
  LosLayer,
  NodeLayer,
  RequestLayer,
} from "./layers";

import { lightStyles, darkStyles } from "./styles";

import { Context } from "./Context";

const DEFAULT_ZOOM = 12;
const DEFAULT_CENTER = { lat: 40.69, lng: -73.9595798 };
const DEFAULT_OPTIONS = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  mapTypeControlOptions: {
    position: 7,
  },
  backgroundColor: "transparent",
  gestureHandling: "greedy",
  clickableIcons: false,
};

export default React.memo(MeshMap);

function MeshMap({
  googleMapsApiKey,
  data,
  selectedNode,
  selectedRequest,
  selectedAppointment,
  loading,
  onLoad,
  onClick,
  onNodeClick,
  onRequestClick,
  onAppointmentClick,
}) {
  if (!googleMapsApiKey) throw new Error("Missing API key");
  if (!data) throw new Error("Missing data");

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    loadingElement: <div className="flex h-100 w-100 bg-white" />,
  });

  const mapMetadata = useMapMetadata(data);

  const [map, setMap] = useState(null);
  const handleLoad = useCallback((map) => {
    setMap(map);
  }, []);

  // Pan to selected item
  usePanToSelected(
    map,
    mapMetadata,
    selectedNode,
    selectedRequest,
    selectedAppointment
  );

  // Fit bounds to node + connected nodes on first load
  useFitToBounds(
    map,
    mapMetadata,
    selectedNode,
    selectedRequest,
    selectedAppointment
  );

  const colorScheme = useColorScheme();

  const options = {
    ...DEFAULT_OPTIONS,
    styles: colorScheme === "dark" ? darkStyles : lightStyles,
  };

  if (loadError) {
    return <div>Error loading map</div>;
  }

  const loadingSpinner = (
    <div className="absolute top-0 left-0 ma2 z-5">
      <div className="loading-ring"></div>
    </div>
  );

  return (
    <Context.Provider
      value={{
        selectedNode,
        selectedRequest,
        selectedAppointment,
        mapMetadata,
      }}
    >
      <div className="h-100-l vh-50 w-100 flex flex-column relative">
        {loading && loadingSpinner}
        {isLoaded && (
          <GoogleMap
            zoom={DEFAULT_ZOOM}
            center={DEFAULT_CENTER}
            options={options}
            mapContainerClassName="flex h-100 w-100 bg-white"
            onLoad={handleLoad}
            onClick={onClick}
          >
            <NodeLayer nodes={data.nodes} onClick={onNodeClick} />
            <AppointmentLayer
              appointments={data.appointments}
              onClick={onAppointmentClick}
            />
            <RequestLayer requests={data.requests} onClick={onRequestClick} />
            <LinkLayer links={data.links} />
            <LosLayer los={data.los} />
          </GoogleMap>
        )}
      </div>
    </Context.Provider>
  );
}
