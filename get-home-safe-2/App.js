import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Map } from './app/components/Map';
import LocationA from './app/components/Location';
import Directions from './app/components/Directions';

export default function App() {
	return (
		<View style={styles.container}>
			{/* <Text>Open up App.js to start working on your app!</Text> */}
			{/* <Directions /> */}
			<LocationA />
			{/* <Map /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
