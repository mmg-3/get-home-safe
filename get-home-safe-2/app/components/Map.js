import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject
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
							<MapView.Marker
								key={index}
								coordinate={coords}
								title={marker.stationName}
								description={metadata}
							/>
						);
					})
				)}
			</MapView>
		);
	}
}
