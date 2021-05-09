const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFoundRoute, errorHandler } = require('./middlewares/errorHandlers');
const getAddress = require('./utils/getAddress');
const cors = require('cors');
const path = require('path');

const upload = require('./controllers/upload');

const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const isAdmin = require('./middlewares/isAdmin');
const isAuthenticated = require('./middlewares/isAuthenticated');
const { getStats } = require('./controllers/product');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.post('/api/upload', upload.single('image'), async (req, res) => {
	res.send(`/${req.file.path.replace('\\', '/')}`);
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.get(
	'/api/stats',
	[
		isAuthenticated,
		isAdmin
	],
	getStats
);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', async (req, res) => {
	res.send('Connected to server!');
	const data = await getAddress(16.9848, 74.1284);
	console.log(data);
});

app.use(notFoundRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`));
