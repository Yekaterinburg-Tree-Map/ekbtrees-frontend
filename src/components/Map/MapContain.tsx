import React, {CSSProperties, useEffect, useRef} from "react";
import { useState } from "react";
import GeojsonLayer from "./GeojsonLayer";
import { MapState } from "./MapState";
import "./Map.css";
import { IMapContainProps } from "./types";

const DG = require('2gis-maps');


const MapContain = (props: IMapContainProps) => {
	const { mapViewPosition, setMapViewPosition, user, disabled } = props;

	const defaultPosition = [56.8391040, 60.6082500]; // Yekaterinburg position
	const defaultZoom = 14; // Yekaterinburg position
	const [map, setMap] = useState<any>(); // for 2-gis map
	const [mapState, setMapState] = useState<number>(MapState.default);
	const elRef = useRef<HTMLDivElement>(null);
	const setMapViewOnUser = useRef<boolean>(true);
	const setMarkerOnView = useRef<boolean>(false);

  // Yekaterinburg square coordinates
  const topLeftCorner: [number, number] = [57.2889, 59.8557];
  const bottomRightCorner: [number, number] = [56.3889, 61.3557];

  // Checking is location in Yekaterinburg square
  const isPositionInRectangle = (position: [number, number], topLeft: [number, number], bottomRight: [number, number]) => {
    const [lat, lng] = position;
    const [topLeftLat, topLeftLng] = topLeft;
    const [bottomRightLat, bottomRightLng] = bottomRight;

    return lat >= bottomRightLat && lat <= topLeftLat &&
      lng >= topLeftLng && lng <= bottomRightLng;
  };

  // Determine initial position and zoom
  let position = defaultPosition;
  let zoom = defaultZoom;

  if (mapViewPosition && isPositionInRectangle([mapViewPosition.lat, mapViewPosition.lng], topLeftCorner, bottomRightCorner)) {
    position = [mapViewPosition.lat, mapViewPosition.lng];
    zoom = 30;
  }

	useEffect(() => {
		setMapViewOnUser.current = mapViewPosition === undefined;

		if (mapViewPosition) {
			// console.log(`New setMarkerOnView: ${!!mapViewPosition.marker}`);
			setMarkerOnView.current = !!mapViewPosition.marker;
		}
		// console.log(`New setMarkerOnView: ${setMarkerOnView.current}`);
		let innerMap = map;

		if (!innerMap) {
			innerMap = DG.map(elRef.current, {
				'center': position,
				'zoom': zoom
			});
			setMap(innerMap);
		} else {
			innerMap.setView(position, zoom);
		}

		setMapViewPosition(undefined);
	}, []);

	const style: CSSProperties = (disabled || mapState === MapState.disabled)
		? { "pointerEvents": "none" }
		: { "pointerEvents": "all" };

	return (
		<div
			ref={elRef}
			className={props.className}
			style={style}
		>
			<GeojsonLayer
				map={map}
				mapState={mapState}
				setMapState={setMapState}
				// mapViewPosition={props.mapViewPosition}
				setMapViewOnUser={setMapViewOnUser.current}
				// setMarkerOnView={setMarkerOnView.current}
				pointerMarker={mapViewPosition}
				user={user} />
		</div>
	);
};

export default MapContain;
