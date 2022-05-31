import React, { Component } from 'react';
import axios from 'axios';

import { BASE_URL } from '../Common/constants';
import { setLatLong, setPickup, getPickup, getDate, getSlot } from '../Common/localStorage';
import { instructorSlotBooked, instructorRescheduleSlotBooked } from '../Common/utils';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import mapPin from '../Common/assets/image/mapsPin.png';

const GoogleMapsAPI = 'AIzaSyBffHzTRoRv4_ULJFdyENWA50isLr-5Xx0';
// import { GoogleMapsAPI } from "../client-config";
Geocode.setApiKey(GoogleMapsAPI);
Geocode.enableDebug();

const containerStyle = {
	width: '400px',
	height: '400px',
};

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng,
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng,
			},
			pickupLoc: null,
			handleClose: this.props.handleClose,
			oldLessonObject: this.props.lessonDetails,
			lessonId: this.props.lessonDetails._id,
			instructorId: this.props.instructorId,
			isReschdule: this.props.isReschedule,
		};
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		let pickupLoc = getPickup();

		this.setState({ pickupLoc });
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			(response) => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);

				setLatLong({
					lat: this.state.mapPosition.lat,
					lng: this.state.mapPosition.lng,
				});

				// setPickup(address);

				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : '',
				});
			},
			(error) => {
				console.error(error);
			}
		);
	}
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {
			return true;
		} else if (this.props.center.lat === nextProps.center.lat) {
			return false;
		}
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = (addressArray) => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = (addressArray) => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = (event) => {};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		setLatLong({
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		});

		Geocode.fromLatLng(newLat, newLng).then(
			(response) => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);
				setPickup(address);
				this.setState({
					pickupLoc: address,
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng,
					},
					mapPosition: {
						lat: newLat,
						lng: newLng,
					},
				});
			},
			(error) => {
				console.error(error);
			}
		);
	};

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = (place) => {
		const address = place.formatted_address,
			addressArray = place.address_components,
			city = this.getCity(addressArray),
			area = this.getArea(addressArray),
			state = this.getState(addressArray),
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		setPickup(address);
		setLatLong({
			lat: latValue,
			lng: lngValue,
		});
		this.setState({
			pickupLoc: address,
			address: address ? address : '',
			area: area ? area : '',
			city: city ? city : '',
			state: state ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue,
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue,
			},
		});
	};

	createNewBooking = async () => {
		const slots = getSlot();
		const date = getDate();

		const newDate = date.replaceAll('-', '/');
		let bookedSlots;

		this.state.isReschdule === true
			? (bookedSlots = await instructorRescheduleSlotBooked(this.state.instructorId, this.state.oldLessonObject))
			: (bookedSlots = await instructorSlotBooked(this.state.instructorId));
		await axios.post(`${BASE_URL}/api/student/addBooking`, {
			instructorId: this.state.instructorId,
			lessonId: this.state.lessonId,
			bookings: bookedSlots,
			time: +slots.slot,
			day: slots.day,
			latitude: this.state.markerPosition.lat,
			longitude: this.state.markerPosition.lng,
			date: newDate,
			weekStartDate: slots.date,
			pickupLocation: this.state.pickupLoc,
			notes: '',
		});
		this.state.handleClose();
	};

	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap((props) => (
				<div className="col-lg-12 px-4">
					<GoogleMap
						mapContainerStyle={containerStyle}
						className="google-maps"
						google={this.props.google}
						defaultZoom={this.props.zoom}
						defaultCenter={{
							lat: this.state.mapPosition.lat,
							lng: this.state.mapPosition.lng,
						}}
					>
						<Marker
							google={this.props.google}
							name={'Dolores park'}
							draggable={true}
							onDragEnd={this.onMarkerDragEnd}
							position={{
								lat: this.state.markerPosition.lat,
								lng: this.state.markerPosition.lng,
							}}
						/>
						<Marker />
					</GoogleMap>

					<div className="map-box" style={{ height: '260px', width: '300px' }}>
						<div
							className="py-3"
							style={{
								background: '#FCE1B3',
								borderTopLeftRadius: '10px',
								borderTopRightRadius: '10px',
								height: '90px',
							}}
						>
							<p
								style={{
									fontWeight: '700',
									textAlign: 'left',
									color: 'black',
								}}
							>
								Where can we pick you up?
							</p>
						</div>

						<div
							style={{
								background: '#FEFAF3',
								borderBottomLeftRadius: '10px',
								borderBottomRightRadius: '10px',
								height: '265px',
							}}
						>
							<div
								className="row px-2 pt-0 pb-1"
								style={{ justifyContent: 'center', backgroundColor: '#FEFAF3' }}
							>
								<Autocomplete
									style={{
										width: '100%',
										height: '40px',
										border: '1px solid #FCE1B3',
									}}
									onPlaceSelected={this.onPlaceSelected}
									options={{
										types: ['address'],
										componentRestrictions: { country: 'ca' },
									}}
									// types={["(regions)"]}
								/>
								<p
									className="my-0 pt-2"
									style={{
										textAlign: 'left',
										fontWeight: '300',
										fontStyle: 'italic',
										fontSize: '12px',
										lineHeight: '1.5',
									}}
								>
									Move the marker to select exact location
								</p>
							</div>

							{this.state.pickupLoc === null ? (
								<p
									style={{
										fontWeight: '300',
										fontStyle: 'italic',
										fontSize: '18px',
										lineHeight: '1.5',
									}}
								>
									This could be your home, a nearby intersection, a coffee shop, or anywhere else in
									your area that’s convienient for you!
								</p>
							) : (
								<div className="col-md-12 py-0" style={{ textAlign: 'center', alignSelf: 'center' }}>
									<img src={mapPin} className="py-2" alt="" />
									<p
										style={{
											fontWeight: '800',
											fontSize: '16px',
											lineHeight: '1.5',
											color: '#5C9D7A',
										}}
									>
										{getPickup()}
									</p>
								</div>
							)}
						</div>
					</div>
					<button
						onClick={this.createNewBooking}
						className="er_btn er_btn_two"
						style={{
							width: 'inherit',
							marginTop: '100px',
							textAlign: 'center',
						}}
					>
						Continue
					</button>
				</div>
			))
		);

		let map;
		if (this.props.center.lat !== undefined) {
			map = (
				<AsyncMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
					loadingElement={<div style={{ height: `100%` }}></div>}
					containerElement={
						<div
							className="row mx-5 my-3 justify-content-center flex-row-reverse"
							style={{ height: this.props.height }}
						></div>
					}
					mapElement={<div className="col-lg-6" style={{ height: `100%` }} />}
				/>
			);
		}
		return map;
	}
}
export default Map;

