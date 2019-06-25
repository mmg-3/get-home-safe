import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import LocationA from './Location';
import { Input } from 'react-native-elements';

export class Home extends React.Component {
	static navigationOptions = {
		title: 'SecurePath'
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Input style={styles.input} label="Origin" placeholder="Current Location" />
				<Input style={styles.input} label="Destination" />
				<Text style={styles.button} onPress={() => navigate('Map')}>
					{' '}
					Go to Map{' '}
				</Text>
				{/* <Button title="Go to map" onPress={() => navigate('Map')} />{' '} */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#D3D3D3',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: 'pink',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 12,
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 12,
		textAlign: 'center'
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
		// backgroundColor: 'white',
		// margin: 20,
		// padding: 10
	}
});
