import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import './bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutScreen from './screen/AboutScreen';
import LoginScreen from './screen/LoginScreen';
import PanelHomeScreen from './screen/PanelHomeScreen';
import OrderScreen from './screen/OrderScreen';
import UserScreen from './screen/UserScreen';
import ProductScreen from './screen/ProductScreen';
import ProductEditScreen from './screen/ProductEditScreen';
import CategoryScreen from './screen/CategoryScreen';
import OrderDetailsScreen from './screen/OrderDetailScreen';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
	return (
		<React.Fragment>
			<Router>
				<Header />
				<main className="py-3">
					<ProtectedRoute path="/panel" component={PanelHomeScreen} />
					<ProtectedRoute path="/users" component={UserScreen} />
					<ProtectedRoute exact path="/orders" component={OrderScreen} />
					<ProtectedRoute exact path="/products" component={ProductScreen} />
					<ProtectedRoute path="/categories" component={CategoryScreen} />
					<ProtectedRoute path="/products/:id/edit" component={ProductEditScreen} />
					<ProtectedRoute path="/orders/:id" component={OrderDetailsScreen} />
					<Container>
						<Route exact path="/" component={LoginScreen} />
						<Route path="/about" component={AboutScreen} />
					</Container>
				</main>
				<Footer />
			</Router>
		</React.Fragment>
	);
}

export default App;