// import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
// import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from 'use-places-autocomplete';
// import MapStyles from './MapStyles';
// import Loader from '../Common/Loader';

// import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
// import "@reach/combobox/styles.css";
// import { Link } from 'react-router-dom';
// // import { getLocationScreenHeading } from '../localStorage';


// const containerStyle = {
//   width: '100%',
//   height: 'calc(100vh - 100px)',
//   position:"absolute",
//   top:"100px",
//   zIndex:"2",
// };
// const libraries = ["places"]
// const options = {
//     styles:MapStyles,
//     disableDefaultUI:true,
//     zoomControl:false,
//     componentRestrictions:{
//         country:"ca"
//     }
// }


// function Map(){
//   const {isLoaded, loadError} = useLoadScript({
//       googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//       libraries,
//   })

//   //Setting Lat, Lng here
//   const [place, setPlace] = useState()

//   const mapRef = useRef();
//   const [locations, setLocations] = useState({
//       latitude:0,
//       longitude:0
//   })

//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map
//   })

//   const panTo = useCallback(({lat, lng}) => {
//       mapRef.current.panTo({lat, lng});
//       mapRef.current.setZoom(14)
//   },[])

//   const centerOfMap = useMemo(() => ({
//     lat: 43.653225, 
//     lng:-79.383186
//   }),[])

