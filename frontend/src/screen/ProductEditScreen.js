import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getProduct, updateProduct } from '../redux/actions/product';
import { listCategories } from '../redux/actions/category';
import SideBar from '../components/SideBar';
import { PRODUCT_GET_RESET, PRODUCT_UPDATE_RESET } from '../redux/types';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [
		title,
		setTitle
	] = useState('');
	const [
		price,
		setPrice
	] = useState(0);
	const [
		image,
		setImage
	] = useState('');
	const [
		description,
		setDescription
	] = useState('');
	const [
		uploading,
		setUploading
	] = useState(false);

	const dispatch = useDispatch();

	const productGet = useSelector((state) => state.productGet);
	const { loading, error, product } = productGet;

	const { categories, catLoading, catError } = useSelector((state) => state.categoryList);

	useEffect(
		() => {
			dispatch(listCategories());
		},
		[
			dispatch
		]
	);
	const productUpdate = useSelector((state) => state.productUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

	useEffect(
		() => {
			if (successUpdate) {
				dispatch({ type: PRODUCT_UPDATE_RESET });
				dispatch({ type: PRODUCT_GET_RESET });
				history.push('/products');
			}
		},
		[
			dispatch,
			successUpdate,
			history
		]
	);

	useEffect(
		() => {
			if (!product.title || product._id !== productId) {
				dispatch(getProduct(productId));
			}
			else {
				setTitle(product.title);
				setPrice(product.price);
				setImage(product.image);
				setDescription(product.description);
			}
		},
		[
			dispatch,
			history,
			productId,
			product
		]
	);

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			};

			const { data } = await axios.post('https://eshopadminapp.herokuapp.com/api/upload', formData, config);

			setImage(data);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const categoryId = document.getElementById('category').value;
		dispatch(
			updateProduct({
				_id         : productId,
				title,
				description,
				price,
				image,
				categoryId
			})
		);
	};

	return (
		<SideBar>
			<Container>
				<Link to="/products" className="btn btn-outline-primary my-3">
					Go Back
				</Link>
				<FormContainer>
					<h1>Edit Product</h1>
					{catLoading && <Loader />}
					{catError && <Message variant="danger">{catError}</Message>}
					{loadingUpdate && <Loader />}
					{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
					{
						loading ? <Loader /> :
						error ? <Message variant="danger">{error}</Message> :
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="title"
									placeholder="Enter title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="price">
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter price"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="image">
								<Form.Label>Image</Form.Label>
								<Form.Control
									readOnly
									type="text"
									placeholder="Enter image url"
									value={image}
									onChange={(e) => setImage(e.target.value)}
									className="mb-2"
								/>
								<Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} />
								{uploading && <Loader />}
							</Form.Group>

							<Form.Group>
								<Form.Label>Select Category</Form.Label>
								<Form.Control defaultValue={product.categoryId} as="select" custom id="category">
									{categories.map((cat) => {
										return (
											<option key={cat._id} value={cat._id}>
												{cat.name}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>

							<Form.Group controlId="description">
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Form.Group>

							<Button type="submit" variant="primary">
								Update
							</Button>
						</Form>}
				</FormContainer>
			</Container>
		</SideBar>
	);
};

export default ProductEditScreen;
