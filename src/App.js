import { registerRootComponent } from 'expo';
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
		    apiKey: 'YOUR INFO HERE',
		    authDomain: 'YOUR INFO HERE',
		    databaseURL: 'YOUR INFO HERE',
		    projectId: 'YOUR INFO HERE',
		    storageBucket: 'YOUR INFO HERE',
		    messagingSenderId: 'YOUR INFO HERE',
		    appId: 'YOUR INFO HERE'
		});	

		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch(this.state.loggedIn) {
			case true: 
				return (
					<CardSection>
				 		<Button onPressBtn={() => firebase.auth().signOut()}>
				 			Log Out
				 		</Button>
				 	</CardSection>
				);

			case false:
				return <LoginForm />; 

			default:
				return <Spinner size="large" />;
		}		
	}

	render() {
		return (
			<View style={{ flex: 1 }}>		
				<Header headerText="Authentication" />
		  		{this.renderContent()}
		  	</View>
	  	);
  	}
}
  
registerRootComponent(App);