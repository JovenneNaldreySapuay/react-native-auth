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
		    apiKey: 'AIzaSyAkxd0ooUWjAp5ka3xNMeQ8dpQvJBYX10M',
		    authDomain: 'authentication-cdd7d.firebaseapp.com',
		    databaseURL: 'https://authentication-cdd7d.firebaseio.com',
		    projectId: 'authentication-cdd7d',
		    storageBucket: 'authentication-cdd7d.appspot.com',
		    messagingSenderId: '1039723615422',
		    appId: '1:1039723615422:web:22331e1484ec2aec'
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