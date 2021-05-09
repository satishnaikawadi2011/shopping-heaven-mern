import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';

const AboutScreen = () => {
	return (
		<div style={{ marginTop: 60 }}>
			<h2 className="text-center">About EShop Waves</h2>

			<Row>
				<Col md={6} sm={12}>
					<Image src="/images/banner.png" className="mb-5" fluid alt="Banner" />
				</Col>
				<Col md={6} sm={12} style={{ textAlign: 'justify', marginTop: 100 }}>
					<p style={{ textIndent: 50 }}>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis commodi, omnis assumenda
						consectetur illo non nam quod. Autem dolores facere aperiam velit, incidunt nam praesentium
						recusandae optio natus ipsa ipsum quae excepturi ea nihil ex iste earum perferendis placeat hic
						cum sapiente. Molestiae asperiores, velit facilis temporibus amet nisi ratione, maiores corrupti
						repellendus aspernatur adipisci dicta optio necessitatibus alias rem deleniti debitis. Nemo
						impedit, dignissimos atque tempore, consequatur, dolorem quae dolore veniam nobis tenetur alias
						quis asperiores et eligendi mollitia quaerat sequi molestias numquam tempora nulla sint
						consequuntur autem consectetur! Provident, iste consectetur beatae mollitia asperiores dolores
						quos repellat vero.{' '}
					</p>
					<p style={{ textIndent: 50 }}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, mollitia inventore nostrum nam
						provident vel? Magnam eveniet totam quasi doloribus neque obcaecati labore iusto accusamus
						illum, commodi ipsa perspiciatis temporibus ex quos rem necessitatibus voluptatibus corrupti
						sunt pariatur. Neque fuga ratione ipsa amet commodi dolor assumenda laboriosam autem vel ab?
					</p>
				</Col>
			</Row>
		</div>
	);
};

export default AboutScreen;
