import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import { listProducts, deleteProduct, createProduct } from '../redux/actions/product';
import { listCategories } from '../redux/actions/category';
import { PRODUCT_CREATE_RESET } from '../redux/types';

const ProductScreen = ({ history, match }) => {
	const dispatch = useDispatch();
	const { products, loading, error } = useSelector((state) => state.productList);
	const { categories, catLoading, catError } = useSelector((state) => state.categoryList);
	const { message, delLoading, delError } = useSelector((state) => state.productDelete);
	const { product: createdProduct, success: successCreate, crtLoading, crtError } = useSelector(
		(state) => state.productCreate
	);
	useEffect(
		() => {
			dispatch({ type: PRODUCT_CREATE_RESET });
			dispatch(listCategories());
			dispatch(listProducts());
		},
		[
			dispatch,
			message
		]
	);

	useEffect(
		() => {
			if (successCreate) {
				history.push(`/products/${createdProduct._id}/edit`);
			}
		},
		[
			history,
			createdProduct,
			successCreate
		]
	);
	const productDeleteHandler = (id) => {
		if (window.confirm('Are you sure ?')) {
			dispatch(deleteProduct(id));
		}
	};

	const getCategoryName = (id) => {
		const cat = categories.find((c) => c._id === id);
		return cat.name;
	};

	const editProductHandler = (id) => {
		history.push(`/products/${id}/edit`);
	};

	const createProducthandler = () => {
		dispatch(createProduct());
	};
	return (
		<SideBar>
			<Container className="text-center">
				<Row className="align-items-center mb-3">
					<Col>
						<h1>Products List</h1>
					</Col>
					<Col className="text-right">
						<button type="button" className="py-3 btn btn-outline-primary" onClick={createProducthandler}>
							<i className="fas fa-plus mr-2" />Create Product
						</button>
					</Col>
				</Row>
				{loading && <Loader />}
				{error && <Message variant="danger">{error}</Message>}
				{catLoading && <Loader />}
				{catError && <Message variant="danger">{catError}</Message>}
				{delLoading && <Loader />}
				{delError && <Message variant="danger">{delError}</Message>}
				{crtLoading && <Loader />}
				{crtError && <Message variant="danger">{crtError}</Message>}
				{!catLoading &&
				!loading && (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>TITLE</th>
								<th>PRICE (USD)</th>
								<th>CATEGORY</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => {
								return (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.title}</td>
										<td>${product.price}</td>
										<td>{getCategoryName(product.categoryId)}</td>
										<td>
											<Button
												variant="light"
												className="btn-sm"
												onClick={() => editProductHandler(product._id)}
											>
												<i className="fas fa-edit" />
											</Button>
											<Button
												variant="danger"
												className="btn-sm"
												onClick={() => productDeleteHandler(product._id)}
											>
												<i className="fas fa-trash" />
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				)}
			</Container>
		</SideBar>
	);
};

export default ProductScreen;
