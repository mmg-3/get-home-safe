import React from 'react';
import { StyleSheet, Text, View, LinkingIOS } from 'react-native';
import { Map } from './app/components/Map';
import LocationA from './app/components/Location';
import Directions from './app/components/Directions';
import { Home } from './app/components/Home';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
	Home: { screen: Home },
	Map: { screen: LocationA }
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#D3D3D3',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
