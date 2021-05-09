import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import { deleteCategory, listCategories } from '../redux/actions/category';
import AddCategoryModal from '../components/AddCategoryModal';

const ProductScreen = ({ history, match }) => {
	const dispatch = useDispatch();
	const [
		addCatModalShow,
		setAddCatModalShow
	] = useState(false);
	const { categories, catLoading, catError } = useSelector((state) => state.categoryList);
	const { message, delLoading, delError } = useSelector((state) => state.categoryDelete);
	useEffect(
		() => {
			dispatch(listCategories());
		},
		[
			dispatch,
			message
		]
	);
	const catDeleteHandler = (id) => {
		if (window.confirm('Are you sure ?')) {
			dispatch(deleteCategory(id));
		}
	};

	const createCatHandler = () => {
		setAddCatModalShow(true);
	};
	return (
		<SideBar>
			<AddCategoryModal show={addCatModalShow} handleClose={() => setAddCatModalShow(false)} />
			<Container className="text-center">
				<Row className="align-items-center mb-3">
					<Col>
						<h1>Category List</h1>
					</Col>
					<Col className="text-right">
						<button type="button" className="py-3 btn btn-outline-primary" onClick={createCatHandler}>
							<i className="fas fa-plus mr-2" />Add Category
						</button>
					</Col>
				</Row>
				{catLoading && <Loader />}
				{catError && <Message variant="danger">{catError}</Message>}
				{delLoading && <Loader />}
				{delError && <Message variant="danger">{delError}</Message>}
				{/* {crtLoading && <Loader />}
				{crtError && <Message variant="danger">{crtError}</Message>} */}
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>CATEGORY NAME</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((cat) => {
							return (
								<tr key={cat._id}>
									<td>{cat._id}</td>
									<td>{cat.name}</td>
									<td>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => catDeleteHandler(cat._id)}
										>
											<i className="fas fa-trash" />
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		</SideBar>
	);
};

export default ProductScreen;
