import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import MapStyles from './MapStyles';
import Loader from '../Common/Loader';

import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import '@reach/combobox/styles.css';
import { Link } from 'react-router-dom';
import { getLocationScreenHeading } from '../localStorage';

const containerStyle = {
	width: '100%',
	height: 'calc(100vh - 100px)',
	position: 'absolute',
	top: '100px',
	zIndex: '2',
};
const libraries = ['places'];
const options = {
	styles: MapStyles,
	disableDefaultUI: true,
	zoomControl: false,
	componentRestrictions: {
		country: 'ca',
	},
};

function Map() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	//Setting Lat, Lng here
	const [place, setPlace] = useState();

	const mapRef = useRef();
	const [locations, setLocations] = useState({
		latitude: 0,
		longitude: 0,
	});

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	});

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	const centerOfMap = useMemo(
		() => ({
			lat: 43.653225,
			lng: -79.383186,
		}),
		[]
	);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return <Loader />;

	return (
		<section>
			<Search
				setPlace={(position) => {
					setPlace(position);
					mapRef.current.panTo(position);
					mapRef.current.setZoom(14);
				}}
			/>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={centerOfMap}
				zoom={8}
				options={options}
				onLoad={onMapLoad}
			>
				{place && <Marker position={place} />}
			</GoogleMap>
		</section>
	);
}

function Search({ setPlace }) {
	const locationScreenHeading = getLocationScreenHeading().replace(/"/g, '');
	const [loadingClass, setLoadingClass] = useState(false);
	const [mapButton, setMapButton] = useState(true);
	useEffect(() => {
		localStorage.removeItem('pick-up');
		localStorage.removeItem('lat');
		localStorage.removeItem('lng');
	}, []);
	const [latlng, setLatLng] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [pickupLocation, setPickUpLocation] = useState('');
	const [selected, SetSelected] = useState(false);
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 43.653225, lng: () => -79.383186 },
			radius: 200 * 1000,
			componentRestrictions: { country: 'ca' },
		},
	});
	const clearInput = () => {
		setValue('');
		clearSuggestions();
		SetSelected(false);
	};
	function handleLatLng() {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'pick_up_time_selected',
			schedule_details: {
				pickUpLocation: pickupLocation,
				// city: 'Cambridge',
				// state: 'ON',
				country: 'Canada',
			},
		});
		localStorage.setItem('pick-up', JSON.stringify(pickupLocation));
		localStorage.setItem('lat', JSON.stringify(latlng.latitude));
		localStorage.setItem('lng', JSON.stringify(latlng.longitude));
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-4 map-search-box">
					<div className="map-box">
						<h2 className="map-heading">{locationScreenHeading}</h2>
						<Combobox
							onSelect={async (address) => {
								setValue(address, false);
								clearSuggestions();
								SetSelected(true);
								setLoadingClass(true);
								try {
									const results = await getGeocode({ address });
									const { lat, lng } = await getLatLng(results[0]);
									setPlace({ lat, lng });
									setLatLng({
										latitude: lat,
										longitude: lng,
									});
									setPickUpLocation(address);
								} catch (error) {
									console.log(error);
								} finally {
									setLoadingClass(false);
									setMapButton(false);
								}
							}}
						>
							<div className="map-input-search">
								<ComboboxInput
									value={value}
									className="map-input"
									onChange={(e) => {
										setValue(e.target.value);
									}}
									disabled={!ready}
									autocomplete={false}
									placeholder="Enter an address"
								/>
								<img
									onClick={clearInput}
									className="map-input-exit"
									src={process.env.PUBLIC_URL + '/images/exit.svg'}
									alt="exit"
								/>
							</div>
							<ComboboxPopover>
								<div className={selected ? 'display-none' : 'container'}>
									<div className="row">
										<div className="col-lg-4 no-padding-mobile">
											<ComboboxList className="map-box map-box-suggestions">
												<p className="suggestions">Suggestions</p>
												{status === 'OK' &&
													data.map(({ place_id, description }) => (
														<ComboboxOption key={place_id} value={description} />
													))}
											</ComboboxList>
										</div>
									</div>
								</div>
							</ComboboxPopover>
						</Combobox>
						<Link to="/create-account">
							<button
								className={
									selected ? 'map-continue-btn display-block' : 'map-continue-btn display-none'
								}
								onClick={handleLatLng}
								disabled={mapButton}
							>
								Continue
								<span
									className={`${loadingClass === false ? '' : 'spinner-border spinner-border-sm'} `}
									style={{ marginLeft: '5px' }}
								></span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Map;
