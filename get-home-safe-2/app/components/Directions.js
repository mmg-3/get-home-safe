import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import getDirections from 'react-native-google-maps-directions';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default class Directions extends React.Component {
	handleGetDirections = () => {
		const data = {
			source: {
				latitude: -33.8356372,
				longitude: 18.6947617
			},
			destination: {
				latitude: -33.8600024,
				longitude: 18.697459
			},
			params: [
				{
					key: 'travelmode',
					value: 'walking' // may be "walking", "bicycling" or "transit" as well
				},
				{
					key: 'dir_action',
					value: 'navigate' // this instantly initializes navigation using the given travel mode
				}
			]
			// waypoints: [
			//   {
			//     latitude: -33.8600025,
			//     longitude: 18.697452,
			//   },
			//   {
			//     latitude: -33.8600026,
			//     longitude: 18.697453,
			//   },
			//      {
			//     latitude: -33.8600036,
			//     longitude: 18.697493,
			//   },
			//      {
			//     latitude: -33.8600046,
			//     longitude: 18.69743,
			//   },

			// ]
		};

		getDirections(data);
	};

	render() {
		return (
			<View style={styles.container}>
				<Text> Get Directions Below:</Text>
				<Button onPress={this.handleGetDirections} title="Get Directions" />
			</View>
		);
	}
}
