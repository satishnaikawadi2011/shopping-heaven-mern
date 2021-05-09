import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../redux/actions/category';
import { CATEGORY_CREATE_RESET } from '../redux/types';
import Loader from './Loader';
import Message from './Message';

const AddCategoryModal = (props) => {
	const [
		name,
		setName
	] = useState('');
	const dispatch = useDispatch();
	const { success: successCreate, loading: crtLoading, error: crtError } = useSelector(
		(state) => state.categoryCreate
	);
	useEffect(
		() => {
			if (successCreate) {
				setName('');
				dispatch({ type: CATEGORY_CREATE_RESET });
				props.handleClose();
			}
		},
		[
			props,
			successCreate,
			dispatch
		]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createCategory(name));
	};
	return (
		<Modal show={props.show} onHide={props.handleClose}>
			<Modal.Header>
				<Modal.Title>Add New Category</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{crtLoading && <Loader />}
				{crtError && <Message variant="danger">{crtError}</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Category Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter category name ..."
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Modal.Footer>
						<Button variant="secondary" onClick={props.handleClose}>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AddCategoryModal;
