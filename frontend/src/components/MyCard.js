import React from 'react';
import { Card } from 'react-bootstrap';

const MyCard = ({ variant, header, iconClass, children }) => {
	return (
		<Card
			bg={variant.toLowerCase()}
			text={

					variant.toLowerCase() === 'light' ? 'dark' :
					'white'
			}
			className="mb-3 mt-4 text-center"
		>
			<Card.Header style={{ fontSize: '2rem' }}>{header}</Card.Header>
			<Card.Body>
				<Card.Title>
					{' '}
					<i className={`${iconClass} fa-3x`} />{' '}
				</Card.Title>
				<Card.Text style={{ fontSize: '3rem' }}>{children}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default MyCard;
