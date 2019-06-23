import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, Image, View, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Text } from 'react-native';

import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

class LocationA extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			markers: [],
			latitude: 40.73999758347938,
			longitude: -74.0028659720663,
			error: null,
			concat: null,
			coords: [],
			x: 'false',
			cordLatitude: 40.74992696594516,
			cordLongitude: -74.00312908000686
		};

		this.mergeLot = this.mergeLot.bind(this);
	}

	componentDidMount() {
		this.fetchMarkerData();
		// navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		this.setState({
		// 			latitude: position.coords.latitude,
		// 			longitude: position.coords.longitude,
		// 			error: null
		// 		});
		// 		this.mergeLot();
		// 	},
		// 	(error) => this.setState({ error: error.message }),
		// 	{ enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
		// );
	}
	fetchMarkerData = () => {
		fetch('https://feeds.citibikenyc.com/stations/stations.json')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					markers: responseJson.stationBeanList
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	mergeLot() {
		if (this.state.latitude != null && this.state.longitude != null) {
			let concatLot = this.state.latitude + ',' + this.state.longitude;
			this.setState(
				{
					concat: concatLot
				},
				() => {
					this.getDirections(concatLot, '40.74992696594516,-74.00312908000686');
				}
			);
		}
	}

	async getDirections(startLoc, destinationLoc) {
		try {
			let resp = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
			);
			let respJson = await resp.json();
			console.log('RESPONSE ROUTES', respJson.routes);
			let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
			let coords = points.map((point, index) => {
				return {
					latitude: point[0],
					longitude: point[1]
				};
			});
			this.setState({ coords: coords });
			this.setState({ x: 'true' });
			return coords;
		} catch (error) {
			console.log('masuk fungsi');
			this.setState({ x: 'error' });
			return error;
		}
	}
	render() {
		return (
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 40.74992696594516,
					longitude: -74.00312908000686,
					latitudeDelta: 0.04,
					longitudeDelta: 0.02
				}}
			>
				{this.state.isLoading ? null : (
					this.state.markers.map((marker, index) => {
						const coords = {
							latitude: marker.latitude,
							longitude: marker.longitude
						};

						const metadata = `Status: ${marker.statusValue}`;

						return (
							// <Text>Put in your address: </Text>
							<MapView.Marker
								key={index}
								coordinate={coords}
								title={marker.stationName}
								description={metadata}
							>
								<View style={styles.radius}>
									<View stle={styles.marker} />
								</View>
							</MapView.Marker>
						);
					})
				)}
				{!!this.state.latitude &&
				!!this.state.longitude && (
					<MapView.Marker
						coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
						title={'Your Location'}
					/>
				)}

				{!!this.state.cordLatitude &&
				!!this.state.cordLongitude && (
					<MapView.Marker
						coordinate={{ latitude: this.state.cordLatitude, longitude: this.state.cordLongitude }}
						title={'Your Destination'}
					/>
				)}

				{!!this.state.latitude &&
				!!this.state.longitude &&
				this.state.x == 'true' && (
					<MapView.Polyline coordinates={this.state.coords} strokeWidth={2} strokeColor="red" />
				)}

				{!!this.state.latitude &&
				!!this.state.longitude &&
				this.state.x == 'error' && (
					<MapView.Polyline
						coordinates={[
							{ latitude: this.state.latitude, longitude: this.state.longitude },
							{ latitude: this.state.cordLatitude, longitude: this.state.cordLongitude }
						]}
						strokeWidth={2}
						strokeColor="red"
					/>
				)}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	radius: {
		height: 50,
		width: 50,
		borderRadius: 50 / 2,
		overflow: 'hidden',
		backgroundColor: 'rgba(250, 0, 0, 0.1)',
		// borderWidth: 1,
		// borderColor: 'rgba(0, 122, 255, 0.3)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	marker: {
		height: 20,
		width: 20,
		borderWidth: 3,
		borderColor: 'white',
		borderRadius: 20 / 2,
		overflow: 'hidden',
		backgroundColor: 'red'
	}
});

export default LocationA;
