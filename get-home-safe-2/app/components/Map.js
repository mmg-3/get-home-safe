import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject
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

export class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			markers: []
		};
	}
	componentDidMount() {
		this.fetchMarkerData();
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

	render() {
		return (
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: 40.7128,
					longitude: -74.006,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				showsUserLocation={true}
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
			</MapView>
		);
	}
}