//   if(loadError) return "Error loading maps"
//   if(!isLoaded) return <Loader />

//   return(
//       <section>
//           <Search setPlace={(position) => {
//               setPlace(position)
//               mapRef.current.panTo(position)
//               mapRef.current.setZoom(14)
//           }} />
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={centerOfMap}
//             zoom={8}
//             options={options}
//             onLoad={onMapLoad}
//             >
//             {place && <Marker position={place} />}
//         </GoogleMap>
//       </section>
//   )
// }


// function Search({setPlace}){
//     // const locationScreenHeading = getLocationScreenHeading().replace(/"/g, '');
//     const [loadingClass, setLoadingClass] = useState(false)
//     const [mapButton, setMapButton] = useState(true)
//     useEffect(() => {
//         localStorage.removeItem('pick-up')
//         localStorage.removeItem('lat')
//         localStorage.removeItem('lng')
//     }, [])
//     const [latlng, setLatLng] = useState({
//         latitude:0,
//         longitude:0,
//     })
//     const [pickupLocation, setPickUpLocation] = useState('')
//     const [selected, SetSelected] = useState(false)
//     const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
//         requestOptions:{
//             location:{lat: () => 43.653225, lng: () => -79.383186},
//             radius:200*1000,
//             componentRestrictions: { country: "ca" }
//         },
//     })
//     const clearInput = () => {
//         setValue('')
//         clearSuggestions()
//         SetSelected(false)
//     }
//     function handleLatLng(){
//         localStorage.setItem("pick-up", JSON.stringify(pickupLocation))
//         localStorage.setItem("lat", JSON.stringify(latlng.latitude))
//         localStorage.setItem("lng", JSON.stringify(latlng.longitude))
//     }
//     return(
//         <div className='container'>
//             <div className='row'>
//                 <div className='col-lg-4 map-search-box'>
//                     <div className='map-box'>
//                         {/* <h2 className='map-heading'>{locationScreenHeading}</h2> */}
//                         <Combobox onSelect={async (address) => {
//                             setValue(address, false);
//                             clearSuggestions()
//                             SetSelected(true)
//                             setLoadingClass(true)
//                             try{
//                                 const results = await getGeocode({address})
//                                 const {lat, lng} = await getLatLng(results[0])
//                                 setPlace({lat, lng})
//                                 setLatLng({
//                                     latitude:lat,
//                                     longitude:lng,
//                                 })
//                                 setPickUpLocation(address);
//                             } catch(error){
//                                 console.log(error)
//                             } finally {
//                                 setLoadingClass(false)
//                                 setMapButton(false)
//                             }
//                         }}>
//                             <div className='map-input-search'>
//                                 <ComboboxInput
//                                     value={value}
//                                     className="map-input"
//                                     onChange={(e) => {
//                                         setValue(e.target.value)
//                                     }}
//                                     disabled={!ready}
//                                     autocomplete={false}
//                                     placeholder="Enter an address"
//                                 />
//                                 <img onClick={clearInput} className='map-input-exit' src={process.env.PUBLIC_URL + '/images/exit.svg'} alt="exit" />
//                             </div>
//                             <ComboboxPopover>
//                                 <div className={selected ? 'display-none' : 'container'}>
//                                     <div className='row'>
//                                         <div className='col-lg-4 no-padding-mobile'>
//                                             <ComboboxList className='map-box map-box-suggestions'>
//                                                 <p className='suggestions'>Suggestions</p>
//                                                 {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description} />)}
//                                             </ComboboxList>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </ComboboxPopover>
//                         </Combobox>
//                         <Link to="/create-account">
//                             <button className={selected ? 'map-continue-btn display-block' : 'map-continue-btn display-none'} onClick={handleLatLng} disabled={mapButton}>
//                                 Continue
//                                 <span className={`${loadingClass === false ? '' : 'spinner-border spinner-border-sm'} `} style={{marginLeft:"5px"}}>
//                                 </span>
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Map;